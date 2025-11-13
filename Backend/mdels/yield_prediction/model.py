# backend/models/yield_prediction/model.py

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

class YieldPredictionModel:
    def __init__(self):
        self.model = None
        self.label_encoders = {}
        self.is_trained = False
        self.model_path = os.path.join(os.path.dirname(__file__), 'weights/yield_model.joblib')
        self.encoders_path = os.path.join(os.path.dirname(__file__), 'weights/label_encoders.joblib')
        
        # Load the pre-trained model
        self.load_model()

    def load_model(self):
        """Load the trained model and encoders"""
        try:
            self.model = joblib.load(self.model_path)
            self.label_encoders = joblib.load(self.encoders_path)
            self.is_trained = True
            print("Yield Prediction Model loaded successfully!")
        except Exception as e:
            print(f"Error loading model: {e}")
            self.is_trained = False

    def predict(self, area, crop, year, rainfall, pesticides, temp):
        """Make yield prediction based on input parameters"""
        try:
            if not self.is_trained:
                raise Exception("Model is not loaded!")

            # Encode categorical inputs
            area_encoded = self.label_encoders['Area'].transform([area])[0]
            crop_encoded = self.label_encoders['Item'].transform([crop])[0]

            # Create input DataFrame
            input_df = pd.DataFrame(
                [[area_encoded, crop_encoded, year, rainfall, pesticides, temp]],
                columns=['Area', 'Item', 'Year', 'average_rain_fall_mm_per_year', 
                        'pesticides_tonnes', 'avg_temp']
            )

            # Make prediction
            predicted_yield = self.model.predict(input_df)[0]

            # Generate recommendations
            recommendations = self.generate_recommendations(rainfall, pesticides, temp, predicted_yield)

            return {
                "success": True,
                "yield": float(predicted_yield),
                "recommendations": recommendations
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def generate_recommendations(self, rainfall, pesticides, temp, predicted_yield):
        """Generate recommendations based on input parameters"""
        recommendations = []

        if rainfall < 500:
            recommendations.append("Consider implementing irrigation systems due to low rainfall")
        elif rainfall > 2000:
            recommendations.append("Ensure proper drainage systems to handle high rainfall")

        if temp > 30:
            recommendations.append("Implement shade management techniques to protect crops")
        elif temp < 15:
            recommendations.append("Monitor frost risk and implement frost protection measures")

        if pesticides > 1000:
            recommendations.append("Consider reducing pesticide usage through integrated pest management")
        
        if predicted_yield < 20000:
            recommendations.append("Consider soil testing and appropriate fertilization")

        return recommendations