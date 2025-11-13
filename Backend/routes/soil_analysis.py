# backend/routes/soil_analysis.py

from flask import Blueprint, request
from models.soil_analysis.model import SoilAnalysisModel
from utils.image_processing import process_image
from utils.response_handler import success_response, error_response, handle_error

soil_analysis_bp = Blueprint('soil_analysis', __name__)
model = SoilAnalysisModel()

@soil_analysis_bp.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return error_response("No image provided", 400)

        image_file = request.files['image']
        if image_file.filename == '':
            return error_response("No image selected", 400)

        # Process image using existing function
        processed_image = process_image(image_file)
        
        # Get prediction
        result = model.predict(processed_image)
        
        if not result['success']:
            return error_response(result.get('error', 'Prediction failed'), 500)

        return success_response(
            data=result['data'],
            message="Soil analysis completed successfully"
        )

    except Exception as e:
        return handle_error(e)