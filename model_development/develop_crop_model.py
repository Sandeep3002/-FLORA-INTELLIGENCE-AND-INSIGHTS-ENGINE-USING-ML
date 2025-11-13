# develop_crop_model.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os
import warnings
warnings.filterwarnings('ignore')

# Constants
MODEL_PATH = 'saved_model/crop_model.joblib'
SCALER_PATH = 'saved_model/crop_scaler.joblib'
DATASET_PATH = 'Crop_recommendation.csv'

def load_and_analyze_data():
    """Load and analyze the dataset"""
    print("Loading and analyzing dataset...")
    df = pd.read_csv(DATASET_PATH)
    print("\nDataset Shape:", df.shape)
    print("\nCrop Distribution:")
    print(df['label'].value_counts())
    print("\nFeature Statistics:")
    print(df.describe())
    return df

def prepare_data():
    """Prepare data for training"""
    # Load dataset
    df = pd.read_csv(DATASET_PATH)
    
    # Separate features and target
    X = df.drop('label', axis=1)
    y = df['label']
    
    # Split the data with stratification
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, 
        test_size=0.2, 
        random_state=42,
        stratify=y
    )
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler

def train_model():
    """Train and optimize the model"""
    # Prepare data
    X_train, X_test, y_train, y_test, scaler = prepare_data()
    
    # Define parameter grid for optimization
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [10, 15, 20, None],
        'min_samples_split': [2, 5],
        'min_samples_leaf': [1, 2],
        'max_features': ['sqrt', 'log2'],
        'class_weight': ['balanced', 'balanced_subsample']
    }
    
    # Create base model
    base_model = RandomForestClassifier(random_state=42)
    
    # Perform grid search
    print("\nPerforming grid search for hyperparameter optimization...")
    grid_search = GridSearchCV(
        estimator=base_model,
        param_grid=param_grid,
        cv=5,
        n_jobs=-1,
        verbose=1,
        scoring='accuracy'
    )
    
    grid_search.fit(X_train, y_train)
    
    # Get best model
    model = grid_search.best_estimator_
    
    # Evaluate model
    train_pred = model.predict(X_train)
    test_pred = model.predict(X_test)
    
    print("\nBest Parameters:", grid_search.best_params_)
    print("\nTraining Accuracy:", accuracy_score(y_train, train_pred))
    print("\nTest Accuracy:", accuracy_score(y_test, test_pred))
    
    print("\nDetailed Classification Report:")
    print(classification_report(y_test, test_pred))
    
    # Feature importance analysis
    feature_importance = pd.DataFrame({
        'feature': ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'],
        'importance': model.feature_importances_
    })
    print("\nFeature Importance:")
    print(feature_importance.sort_values(by='importance', ascending=False))
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    
    # Save model and scaler
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    
    return model, scaler

def validate_model(model, scaler):
    """Perform additional validation on the model"""
    # Load fresh data
    df = pd.read_csv(DATASET_PATH)
    X = df.drop('label', axis=1)
    y = df['label']
    
    # Scale features
    X_scaled = scaler.transform(X)
    
    # Make predictions
    predictions = model.predict(X_scaled)
    
    # Calculate accuracy
    accuracy = accuracy_score(y, predictions)
    print("\nOverall Model Accuracy:", accuracy)
    
    # Test some specific cases
    test_cases = [
        # High N, P, K values
        {'N': 140, 'P': 95, 'K': 205, 'temperature': 24, 'humidity': 80, 'ph': 6.5, 'rainfall': 200},
        # Low N, P, K values
        {'N': 20, 'P': 25, 'K': 30, 'temperature': 25, 'humidity': 70, 'ph': 7.0, 'rainfall': 150},
        # Extreme temperature
        {'N': 80, 'P': 50, 'K': 100, 'temperature': 35, 'humidity': 60, 'ph': 6.0, 'rainfall': 100},
    ]
    
    print("\nTesting specific cases:")
    for case in test_cases:
        features = np.array([[
            case['N'], case['P'], case['K'],
            case['temperature'], case['humidity'],
            case['ph'], case['rainfall']
        ]])
        scaled_features = scaler.transform(features)
        prediction = model.predict(scaled_features)
        probability = model.predict_proba(scaled_features).max()
        print(f"\nCase: {case}")
        print(f"Predicted crop: {prediction[0]}")
        print(f"Confidence: {probability:.2%}")

if __name__ == "__main__":
    try:
        print("Starting crop recommendation model development...")
        
        # Analyze data
        df = load_and_analyze_data()
        
        # Train model
        print("\nTraining model...")
        model, scaler = train_model()
        
        # Validate model
        print("\nValidating model...")
        validate_model(model, scaler)
        
        print("\nModel development completed successfully!")
        print(f"Model saved at: {MODEL_PATH}")
        print(f"Scaler saved at: {SCALER_PATH}")
        
    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        raise