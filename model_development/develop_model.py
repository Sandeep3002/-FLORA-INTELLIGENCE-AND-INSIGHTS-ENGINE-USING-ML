# develop_model.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

def main():
    # 1. Load the dataset
    print("Loading dataset...")
    try:
        data = pd.read_csv('yield_df.csv', index_col=0)
        print("Dataset loaded successfully!")
        print("\nDataset shape:", data.shape)
        print("\nFirst few rows:")
        print(data.head())
    except FileNotFoundError:
        print("Error: yield_df.csv not found! Please ensure that the file exists in the same directory.")
        return

    # 2. Encode categorical variables
    print("\nEncoding categorical variables...")
    label_encoders = {}
    for column in ['Area', 'Item']:
        le = LabelEncoder()
        data[column] = le.fit_transform(data[column])
        label_encoders[column] = le
    
    # 3. Split features and target
    print("\nSplitting features and target...")
    X = data.drop(['hg/ha_yield'], axis=1)
    y = data['hg/ha_yield']

    # 4. Split into training and testing sets
    print("\nSplitting into train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 5. Train the model
    print("\nTraining the model...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # 6. Make predictions on test set
    print("\nEvaluating model...")
    y_pred = model.predict(X_test)
    
    # 7. Calculate metrics
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Mean Squared Error: {mse:.2f}")
    print(f"R² Score: {r2:.2f}")

    # 8. Save model and encoders
    print("\nSaving model and encoders in the .joblib file...")
    os.makedirs('saved_model', exist_ok=True)
    joblib.dump(model, 'saved_model/yield_model.joblib')
    joblib.dump(label_encoders, 'saved_model/label_encoders.joblib')
    print("Model and encoders saved in 'saved_model' directory")

    # 9. Test a prediction
    print("\nTesting prediction...")
    sample_area = label_encoders['Area'].inverse_transform([0])[0]
    sample_crop = label_encoders['Item'].inverse_transform([0])[0]
    
    test_input = {
        'area': sample_area,
        'crop': sample_crop,
        'year': 2023,
        'rainfall': 1000,
        'pesticides': 500,
        'temp': 25
    }
    
    print("\nTest input:", test_input)
    
    # Encode test input
    area_encoded = label_encoders['Area'].transform([test_input['area']])[0]
    crop_encoded = label_encoders['Item'].transform([test_input['crop']])[0]
    
    test_df = pd.DataFrame(
        [[area_encoded, crop_encoded, test_input['year'], 
          test_input['rainfall'], test_input['pesticides'], test_input['temp']]],
        columns=X.columns
    )
    
    prediction = model.predict(test_df)[0]
    print(f"Predicted yield is tested to be : {prediction:.2f} hectogram/hectare")

if __name__ == "__main__":
    main()