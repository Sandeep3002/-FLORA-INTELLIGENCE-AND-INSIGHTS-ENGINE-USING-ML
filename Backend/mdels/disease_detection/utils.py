# models/disease_detection/utils.py
def get_disease_info(disease_name):
    """Get detailed information about a disease"""
    disease_info = {
        'Tomato Early Blight': {
            'name': 'Tomato Early Blight',
            'description': 'A fungal disease causing dark spots with concentric rings on tomato leaves.',
            'treatments': [
                'Remove infected leaves',
                'Apply appropriate fungicides',
                'Improve air circulation',
                'Maintain plant vigor'
            ],
            'prevention': [
                'Crop rotation',
                'Proper plant spacing',
                'Regular monitoring',
                'Mulching'
            ]
        },
        'Tomato Late Blight': {
            'name': 'Tomato Late Blight',
            'description': 'A serious disease causing water-soaked spots that turn brown or black.',
            'treatments': [
                'Remove infected plants',
                'Apply fungicides promptly',
                'Improve drainage',
                'Destroy infected plant material'
            ],
            'prevention': [
                'Use resistant varieties',
                'Proper spacing',
                'Avoid overhead watering',
                'Monitor weather conditions'
            ]
        },
        'Tomato Healthy': {
            'name': 'Healthy Tomato Plant',
            'description': 'Plant shows no signs of disease.',
            'treatments': [],
            'prevention': [
                'Regular monitoring',
                'Proper watering practices',
                'Good air circulation',
                'Balanced nutrition'
            ]
        },
        # Add more disease information as needed
    }
    
    # Return default info if specific disease not found
    return disease_info.get(disease_name, {
        'name': disease_name,
        'description': 'Specific information not available for this condition.',
        'treatments': ['Consult a local agricultural expert for specific treatment recommendations.'],
        'prevention': ['Regular monitoring and maintenance of plant health.']
    })