# models/disease_detection/model.py
from transformers import pipeline, AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
import os
from dotenv import load_dotenv
from datetime import datetime
from .disease_recommendations import get_detailed_recommendations

# Load environment variables
load_dotenv()
HF_TOKEN = os.getenv('HF_API_TOKEN')

class DiseaseDetectionModel:
    def __init__(self):
        self.model_name = "ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease"
        print("Initializing disease detection model...")
        
        try:
            # Initialize the pipeline
            self.pipe = pipeline(
                "image-classification",
                model=self.model_name,
                token=HF_TOKEN
            )
            
            # Also load model components separately for more control if needed
            self.processor = AutoImageProcessor.from_pretrained(
                self.model_name,
                token=HF_TOKEN
            )
            self.model = AutoModelForImageClassification.from_pretrained(
                self.model_name,
                token=HF_TOKEN
            )
            
            print("Disease Detection Model loaded successfully!")
            
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise Exception(f"Failed to load disease detection model: {str(e)}")

    def preprocess_image(self, image):
        """Preprocess image if needed"""
        try:
            # Ensure image is in RGB format
            if image.mode != 'RGB':
                image = image.convert('RGB')
            return image
        except Exception as e:
            print(f"Error preprocessing image: {str(e)}")
            raise Exception(f"Image preprocessing failed: {str(e)}")

    def predict(self, image):
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image)
            
            # Use the pipeline for prediction
            predictions = self.pipe(processed_image)
            print(f"Raw predictions: {predictions}")  # Debug print
            
            # Process and format predictions
            formatted_predictions = []
            for pred in predictions:
                disease_label = pred['label']
                confidence = pred['score'] * 100
                
                # Get detailed recommendations for the disease
                recommendations = get_detailed_recommendations(disease_label)
                
                formatted_predictions.append({
                    'disease': disease_label.replace('_', ' '),
                    'confidence': round(confidence, 2),
                    'details': {
                        'name': recommendations['name'],
                        'description': recommendations['description'],
                        'symptoms': recommendations['symptoms'],
                        'treatments': recommendations['treatments'],
                        'prevention': recommendations['prevention'],
                        'environmental_factors': recommendations['environmental_factors']
                    }
                })
            
            # Add overall analysis summary
            result = {
                'predictions': formatted_predictions,
                'primary_diagnosis': formatted_predictions[0] if formatted_predictions else None,
                'analysis_summary': {
                    'timestamp': datetime.now().isoformat(),
                    'number_of_predictions': len(formatted_predictions),
                    'confidence_threshold': 5.0,  # Minimum confidence to include in results
                    'model_version': self.model_name
                }
            }
            
            return result
            
        except Exception as e:
            print(f"Prediction error: {str(e)}")
            raise Exception(f"Error making prediction: {str(e)}")

    def validate_prediction(self, predictions):
        """Validate prediction results"""
        try:
            if not predictions or len(predictions) == 0:
                raise ValueError("No predictions generated")
            
            # Check confidence levels
            low_confidence = all(pred['confidence'] < 30.0 for pred in predictions)
            if low_confidence:
                print("Warning: All predictions have low confidence scores")
                
            return True
        except Exception as e:
            print(f"Validation error: {str(e)}")
            return False

    def format_response(self, predictions):
        """Format the response with additional insights"""
        try:
            primary_prediction = predictions[0]
            disease_name = primary_prediction['disease']
            confidence = primary_prediction['confidence']
            
            response = {
                'status': 'success',
                'primary_diagnosis': {
                    'disease': disease_name,
                    'confidence': confidence,
                    'recommendation_summary': f"The analysis indicates {disease_name} with {confidence}% confidence. "
                },
                'all_predictions': predictions,
                'metadata': {
                    'model_version': self.model_name,
                    'analysis_timestamp': datetime.now().isoformat()
                }
            }
            
            # Add urgency level based on disease and confidence
            if confidence > 90:
                response['urgency'] = 'high'
            elif confidence > 70:
                response['urgency'] = 'medium'
            else:
                response['urgency'] = 'low'
                
            return response
            
        except Exception as e:
            print(f"Response formatting error: {str(e)}")
            raise Exception(f"Error formatting response: {str(e)}")