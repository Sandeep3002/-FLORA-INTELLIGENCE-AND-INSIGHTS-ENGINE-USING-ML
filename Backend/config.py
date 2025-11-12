# config.py
class Config:
    CORS_ORIGINS = ["http://localhost:5173"]  # React app URL
    DEBUG = True
    PORT = 5001
    
    # Model paths
    MODEL_PATHS = {
        'disease_detection': 'models/disease_detection/weights/model_weights.pth',
        'yield_prediction': 'models/yield_prediction/weights/model_weights.pth',
        'species_identification': 'models/species_identification/weights/model_weights.pth',
        'soil_analysis': 'models/soil_analysis/weights/model_weights.pth',
        'crop_recommendation': 'models/crop_recommendation/weights/model_weights.pth'
    }

    # Image settings
    IMAGE_SIZE = (224, 224)
    CHANNELS = 3