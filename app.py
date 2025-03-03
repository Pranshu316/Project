from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pickle
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# MongoDB configuration
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client['jovac']
collection = db['failure']  # Adjusted to 'failure' collection

# Load the trained model from the new file 'failure.pkl'
with open('failure.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit_data():
    try:
        # Get data from request
        data = request.json

        # Validate that required fields are present in the data
        required_fields = [
            'anaemia', 'creatininePhosphokinase', 'diabetes', 'highBloodPressure',
            'serumCreatinine', 'sex', 'smoking', 'time'
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Convert input data to numeric, selecting only the required fields
        try:
            features = np.array([[
                float(data['anaemia']),
                float(data['creatininePhosphokinase']),
                float(data['diabetes']),
                float(data['highBloodPressure']),
                float(data['serumCreatinine']),
                float(data['sex']),
                float(data['smoking']),
                float(data['time'])
            ]])
        except ValueError:
            return jsonify({'error': 'Invalid input data. Ensure all fields are numeric.'}), 400

        # Get the prediction probabilities from the model
        probabilities = model.predict_proba(features)[0]  # [P(Class 0), P(Class 1)]

        # Extract the probability for the positive class (heart failure)
        heart_failure_probability = probabilities[1] * 100  # Convert to percentage

        # Get the raw prediction (0 or 1)
        prediction = model.predict(features)[0]  # 0 or 1

        # Log the probabilities for debugging (optional)
        print(f"Heart failure probability: {heart_failure_probability:.2f}%")
        print(f"Raw prediction: {prediction}")

        # Store the data in MongoDB (optional)
        data_to_store = {
            'anaemia': data['anaemia'],
            'creatininePhosphokinase': data['creatininePhosphokinase'],
            'diabetes': data['diabetes'],
            'highBloodPressure': data['highBloodPressure'],
            'serumCreatinine': data['serumCreatinine'],
            'sex': data['sex'],
            'smoking': data['smoking'],
            'time': data['time'],
            'prediction': int(prediction),
            'heart_failure_probability': f"{heart_failure_probability:.2f}%",
            'raw_probability': f"{probabilities[1]:.4f}"
        }

        # Insert the data into MongoDB
        collection.insert_one(data_to_store)

        # Return only the prediction and probability (no message)
        return jsonify({
            'heart_failure_probability': f"{heart_failure_probability:.2f}%",
            'raw_probability': f"{probabilities[1]:.4f}"
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
