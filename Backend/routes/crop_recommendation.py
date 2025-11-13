# backend/routes/crop_recommendation.py

from flask import Blueprint, request
from models.crop_recommendation.model import CropRecommendationModel
from utils.response_handler import success_response, error_response, handle_error

crop_recommendation_bp = Blueprint('crop_recommendation', __name__)
model = CropRecommendationModel()

@crop_recommendation_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        for field in required_fields:
            if field not in data:
                return error_response(f"Missing required field: {field}", 400)
            
            # Convert to float
            try:
                data[field] = float(data[field])
            except ValueError:
                return error_response(f"Invalid value for {field}: must be a number", 400)
        
        # Get prediction
        result = model.predict(data)
        
        if not result['success']:
            return error_response(result.get('error', 'Prediction failed'), 400)

        return success_response(
            data=result['data'],
            message="Crop recommendations generated successfully"
        )

    except Exception as e:
        return handle_error(e)