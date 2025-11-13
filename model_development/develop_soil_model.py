import os
import numpy as np
import joblib
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import EfficientNetB3
from tensorflow.keras.layers import GlobalAveragePooling2D, BatchNormalization, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

# Constants
IMG_SIZE = (300, 300)
BATCH_SIZE = 16
EPOCHS = 50
MODEL_PATH = 'saved_model/soil_model.h5'
CLASSES_PATH = 'saved_model/soil_classes.joblib'
DATASET_PATH = 'Soil_Type_Dataset'

def create_model():
    base_model = EfficientNetB3(
        weights='imagenet',
        include_top=False,
        input_shape=(300, 300, 3)
    )

    base_model.trainable = False

    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    
    # Increased network capacity
    x = Dense(2048, activation='swish')(x)  # Using swish activation
    x = BatchNormalization()(x)
    x = Dropout(0.5)(x)
    
    x = Dense(1024, activation='swish')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.4)(x)
    
    x = Dense(512, activation='swish')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    
    predictions = Dense(4, activation='softmax')(x)

    model = Model(inputs=base_model.input, outputs=predictions)
    return model, base_model

def train_and_evaluate():
    # Enhanced data augmentation with mixup
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=30,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        vertical_flip=False,
        zoom_range=0.2,
        brightness_range=[0.8, 1.2],
        fill_mode='nearest',
        validation_split=0.2,
        shear_range=0.2
    )

    test_datagen = ImageDataGenerator(rescale=1./255)

    # Load data
    train_generator = train_datagen.flow_from_directory(
        os.path.join(DATASET_PATH, 'Train'),
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='training',
        shuffle=True
    )

    validation_generator = train_datagen.flow_from_directory(
        os.path.join(DATASET_PATH, 'Train'),
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        subset='validation',
        shuffle=True
    )

    test_generator = test_datagen.flow_from_directory(
        os.path.join(DATASET_PATH, 'Test'),
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )

    # Create model
    model, base_model = create_model()

    # Phase 1: Training top layers
    print("Phase 1: Training top layers...")
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # Improved class weights calculation
    class_weights = {i: len(train_generator.classes) / (len(train_generator.class_indices) * np.sum(train_generator.classes == i))
                    for i in range(len(train_generator.class_indices))}
    
    # Normalize class weights
    max_weight = max(class_weights.values())
    class_weights = {k: v/max_weight for k, v in class_weights.items()}

    # Initial training with higher learning rate
    history1 = model.fit(
        train_generator,
        epochs=20,  # Increased initial training epochs
        validation_data=validation_generator,
        class_weight=class_weights,
        callbacks=[
            EarlyStopping(monitor='val_accuracy', patience=7, restore_best_weights=True),
            ReduceLROnPlateau(monitor='val_accuracy', factor=0.5, patience=4, min_lr=1e-6)
        ]
    )

    # Phase 2: Fine-tuning with gradual unfreezing
    print("Phase 2: Fine-tuning the model...")
    base_model.trainable = True
    
    # Gradual unfreezing
    for layer in base_model.layers[:150]:  # Freeze more layers initially
        layer.trainable = False

    model.compile(
        optimizer=Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # Fine-tuning with careful monitoring
    history2 = model.fit(
        train_generator,
        epochs=EPOCHS,
        validation_data=validation_generator,
        class_weight=class_weights,
        callbacks=[
            EarlyStopping(
                monitor='val_accuracy',
                patience=10,  # Increased patience
                restore_best_weights=True,
                mode='max'
            ),
            ReduceLROnPlateau(
                monitor='val_accuracy',
                factor=0.2,
                patience=5,  # Increased patience
                min_lr=1e-7,  # Lower minimum learning rate
                mode='max'
            ),
            ModelCheckpoint(
                MODEL_PATH,
                monitor='val_accuracy',
                save_best_only=True,
                mode='max'
            )
        ]
    )

    # Evaluate model
    print("\nEvaluating model...")
    test_loss, test_accuracy = model.evaluate(test_generator)
    print(f"\nTest Accuracy: {test_accuracy:.4f}")

    # Save classes
    joblib.dump(list(train_generator.class_indices.keys()), CLASSES_PATH)

    return model, test_accuracy

if __name__ == "__main__":
    try:
        print("Starting soil classification model training...")
        model, accuracy = train_and_evaluate()
        print(f"\nTraining completed successfully!")
        print(f"Model saved at: {MODEL_PATH}")
        print(f"Final Test Accuracy: {accuracy:.4f}")
    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        raise