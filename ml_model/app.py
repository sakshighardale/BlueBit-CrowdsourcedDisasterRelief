from flask import Flask, request, jsonify
import joblib
import numpy as np

# Load trained model
model = joblib.load("disaster_model.pkl")

# Initialize Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array([
            data["urgency"],
            data["affected_population"],
            data["donation_amount"],
            data["num_ngos"],
            data["num_volunteers"]
        ]).reshape(1, -1)

        # Make prediction
        prediction = model.predict(features)[0]

        return jsonify({"disaster_severity": int(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)
