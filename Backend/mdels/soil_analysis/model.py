import tensorflow as tf
import numpy as np
import joblib
import os
from PIL import Image
import io

class SoilAnalysisModel:
    def __init__(self):
        self.model = None
        self.class_names = None
        self.IMG_SIZE = (300, 300)  # Updated size for new model
        self.load_model()

    def load_model(self):
        try:
            model_path = os.path.join(os.path.dirname(__file__), 'weights', 'soil_model.h5')
            classes_path = os.path.join(os.path.dirname(__file__), 'weights', 'soil_classes.joblib')
            
            # Load model with custom objects if needed
            self.model = tf.keras.models.load_model(model_path, compile=False)
            self.model.compile(
                optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
                loss='categorical_crossentropy',
                metrics=['accuracy']
            )
            self.class_names = joblib.load(classes_path)
            print("Soil analysis model loaded successfully")
        except Exception as e:
            print(f"Error loading soil analysis model: {str(e)}")
            raise

    def preprocess_image(self, image):
        try:
            # Convert to PIL Image if bytes
            if isinstance(image, bytes):
                image = Image.open(io.BytesIO(image))
            elif isinstance(image, str):
                image = Image.open(image)
            
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize
            image = image.resize(self.IMG_SIZE)
            
            # Convert to numpy array and preprocess
            image = np.array(image)
            image = image.astype('float32') / 255.0
            
            # Add batch dimension
            image = np.expand_dims(image, axis=0)
            
            return image
        except Exception as e:
            print(f"Error preprocessing image: {str(e)}")
            raise

    def predict(self, image):
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image)
            
            # Make prediction
            predictions = self.model.predict(processed_image)
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx])
            
            # Get soil characteristics
            soil_type = self.class_names[predicted_class_idx]
            characteristics = self.get_soil_characteristics(soil_type)
            
            return {
                'success': True,
                'data': {
                    'soil_type': soil_type,
                    'confidence': confidence * 100,  # Convert to percentage
                    'characteristics': characteristics,
                    'all_probabilities': {
                        soil: float(prob) * 100
                        for soil, prob in zip(self.class_names, predictions[0])
                    }
                }
            }
        except Exception as e:
            print(f"Prediction error: {str(e)}")
            return {
                'success': False,
                'error': str(e)
            }

    def get_soil_characteristics(self, soil_type):
        characteristics = {
            'Alluvial soil': {
                'description': 'Fertile soil deposited by flowing water',
                'properties': {
                    'texture': 'Fine-grained',
                    'drainage': 'Good',
                    'fertility': 'High',
                    'pH_range': '6.5-7.5'
                },
                'suitable_crops': [
                    'Rice', 'Wheat', 'Sugarcane', 'Vegetables'
                ],
                'recommendations': [
                    'Regular irrigation',
                    'Moderate fertilization',
                    'Good for most crops'
                ]
            },
            'Black Soil': {
                'description': 'Rich in clay minerals and organic matter',
                'properties': {
                    'texture': 'Clayey',
                    'drainage': 'Poor',
                    'fertility': 'Very High',
                    'pH_range': '7.0-8.5'
                },
                'suitable_crops': [
                    'Cotton', 'Sugarcane', 'Wheat', 'Oilseeds'
                ],
                'recommendations': [
                    'Careful water management',
                    'Deep plowing',
                    'Add organic matter'
                ]
            },
            'Clay soil': {
                'description': 'Dense, heavy soil with high mineral content',
                'properties': {
                    'texture': 'Heavy',
                    'drainage': 'Poor',
                    'fertility': 'Medium to High',
                    'pH_range': '5.5-7.0'
                },
                'suitable_crops': [
                    'Rice', 'Wheat', 'Corn', 'Vegetables'
                ],
                'recommendations': [
                    'Improve drainage',
                    'Add organic matter',
                    'Avoid overwatering'
                ]
            },
            'Red soil': {
                'description': 'Rich in iron oxides, well-drained',
                'properties': {
                    'texture': 'Sandy to Loamy',
                    'drainage': 'Excellent',
                    'fertility': 'Medium',
                    'pH_range': '6.0-7.0'
                },
                'suitable_crops': [
                    'Groundnut', 'Potato', 'Corn', 'Millet'
                ],
                'recommendations': [
                    'Regular fertilization',
                    'Irrigation management',
                    'Add organic matter'
                ]
            }
        }
        return characteristics.get(soil_type, {})