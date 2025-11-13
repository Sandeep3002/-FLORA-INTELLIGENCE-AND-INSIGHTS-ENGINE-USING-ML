# backend/models/soil_analysis/model.py

import tensorflow as tf
import tensorflow_hub as hub
import numpy as np

class SoilAnalysisModel:
    def __init__(self):
        self.IMG_SIZE = (224, 224)
        self.class_names = ['Alluvial soil', 'Black Soil', 'Clay soil', 'Red soil']
        self.model = None
        self.initialize_model()

    def initialize_model(self):
        model_handle = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/classification/4"
        
        self.model = tf.keras.Sequential([
            tf.keras.layers.InputLayer(input_shape=self.IMG_SIZE + (3,)),
            hub.KerasLayer(model_handle, trainable=True),
            tf.keras.layers.Dense(len(self.class_names), activation='softmax')
        ])

        self.model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.00001),
            loss=tf.keras.losses.CategoricalCrossentropy(),
            metrics=['accuracy']
        )

    def preprocess_image(self, image):
        # Resize image
        image = tf.image.resize(image, self.IMG_SIZE)
        # Normalize
        image = image / 255.0
        return image

    def predict(self, image):
        processed_image = self.preprocess_image(image)
        processed_image = np.expand_dims(processed_image, axis=0)
        
        prediction = self.model.predict(processed_image)
        predicted_class_idx = np.argmax(prediction[0])
        confidence = float(prediction[0][predicted_class_idx])
        
        return {
            'soil_type': self.class_names[predicted_class_idx],
            'confidence': confidence,
            'all_probabilities': {
                soil_type: float(prob) 
                for soil_type, prob in zip(self.class_names, prediction[0])
            }
        }

    def load_weights(self, weights_path):
        self.model.load_weights(weights_path)

    def train(self, train_data, validation_data, epochs=30):
        return self.model.fit(
            train_data,
            validation_data=validation_data,
            epochs=epochs
        )