# utils/image_processing.py
from PIL import Image
import io

def process_image(image_file):
    """Process uploaded image files for model input"""
    try:
        # Read and convert image to RGB
        image = Image.open(io.BytesIO(image_file.read())).convert('RGB')
        return image
        
    except Exception as e:
        raise Exception(f"Error processing image: {str(e)}")