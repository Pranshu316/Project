import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pandas as pd
import numpy as np

# Load the dataset
data = pd.read_csv('heart_failure.csv')
columns_to_drop = ['age', 'ejection_fraction', 'platelets', 'serum_sodium']
data = data.drop(columns_to_drop, axis=1)

# Prepare the data
X = data.drop(['DEATH_EVENT'], axis=1)
y = data['DEATH_EVENT']

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=50)

# Train the model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model to a .pkl file
with open('failure.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

print("Model trained and saved successfully!")

# Predict probabilities on the test set
predictions = model.predict_proba(X_test)[:, 1]  # Probability of DEATH_EVENT = 1

# Convert the probabilities to percentages
predictions_percentage = np.round(predictions * 100, 2)  # Convert to percentages (range from 0 to 100)

# Display predictions as percentages
print("Predictions in percentage:")
print(predictions_percentage)
