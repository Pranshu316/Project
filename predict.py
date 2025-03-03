import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pandas as pd

# Load the dataset
data = pd.read_csv('heart_failure.csv')

# Prepare the data
column = ['age','ejection_fraction','platelets','serum_sodium'] 
X = data.drop(column, axis=1)
y = data['DEATH_EVENT']

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=50)

# Initialize and train the model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model to a file
pickle.dump(log_reg,open('heart_failure_model.pkl','wb'))
model = pickle.load(open('hear_failure_model.pkl','rb'))
