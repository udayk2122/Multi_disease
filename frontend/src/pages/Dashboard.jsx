import { useState } from 'react';
import { LogOut, Heart, Droplets, Activity } from 'lucide-react';
import DiseaseForm from '../components/DiseaseForm';

const Dashboard = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('diabetes');

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Configuration for each disease (Field names must match backend expectation order if simplified, 
  // or we map them carefully. Here we use raw inputs for MVP).
 const configurations = {
    diabetes: {
      title: "Diabetes Checkup",
      endpoint: "diabetes",
      icon: <Droplets />,
      color: "blue",
      // Friendly Names:
      fields: [
        { name: "Number of Pregnancies", placeholder: "e.g., 2" },
        { name: "Glucose Level (mg/dL)", placeholder: "e.g., 120" },
        { name: "Blood Pressure (mm Hg)", placeholder: "e.g., 70" },
        { name: "Skin Thickness (mm)", placeholder: "e.g., 20" },
        { name: "Insulin Level (mu U/ml)", placeholder: "e.g., 79" },
        { name: "BMI (Body Mass Index)", placeholder: "e.g., 25.0" },
        { name: "Diabetes Pedigree (Family History)", placeholder: "e.g., 0.5 (0.0 - 2.5)" },
        { name: "Age (Years)", placeholder: "e.g., 35" }
      ]
    },
    heart: {
      title: "Heart Health Check",
      endpoint: "heart",
      icon: <Heart />,
      color: "rose",
      // Friendly Names:
      fields: [
        { name: "Age (Years)", placeholder: "e.g., 45" },
        { name: "Gender (1 = Male, 0 = Female)", placeholder: "1 or 0" },
        { name: "Chest Pain Type (0-3)", placeholder: "0=Typical, 1=Atypical, 2=Non-anginal, 3=Asymptomatic" },
        { name: "Resting Blood Pressure", placeholder: "e.g., 130" },
        { name: "Cholesterol (mg/dL)", placeholder: "e.g., 200" },
        { name: "Fasting Blood Sugar > 120? (1=Yes, 0=No)", placeholder: "1 or 0" },
        { name: "Resting ECG Results (0-2)", placeholder: "0=Normal, 1=ST-T wave abn, 2=Left vent hypertrophy" },
        { name: "Max Heart Rate Achieved", placeholder: "e.g., 150" },
        { name: "Exercise Induced Angina? (1=Yes, 0=No)", placeholder: "1 or 0" },
        { name: "ST Depression (Oldpeak)", placeholder: "e.g., 1.5" },
        { name: "Slope of Peak Exercise (0-2)", placeholder: "0=Upsloping, 1=Flat, 2=Downsloping" },
        { name: "Major Vessels Colored (0-3)", placeholder: "0 to 3" },
        { name: "Thalassemia (1=Normal, 2=Fixed, 3=Rev)", placeholder: "1, 2, or 3" }
      ]
    },
    kidney: {
      title: "Kidney Function Test",
      endpoint: "kidney",
      icon: <Activity />,
      color: "emerald",
      // Friendly Names (Full 24 Columns):
      fields: [
        { name: "Age (Years)", placeholder: "e.g., 60" },
        { name: "Blood Pressure (mm/Hg)", placeholder: "e.g., 80" },
        { name: "Specific Gravity", placeholder: "e.g., 1.020" },
        { name: "Albumin (0-5)", placeholder: "0 to 5" },
        { name: "Sugar (0-5)", placeholder: "0 to 5" },
        { name: "Red Blood Cells (1=Normal, 0=Abnormal)", placeholder: "1 or 0" },
        { name: "Pus Cell (1=Normal, 0=Abnormal)", placeholder: "1 or 0" },
        { name: "Pus Cell Clumps (1=Present, 0=Not)", placeholder: "1 or 0" },
        { name: "Bacteria (1=Present, 0=Not)", placeholder: "1 or 0" },
        { name: "Random Blood Glucose (mgs/dl)", placeholder: "e.g., 121" },
        { name: "Blood Urea (mgs/dl)", placeholder: "e.g., 36" },
        { name: "Serum Creatinine (mgs/dl)", placeholder: "e.g., 1.2" },
        { name: "Sodium (mEq/L)", placeholder: "e.g., 135" },
        { name: "Potassium (mEq/L)", placeholder: "e.g., 4.5" },
        { name: "Hemoglobin (gms)", placeholder: "e.g., 15.4" },
        { name: "Packed Cell Volume", placeholder: "e.g., 44" },
        { name: "White Blood Cell Count", placeholder: "e.g., 7800" },
        { name: "Red Blood Cell Count", placeholder: "e.g., 5.2" },
        { name: "Hypertension? (1=Yes, 0=No)", placeholder: "1 or 0" },
        { name: "Diabetes Mellitus? (1=Yes, 0=No)", placeholder: "1 or 0" },
        { name: "Coronary Artery Disease? (1=Yes, 0=No)", placeholder: "1 or 0" },
        { name: "Appetite (1=Good, 0=Poor)", placeholder: "1 or 0" },
        { name: "Pedal Edema? (1=Yes, 0=No)", placeholder: "1 or 0" },
        { name: "Anemia? (1=Yes, 0=No)", placeholder: "1 or 0" }
      ]
    }
  };
  const currentConfig = configurations[activeTab];

  // ... keep your existing imports (useState, icons, etc.)
// ... inside the return statement:

return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      {/* ... keep Navbar if it was there or rely on App.jsx ... */}

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Health Dashboard</h1>
          <p className="text-slate-900">Select a prediction model to begin analysis.</p>
        </div>

        {/* Tab Navigation (Glass Style) */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {Object.keys(configurations).map((key) => {
            const config = configurations[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-300 font-bold shadow-lg
                  ${isActive 
                    ? `bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-white scale-105 shadow-${config.color}-500/40` 
                    : 'bg-white/80 text-slate-600 hover:bg-white hover:scale-105'}`}
              >
                {config.icon}
                <span className="capitalize">{key}</span>
              </button>
            );
          })}
        </div>

        {/* Main Form Container (Glass Card) */}
        <div className="glass-card p-8 md:p-12 rounded-3xl max-w-4xl mx-auto border border-white/60">
           {/* The 'key' attribute forces React to reset the form when the tab changes */}
        <DiseaseForm key={activeTab} config={currentConfig} />
        </div>
      </div>
    </div>
);
};

export default Dashboard;