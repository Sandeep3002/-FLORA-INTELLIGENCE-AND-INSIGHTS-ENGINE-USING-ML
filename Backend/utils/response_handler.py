# utils/response_handler.py
from flask import jsonify

def success_response(data, message="Success"):
    """Standard success response"""
    return jsonify({
        'success': True,
        'message': message,
        'data': data
    })

def error_response(message="An error occurred", status_code=400):
    """Standard error response"""
    return jsonify({
        'success': False,
        'message': message
    }), status_code
def handle_error(error):
    """Handle errors and return appropriate response"""
    return jsonify({
        'success': False,
        'message': str(error)
    }), 500