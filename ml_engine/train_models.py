import pandas as pd
import pickle
import os
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# --- PATH FIX ---
# Get the folder where this script lives (ml_engine)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Go UP one level (..) to find the 'datasets' folder
DATA_PATH = os.path.join(BASE_DIR, '..', 'datasets')

# Go UP one level (..) to find the 'backend/models' folder
MODEL_PATH = os.path.join(BASE_DIR, '..', 'backend', 'models')

print(f"Looking for data in: {os.path.abspath(DATA_PATH)}")

def fix_heart():
    csv_path = os.path.join(DATA_PATH, 'heart.csv')
    
    if not os.path.exists(csv_path):
        print(f"❌ ERROR: Still cannot find heart.csv at {csv_path}")
        print("Please check if the file is named 'heart.csv' or 'heart.csv.csv'")
        return

    print("--- Re-Training Heart Model Cleanly ---")
    df = pd.read_csv(csv_path)

    # 1. CLEANUP: Drop 'Unnamed' or 'ID' columns that cause shape mismatches
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    # 2. Define Features and Target
    # Check for common target names
    if 'target' in df.columns:
        y = df['target']
        X = df.drop(columns=['target'])
    elif 'output' in df.columns:
        y = df['output']
        X = df.drop(columns=['output'])
    else:
        print("❌ Error: Could not find 'target' or 'output' column in CSV")
        return

    print(f"Training with {X.shape[1]} features: {list(X.columns)}")

    # 3. Train Pipeline
    model = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
    ])

    model.fit(X, y)

    # 4. Save
    save_file = os.path.join(MODEL_PATH, 'heart_model.pkl')
    with open(save_file, 'wb') as f:
        pickle.dump(model, f)

    print(f"✅ SUCCESS: Heart model re-saved to {save_file}")
    print("👉 Now RESTART your 'python app.py' server to load the new model.")

if __name__ == "__main__":
    fix_heart()