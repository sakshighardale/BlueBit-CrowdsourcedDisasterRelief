import json
import numpy as np
import pandas as pd
import joblib  # Load the trained model

# Load modified test data (without actual_severity)
with open("modified_disaster_test_data.json", "r") as f:
    test_data = json.load(f)

test_df = pd.DataFrame(test_data)

# Ensure feature consistency with training
feature_columns = ["urgency", "affected_population", "donation_amount", "num_ngos", "num_volunteers"]

# Compute actual_severity using the same formula as in model.py
test_df["disaster_severity"] = test_df["urgency"] * 2 + np.log1p(test_df["affected_population"])
test_df["actual_severity"] = pd.qcut(test_df["disaster_severity"], 3, labels=[0, 1, 2])

# Select features and labels
X_test = test_df[feature_columns]
y_test = test_df["actual_severity"]

# Load trained model
model = joblib.load("disaster_model.pkl")  # Ensure the correct filename

# Make predictions
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = (y_pred == y_test).mean() * 100
print(f"✅ Test Accuracy: {accuracy:.2f}%")
