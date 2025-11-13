# backend/routes/yield_prediction.py

from flask import Blueprint, request
from models.yield_prediction.model import YieldPredictionModel
from utils.response_handler import success_response, error_response

bp = Blueprint('yield_prediction', __name__)
model = YieldPredictionModel()

@bp.route('/predict', methods=['POST'])
def predict_yield():
    try:
        data = request.get_json()
        
        # Validate input data
        required_fields = ['area', 'crop', 'year', 'rainfall', 'pesticides', 'temperature']
        for field in required_fields:
            if field not in data:
                return error_response(f'Missing required field: {field}', 400)

        # Make prediction
        result = model.predict(
            area=data['area'],
            crop=data['crop'],
            year=int(data['year']),
            rainfall=float(data['rainfall']),
            pesticides=float(data['pesticides']),
            temp=float(data['temperature'])
        )

        if result['success']:
            return success_response(result)
        else:
            return error_response(result['error'], 500)

    except Exception as e:
        return error_response(str(e), 500)