# models/disease_detection/disease_recommendations.py

PLANT_DISEASE_RECOMMENDATIONS = {
    "Apple___Apple_scab": {
        "name": "Apple Scab",
        "description": "A fungal disease caused by Venturia inaequalis that affects apple trees, causing dark, scaly lesions on leaves and fruit.",
        "symptoms": [
            "Dark olive-green spots on leaves",
            "Dark, scaly lesions on fruit",
            "Deformed fruit development",
            "Premature leaf drop",
            "Infected leaves develop velvet-like spots"
        ],
        "treatments": [
            "Apply fungicides early in the growing season",
            "Remove and destroy infected leaves and fruit",
            "Prune trees to improve air circulation",
            "Use resistant apple varieties when possible",
            "Apply protective fungicides before rainy periods"
        ],
        "prevention": [
            "Plant resistant apple varieties",
            "Maintain good air circulation between trees",
            "Clean up fallen leaves and fruit promptly",
            "Apply preventive fungicides according to local guidelines",
            "Proper tree spacing during planting"
        ],
        "environmental_factors": {
            "temperature": "20-25°C (68-77°F)",
            "humidity": "High humidity promotes infection",
            "conditions": "Wet conditions favor disease development"
        }
    },
    "Apple___Black_rot": {
        "name": "Black Rot",
        "description": "A fungal disease caused by Botryosphaeria obtusa affecting apple trees, causing leaf spots and fruit rot.",
        "symptoms": [
            "Purple spots on leaves",
            "Rotted areas on fruit with concentric rings",
            "Mummified fruit remaining on trees",
            "Cankers on branches and twigs",
            "Leaf spots with purple margins"
        ],
        "treatments": [
            "Remove infected fruit and cankers",
            "Apply appropriate fungicides during growing season",
            "Prune out dead or diseased wood",
            "Maintain tree vigor through proper fertilization",
            "Remove mummified fruit from trees"
        ],
        "prevention": [
            "Regular pruning to improve air circulation",
            "Remove all mummified fruit",
            "Practice proper sanitation",
            "Balanced fertilization program",
            "Proper tree spacing"
        ],
        "environmental_factors": {
            "temperature": "20-26°C (68-79°F)",
            "humidity": "Moderate to high",
            "conditions": "Warm, humid weather favors disease"
        }
    },
    "Apple___Cedar_apple_rust": {
        "name": "Cedar Apple Rust",
        "description": "A fungal disease caused by Gymnosporangium juniperi-virginianae that requires both apple trees and cedar trees to complete its life cycle.",
        "symptoms": [
            "Bright orange-yellow spots on leaves",
            "Raised spots with black dots on leaf undersides",
            "Deformed fruit with yellow lesions",
            "Early defoliation in severe cases",
            "Small, raised spots on fruit"
        ],
        "treatments": [
            "Apply fungicides in early spring",
            "Remove infected leaves",
            "Maintain tree health",
            "Protect trees during critical infection periods",
            "Monitor nearby cedar trees"
        ],
        "prevention": [
            "Plant resistant varieties",
            "Remove nearby cedar trees if possible",
            "Apply preventive fungicides",
            "Maintain good air circulation",
            "Regular monitoring of trees"
        ],
        "environmental_factors": {
            "temperature": "10-24°C (50-75°F)",
            "humidity": "High humidity required",
            "conditions": "Spring rainfall crucial for infection"
        }
    },
    "Apple___healthy": {
        "name": "Healthy Apple Tree",
        "description": "A healthy apple tree showing normal growth and development without signs of disease.",
        "symptoms": [
            "Vibrant green leaves",
            "Normal fruit development",
            "Good leaf density",
            "Uniform leaf color",
            "No unusual spots or lesions"
        ],
        "treatments": [
            "Regular watering schedule",
            "Balanced fertilization",
            "Routine pruning",
            "Monitor for early signs of problems",
            "Maintain good orchard hygiene"
        ],
        "prevention": [
            "Regular monitoring",
            "Proper irrigation practices",
            "Annual pruning",
            "Balanced nutrition program",
            "Good air circulation"
        ],
        "environmental_factors": {
            "temperature": "15-30°C (59-86°F)",
            "humidity": "Moderate",
            "conditions": "Well-drained soil, full sun"
        }
    },
    "Corn___Common_rust": {
        "name": "Common Rust",
        "description": "A fungal disease caused by Puccinia sorghi that produces rusty spots on corn leaves.",
        "symptoms": [
            "Small, round to elongated brown pustules",
            "Pustules on both leaf surfaces",
            "Rust-colored spores that rub off easily",
            "Severe infection causes leaf death",
            "Chlorotic areas around pustules"
        ],
        "treatments": [
            "Apply appropriate fungicides",
            "Remove heavily infected leaves",
            "Maintain proper plant spacing",
            "Ensure good field drainage",
            "Monitor disease progression"
        ],
        "prevention": [
            "Plant resistant hybrids",
            "Early planting when possible",
            "Crop rotation",
            "Regular field monitoring",
            "Proper field drainage"
        ],
        "environmental_factors": {
            "temperature": "16-25°C (61-77°F)",
            "humidity": "High humidity needed",
            "conditions": "Cool, humid conditions favor development"
        }
    },
    "Corn___Northern_Leaf_Blight": {
        "name": "Northern Leaf Blight",
        "description": "A fungal disease caused by Exserohilum turcicum that creates long, cigar-shaped lesions on corn leaves.",
        "symptoms": [
            "Long, elliptical gray-green lesions",
            "Lesions turn tan as they mature",
            "Starts on lower leaves",
            "Lesions may coalesce",
            "Severe infection causes leaf death"
        ],
        "treatments": [
            "Apply fungicides when disease appears",
            "Remove infected plant debris",
            "Maintain plant vigor",
            "Improve air circulation",
            "Proper timing of fungicide application"
        ],
        "prevention": [
            "Plant resistant hybrids",
            "Crop rotation",
            "Residue management",
            "Proper plant spacing",
            "Regular field scouting"
        ],
        "environmental_factors": {
            "temperature": "18-27°C (64-80°F)",
            "humidity": "High humidity required",
            "conditions": "Moderate temperatures with heavy dew"
        }
    },
    "Corn___healthy": {
        "name": "Healthy Corn",
        "description": "Healthy corn plants showing normal growth and development without disease symptoms.",
        "symptoms": [
            "Dark green leaves",
            "Uniform growth",
            "No lesions or spots",
            "Good stand establishment",
            "Normal leaf development"
        ],
        "treatments": [
            "Regular fertilization",
            "Proper irrigation",
            "Weed control",
            "Pest monitoring",
            "Maintain soil health"
        ],
        "prevention": [
            "Proper crop rotation",
            "Good soil preparation",
            "Balanced nutrition",
            "Adequate plant spacing",
            "Regular monitoring"
        ],
        "environmental_factors": {
            "temperature": "20-30°C (68-86°F)",
            "humidity": "Moderate",
            "conditions": "Well-drained soil, full sun"
        }
    },
    # Continuing PLANT_DISEASE_RECOMMENDATIONS dictionary...

    "Potato___Early_blight": {
        "name": "Potato Early Blight",
        "description": "A fungal disease caused by Alternaria solani affecting potato plants, particularly older leaves.",
        "symptoms": [
            "Dark brown spots with concentric rings",
            "Yellowing around lesions",
            "Lower leaves affected first",
            "Angular shaped spots",
            "Spots may merge as disease progresses"
        ],
        "treatments": [
            "Apply appropriate fungicides",
            "Remove infected leaves",
            "Improve air circulation",
            "Maintain plant vigor",
            "Proper plant spacing"
        ],
        "prevention": [
            "Crop rotation (2-3 years)",
            "Plant certified disease-free seed",
            "Proper plant spacing",
            "Avoid overhead irrigation",
            "Maintain balanced soil fertility"
        ],
        "environmental_factors": {
            "temperature": "20-30°C (68-86°F)",
            "humidity": "High humidity promotes disease",
            "conditions": "Alternating wet and dry periods favor development"
        }
    },
    "Potato___Late_blight": {
        "name": "Potato Late Blight",
        "description": "A devastating disease caused by Phytophthora infestans, known for causing the Irish Potato Famine.",
        "symptoms": [
            "Water-soaked black/brown spots on leaves",
            "White fuzzy growth on leaf undersides",
            "Rapid leaf death and blackening",
            "Brown lesions on tubers",
            "Entire plant collapse in severe cases"
        ],
        "treatments": [
            "Apply fungicides immediately upon detection",
            "Remove and destroy infected plants",
            "Increase plant spacing",
            "Improve field drainage",
            "Monitor weather conditions"
        ],
        "prevention": [
            "Use resistant varieties",
            "Plant certified disease-free seed",
            "Proper hilling of soil",
            "Avoid overhead irrigation",
            "Regular field monitoring"
        ],
        "environmental_factors": {
            "temperature": "10-24°C (50-75°F)",
            "humidity": "High humidity required",
            "conditions": "Cool, wet weather favors disease"
        }
    },
    "Potato___healthy": {
        "name": "Healthy Potato Plant",
        "description": "Healthy potato plants showing normal growth and development.",
        "symptoms": [
            "Dark green leaves",
            "Uniform growth",
            "No spots or lesions",
            "Good canopy development",
            "Normal stem coloration"
        ],
        "treatments": [
            "Regular fertilization",
            "Proper irrigation",
            "Weed management",
            "Regular monitoring",
            "Balanced nutrition"
        ],
        "prevention": [
            "Crop rotation",
            "Proper spacing",
            "Good soil preparation",
            "Adequate drainage",
            "Regular field inspection"
        ],
        "environmental_factors": {
            "temperature": "15-25°C (59-77°F)",
            "humidity": "Moderate",
            "conditions": "Well-drained soil, full sun"
        }
    },
    "Tomato___Bacterial_spot": {
        "name": "Tomato Bacterial Spot",
        "description": "A bacterial disease caused by Xanthomonas species affecting tomato leaves, stems, and fruit.",
        "symptoms": [
            "Small, dark brown spots on leaves",
            "Spots with yellow halos",
            "Scabby lesions on fruit",
            "Defoliation in severe cases",
            "Water-soaked leaf spots"
        ],
        "treatments": [
            "Apply copper-based bactericides",
            "Remove infected plants",
            "Improve air circulation",
            "Avoid overhead irrigation",
            "Practice crop rotation"
        ],
        "prevention": [
            "Use disease-free seeds",
            "Proper plant spacing",
            "Avoid working with wet plants",
            "Regular monitoring",
            "Sanitation practices"
        ],
        "environmental_factors": {
            "temperature": "25-30°C (77-86°F)",
            "humidity": "High humidity promotes disease",
            "conditions": "Warm, wet conditions favor development"
        }
    },
    "Tomato___Early_blight": {
        "name": "Tomato Early Blight",
        "description": "A fungal disease caused by Alternaria solani affecting tomato leaves, stems, and fruit.",
        "symptoms": [
            "Dark brown spots with concentric rings",
            "Yellow halo around spots",
            "Lower leaves affected first",
            "Stem lesions",
            "Fruit rot at stem end"
        ],
        "treatments": [
            "Apply fungicides",
            "Remove infected leaves",
            "Stake plants for better air flow",
            "Maintain plant vigor",
            "Proper watering practices"
        ],
        "prevention": [
            "Crop rotation",
            "Mulching",
            "Proper plant spacing",
            "Remove plant debris",
            "Use resistant varieties"
        ],
        "environmental_factors": {
            "temperature": "24-29°C (75-84°F)",
            "humidity": "High humidity",
            "conditions": "Warm, humid conditions"
        }
    },
    "Tomato___Late_blight": {
        "name": "Tomato Late Blight",
        "description": "A devastating disease caused by Phytophthora infestans affecting all plant parts.",
        "symptoms": [
            "Large, dark brown patches on leaves",
            "White fuzzy growth on undersides",
            "Brown lesions on stems",
            "Fruit rot with greasy appearance",
            "Rapid plant collapse"
        ],
        "treatments": [
            "Apply fungicides preventively",
            "Remove infected plants",
            "Improve drainage",
            "Increase air circulation",
            "Destroy infected plant material"
        ],
        "prevention": [
            "Use resistant varieties",
            "Proper plant spacing",
            "Avoid overhead irrigation",
            "Monitor weather conditions",
            "Clean garden tools"
        ],
        "environmental_factors": {
            "temperature": "10-24°C (50-75°F)",
            "humidity": "High humidity required",
            "conditions": "Cool, wet weather"
        }
    },
    "Tomato___Leaf_Mold": {
        "name": "Tomato Leaf Mold",
        "description": "A fungal disease caused by Passalora fulva, common in greenhouse tomatoes.",
        "symptoms": [
            "Yellow spots on upper leaf surface",
            "Olive-green mold on leaf undersides",
            "Leaf curling and withering",
            "Premature leaf drop",
            "Reduced fruit yield"
        ],
        "treatments": [
            "Apply appropriate fungicides",
            "Remove infected leaves",
            "Reduce humidity",
            "Improve air circulation",
            "Space plants properly"
        ],
        "prevention": [
            "Use resistant varieties",
            "Proper ventilation",
            "Avoid leaf wetness",
            "Regular monitoring",
            "Sanitation practices"
        ],
        "environmental_factors": {
            "temperature": "21-24°C (70-75°F)",
            "humidity": "85% or higher promotes disease",
            "conditions": "High humidity, poor air circulation"
        }
    },
    "Tomato___Septoria_leaf_spot": {
        "name": "Septoria Leaf Spot",
        "description": "A fungal disease caused by Septoria lycopersici, primarily affecting leaves.",
        "symptoms": [
            "Small circular spots with dark borders",
            "Gray centers in spots",
            "Lower leaves affected first",
            "Yellowing of infected leaves",
            "Severe defoliation"
        ],
        "treatments": [
            "Apply fungicides",
            "Remove infected leaves",
            "Improve air circulation",
            "Proper watering practices",
            "Maintain plant vigor"
        ],
        "prevention": [
            "Crop rotation",
            "Remove plant debris",
            "Mulching",
            "Proper spacing",
            "Avoid overhead watering"
        ],
        "environmental_factors": {
            "temperature": "20-27°C (68-81°F)",
            "humidity": "High humidity needed",
            "conditions": "Warm, wet conditions"
        }
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "name": "Two-spotted Spider Mite",
        "description": "An arachnid pest that causes stippling and webbing on tomato plants.",
        "symptoms": [
            "Yellow stippling on leaves",
            "Fine webbing on leaves",
            "Bronzing of leaves",
            "Leaf drop in severe cases",
            "Visible mites under magnification"
        ],
        "treatments": [
            "Apply miticides",
            "Use insecticidal soaps",
            "Increase humidity",
            "Remove heavily infested leaves",
            "Biological control with predatory mites"
        ],
        "prevention": [
            "Regular monitoring",
            "Maintain plant vigor",
            "Proper irrigation",
            "Avoid water stress",
            "Control dust on plants"
        ],
        "environmental_factors": {
            "temperature": "27-32°C (80-90°F)",
            "humidity": "Low humidity favors mites",
            "conditions": "Hot, dry conditions"
        }
    },
    "Tomato___Target_Spot": {
        "name": "Target Spot",
        "description": "A fungal disease caused by Corynespora cassiicola, affecting leaves, stems, and fruit.",
        "symptoms": [
            "Brown circular spots with concentric rings",
            "Dark brown lesions on fruit",
            "Stem cankers",
            "Leaf yellowing",
            "Defoliation"
        ],
        "treatments": [
            "Apply fungicides",
            "Remove infected plant parts",
            "Improve air circulation",
            "Proper plant spacing",
            "Maintain plant vigor"
        ],
        "prevention": [
            "Use resistant varieties",
            "Crop rotation",
            "Proper sanitation",
            "Avoid overhead irrigation",
            "Regular monitoring"
        ],
        "environmental_factors": {
            "temperature": "20-30°C (68-86°F)",
            "humidity": "High humidity required",
            "conditions": "Warm, humid conditions"
        }
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "name": "Tomato Yellow Leaf Curl Virus",
        "description": "A viral disease transmitted by whiteflies, causing severe stunting and yield loss.",
        "symptoms": [
            "Leaf curling and yellowing",
            "Stunted growth",
            "Reduced fruit set",
            "Small, pale fruits",
            "Upward cupping of leaves"
        ],
        "treatments": [
            "Remove infected plants",
            "Control whitefly populations",
            "Use reflective mulches",
            "Apply appropriate insecticides",
            "Support plant vigor"
        ],
        "prevention": [
            "Use resistant varieties",
            "Control whiteflies",
            "Use insect screens",
            "Early planting",
            "Regular monitoring"
        ],
        "environmental_factors": {
            "temperature": "20-30°C (68-86°F)",
            "humidity": "Moderate",
            "conditions": "Conditions favorable for whiteflies"
        }
    },
    "Tomato___Tomato_mosaic_virus": {
        "name": "Tomato Mosaic Virus",
        "description": "A viral disease causing mottled coloration and distorted growth.",
        "symptoms": [
            "Mottled light and dark green leaves",
            "Distorted leaves",
            "Stunted growth",
            "Reduced fruit set",
            "Fruit discoloration"
        ],
        "treatments": [
            "Remove infected plants",
            "Control insect vectors",
            "Maintain plant vigor",
            "Proper sanitation",
            "No direct cure available"
        ],
        "prevention": [
            "Use virus-free seed",
            "Resistant varieties",
            "Clean tools and hands",
            "Control weeds",
            "Avoid tobacco use near plants"
        ],
        "environmental_factors": {
            "temperature": "20-30°C (68-86°F)",
            "humidity": "Various",
            "conditions": "Spreads easily in any condition"
        }
    },
    "Tomato___healthy": {
        "name": "Healthy Tomato Plant",
        "description": "Healthy tomato plants showing normal growth and development.",
        "symptoms": [
            "Deep green leaves",
            "Strong stem growth",
            "Normal leaf shape",
            "Good fruit set",
            "Vigorous growth"
        ],
        "treatments": [
            "Regular fertilization",
            "Proper irrigation",
            "Support/staking",
            "Pruning as needed",
            "Regular monitoring"
        ],
        "prevention": [
            "Proper spacing",
            "Good air circulation",
            "Regular inspection",
            "Balanced nutrition",
            "Clean cultivation"
        ],
        "environmental_factors": {
            "temperature": "20-30°C (68-86°F)",
            "humidity": "Moderate",
            "conditions": "Well-drained soil, full sun"
        }
    }
}

def get_detailed_recommendations(disease_label):
    """Get detailed recommendations for a specific disease"""
    recommendations = PLANT_DISEASE_RECOMMENDATIONS.get(disease_label, {})
    
    if not recommendations:
        return {
            "name": disease_label.replace('_', ' '),
            "description": "Specific information not available for this condition.",
            "symptoms": ["Consult a local agricultural expert for specific symptom identification."],
            "treatments": ["Consult a local agricultural expert for treatment recommendations."],
            "prevention": ["Regular monitoring and maintenance of plant health."],
            "environmental_factors": {
                "temperature": "Specific temperature requirements not available",
                "humidity": "Specific humidity requirements not available",
                "conditions": "Consult local agricultural experts for optimal conditions"
            }
        }
    
    return recommendations
