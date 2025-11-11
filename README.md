# Plant Detection and Agricultural Analysis System

A comprehensive web application for plant species identification, disease detection, soil analysis, crop recommendation, and yield prediction using machine learning and computer vision.

## Features

- **Species Identification**: Identify plant species from images
- **Disease Detection**: Detect plant diseases and get treatment recommendations
- **Soil Analysis**: Analyze soil types from images
- **Crop Recommendation**: Get personalized crop suggestions based on soil and environmental parameters
- **Yield Prediction**: Predict crop yields based on historical data and current conditions

## Project Structure

- **Frontend**: React application with Tailwind CSS
- **Backend**: Flask API server
- **Model Development**: Machine learning models for various agricultural analyses

## Setup Instructions

### Prerequisites

- Python 3.9+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Model Development

The `model_development` directory contains scripts for training and evaluating the machine learning models used in the application.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Flask, Python
- **Machine Learning**: TensorFlow, scikit-learn
- **Data Processing**: NumPy, Pandas

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
