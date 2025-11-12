# backend/models/crop_recommendation/model.py

import numpy as np
import joblib
import os

class CropRecommendationModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.load_model()
        
        # Detailed crop information dictionary
        self.crop_info = {
            'rice': {
                'description': 'A major cereal grain that is a staple food worldwide',
                'growing_season': '120-180 days',
                'water_requirements': 'High',
                'optimal_conditions': {
                    'temperature': '20-30°C',
                    'humidity': '70-85%',
                    'ph': '6.0-7.0',
                    'rainfall': '150-300mm'
                },
                'care_instructions': [
                    'Maintain standing water in the field',
                    'Regular weeding is essential',
                    'Monitor for pests and diseases',
                    'Ensure proper drainage system'
                ]
            },
            'maize': {
                'description': 'Also known as corn, a versatile crop used for food and feed',
                'growing_season': '90-120 days',
                'water_requirements': 'Moderate',
                'optimal_conditions': {
                    'temperature': '20-30°C',
                    'humidity': '50-80%',
                    'ph': '5.5-7.0',
                    'rainfall': '100-200mm'
                },
                'care_instructions': [
                    'Regular irrigation during growth',
                    'Proper spacing between plants',
                    'Timely fertilizer application',
                    'Control weeds early in the season'
                ]
            },
            'chickpea': {
                'description': 'A protein-rich legume crop with nitrogen-fixing properties',
                'growing_season': '100-120 days',
                'water_requirements': 'Low to Moderate',
                'optimal_conditions': {
                    'temperature': '20-25°C',
                    'humidity': '40-60%',
                    'ph': '6.0-8.0',
                    'rainfall': '60-100mm'
                },
                'care_instructions': [
                    'Avoid over-irrigation',
                    'Monitor for pod borers',
                    'Maintain proper row spacing',
                    'Intercropping recommended'
                ]
            },
            # Add more crops with their detailed information...
        }

    def load_model(self):
        try:
            model_path = os.path.join(os.path.dirname(__file__), 'weights', 'crop_model.joblib')
            scaler_path = os.path.join(os.path.dirname(__file__), 'weights', 'crop_scaler.joblib')
            
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
            print("Crop recommendation model loaded successfully")
        except Exception as e:
            print(f"Error loading crop recommendation model: {str(e)}")
            raise

    def validate_input(self, data):
        """Validate input data ranges"""
        validations = {
            'N': {'min': 0, 'max': 140},
            'P': {'min': 5, 'max': 145},
            'K': {'min': 5, 'max': 205},
            'temperature': {'min': 8, 'max': 44},
            'humidity': {'min': 14, 'max': 100},
            'ph': {'min': 3.5, 'max': 10},
            'rainfall': {'min': 20, 'max': 300}
        }
        
        for field, ranges in validations.items():
            if data[field] < ranges['min'] or data[field] > ranges['max']:
                raise ValueError(f"{field} value out of range. Expected between {ranges['min']} and {ranges['max']}")

    def predict(self, data):
        try:
            # Validate input ranges
            self.validate_input(data)
            
            # Prepare features
            features = np.array([[
                data['N'], data['P'], data['K'],
                data['temperature'], data['humidity'],
                data['ph'], data['rainfall']
            ]])
            
            # Scale features
            scaled_features = self.scaler.transform(features)
            
            # Get predictions and probabilities
            prediction = self.model.predict(scaled_features)
            probabilities = self.model.predict_proba(scaled_features)
            
            # Get top 3 recommendations
            top_3_idx = np.argsort(probabilities[0])[-3:][::-1]
            recommendations = []
            
            for idx in top_3_idx:
                crop_name = self.model.classes_[idx]
                crop_info = self.crop_info.get(crop_name.lower(), {
                    'description': 'Detailed information not available',
                    'growing_season': 'Information not available',
                    'water_requirements': 'Information not available',
                    'optimal_conditions': {},
                    'care_instructions': []
                })
                
                recommendations.append({
                    'crop': crop_name,
                    'probability': probabilities[0][idx] * 100,
                    'info': crop_info
                })
            
            return {
                'success': True,
                'data': {
                    'primary_recommendation': prediction[0],
                    'confidence': float(np.max(probabilities) * 100),
                    'all_recommendations': recommendations,
                    'input_summary': {
                        'soil_nutrients': {
                            'N': data['N'],
                            'P': data['P'],
                            'K': data['K'],
                            'ph': data['ph']
                        },
                        'environmental_conditions': {
                            'temperature': data['temperature'],
                            'humidity': data['humidity'],
                            'rainfall': data['rainfall']
                        }
                    }
                }
            }
        except ValueError as ve:
            return {
                'success': False,
                'error': str(ve)
            }
        except Exception as e:
            return {
                'success': False,
                'error': f"Prediction error: {str(e)}"
            }