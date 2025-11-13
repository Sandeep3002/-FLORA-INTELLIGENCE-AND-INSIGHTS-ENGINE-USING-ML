# routes/disease_detection.py
from flask import Blueprint, request
from models.disease_detection.model import DiseaseDetectionModel
from utils.image_processing import process_image
from utils.response_handler import success_response, error_response
import traceback

bp = Blueprint('disease_detection', __name__)
model = DiseaseDetectionModel()

@bp.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if image was uploaded
        if 'image' not in request.files:
            return error_response('No image uploaded', 400)
        
        image_file = request.files['image']
        if not image_file.filename:
            return error_response('No selected file', 400)
            
        print(f"Processing file: {image_file.filename}")
        
        # Process image
        image = process_image(image_file)
        
        # Make prediction
        result = model.predict(image)
        
        # Validate predictions
        if not model.validate_prediction(result['predictions']):
            return error_response('Invalid prediction results', 500)
        
        # Format response
        response = model.format_response(result['predictions'])
        
        return success_response(response)
        
    except Exception as e:
        print(f"Error in prediction route: {str(e)}")
        print(traceback.format_exc())  # Detailed error trace
        return error_response(str(e), 500)

@bp.route('/health', methods=['GET'])
def health():
    return success_response({
        'status': 'healthy',
        'model': model.model_name
    })