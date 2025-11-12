# app.py

from flask import Flask
from flask_cors import CORS
from routes import disease_detection, yield_prediction_bp, soil_analysis,crop_recommendation
from config import Config
import ssl
# Configure SSL context
ssl._create_default_https_context = ssl._create_unverified_context

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, resources={
        r"/*": {
            "origins": ["http://localhost:5173","http://192.168.54.160:5173"],  # Add your frontend URL
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })

    # Register blueprints with prefix
    app.register_blueprint(disease_detection.bp, url_prefix='/api/disease-detection')
    app.register_blueprint(yield_prediction_bp, url_prefix='/api/yield-prediction')
    app.register_blueprint(soil_analysis.soil_analysis_bp, url_prefix='/api/soil-analysis')
    app.register_blueprint(crop_recommendation.crop_recommendation_bp, url_prefix='/api/crop-recommendation'
                           )
    @app.route('/health')
    def health_check():
        return {'status': 'healthy'}

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=Config.DEBUG, port=Config.PORT)