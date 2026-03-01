import os
import pickle
import numpy as np
import warnings
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Filter warnings
warnings.filterwarnings("ignore", category=UserWarning)

app = Flask(__name__)
CORS(app)

# Database Setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, 'users.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Load Models
def load_model(filename):
    path = os.path.join(BASE_DIR, 'models', filename)
    try:
        with open(path, 'rb') as f:
            return pickle.load(f)
    except Exception as e:
        print(f"ERROR loading {filename}: {e}")
        return None

print("--- Loading Models ---")
diabetes_model = load_model('diabetes_model.pkl')
heart_model = load_model('heart_model.pkl')
kidney_model = load_model('kidney_model.pkl')
print("--- Models Loaded ---")

# --- AUTH ROUTES ---
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({"message": "User exists"}), 409
    db.session.add(User(username=data.get('username'), password=data.get('password')))
    db.session.commit()
    return jsonify({"message": "Success"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data.get('username'), password=data.get('password')).first()
    if user:
        return jsonify({"username": user.username}), 200
    return jsonify({"message": "Invalid"}), 401

# --- PREDICTION ROUTES (DEBUG MODE) ---

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json['features']
        print(f"Diabetes Input: {data}") # DEBUG PRINT
        features = [np.array(data)]
        prediction = diabetes_model.predict(features)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        print(f"❌ DIABETES ERROR: {str(e)}") # PRINT ERROR TO TERMINAL
        return jsonify({'error': str(e)}), 500

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    try:
        data = request.json['features']
        print(f"Heart Input: {data}") # DEBUG PRINT
        features = [np.array(data)]
        prediction = heart_model.predict(features)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        print(f"❌ HEART ERROR: {str(e)}") # PRINT ERROR TO TERMINAL
        return jsonify({'error': str(e)}), 500

@app.route('/predict_kidney', methods=['POST'])
def predict_kidney():
    try:
        data = request.json['features']
        print(f"Kidney Input: {data}") # DEBUG PRINT
        features = [np.array(data)]
        prediction = kidney_model.predict(features)
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        print(f"❌ KIDNEY ERROR: {str(e)}") # PRINT ERROR TO TERMINAL
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)