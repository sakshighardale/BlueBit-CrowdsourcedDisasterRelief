import pandas as pd
import numpy as np
import json
import lightgbm as lgb
from sklearn.model_selection import train_test_split
import joblib

# Load the dataset
with open("disaster_data.json", "r") as f:
    data = json.load(f)

# Convert JSON to Pandas DataFrame
df = pd.DataFrame(data)

# Extracting features
df["donation_amount"] = df["resource_availability"].apply(lambda x: x["donation_amount"])
df["num_ngos"] = df["resource_availability"].apply(lambda x: x["num_ngos"])
df["num_volunteers"] = df["resource_availability"].apply(lambda x: x["num_volunteers"])
df.drop(columns=["resource_availability"], inplace=True)

# Define target variable (Disaster Severity)
df["disaster_severity"] = df["urgency"] * 2 + np.log1p(df["affected_population"])

# Convert to categorical severity levels (0: Low, 1: Medium, 2: High)
df["disaster_severity"] = pd.qcut(df["disaster_severity"], 3, labels=[0, 1, 2])

# Splitting dataset
X = df.drop(columns=["disaster_severity"])
y = df["disaster_severity"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define LightGBM Model
model = lgb.LGBMClassifier(
    objective="multiclass",
    num_class=3,  # Because we have 3 severity levels
    boosting_type="gbdt",
    n_estimators=500,
    learning_rate=0.05,
    max_depth=10,
    class_weight="balanced",
    random_state=42
)

# Train model with early stopping
model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    eval_metric="multi_logloss",
    callbacks=[lgb.early_stopping(stopping_rounds=50, verbose=True)]  # ✅ Correct early stopping method
)

# Save trained model
joblib.dump(model, "disaster_model.pkl")
print("✅ Model trained and saved as disaster_model.pkl")

# Feature Importance
feature_importance = pd.Series(model.feature_importances_, index=X.columns)
print("\nFeature Importance:\n", feature_importance.sort_values(ascending=False))
from sklearn.metrics import accuracy_score

# Make predictions
y_pred = model.predict(X_test)

# Compute accuracy
test_accuracy = accuracy_score(y_test, y_pred)
print(f"\n✅ Test Accuracy: {test_accuracy:.4f}")
