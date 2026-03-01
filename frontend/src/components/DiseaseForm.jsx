import { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DiseaseForm = ({ config }) => {
  // Initialize state with object keys based on config fields
  const initialState = config.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
  
  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Convert object values to array of numbers for the backend
    const features = Object.values(formData).map(val => Number(val));

    try {
      const res = await axios.post(`http://127.0.0.1:5000/predict_${config.endpoint}`, { features });
      setResult(res.data.prediction); // 1 = High Risk, 0 = Healthy
    } catch (err) {
      console.error(err);
      alert("Prediction Failed. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

 return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-2xl font-bold mb-6 text-${config.color}-600 flex items-center gap-2`}>
        {config.title}
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {config.fields.map((field, index) => (
          <motion.div 
            key={field.name} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col group"
          >
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider group-focus-within:text-blue-600 transition-colors">
              {field.name}
            </label>
            <input
              type="number"
              step="any"
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-sm"
              required
            />
          </motion.div>
        ))}
        
        <div className="col-span-full mt-6">
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-black bg-blue-200 text-lg transition-all transform active:scale-95
              ${loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : `bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 hover:shadow-lg hover:shadow-${config.color}-500/30`}`}
          >
            {loading ? 'Analyzing Vitals...' : 'Predict Now'}
          </button>
        </div>
      </form>

      {/* Result Animation */}
      {result !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 p-8 rounded-2xl text-center border-2 shadow-lg
            ${result === 1 ? 'bg-red-50 border-red-100 text-red-700' : 'bg-green-50 border-green-100 text-green-700'}`}
        >
          {/* ... (keep existing result icon/text code) ... */}
          {result === 1 ? <AlertCircle size={64} className="mx-auto mb-4" /> : <CheckCircle size={64} className="mx-auto mb-4" />}
          <h3 className="text-3xl font-bold">
            {result === 1 ? "High Risk Detected" : "Low Risk Detected"}
          </h3>
          <p className="mt-2 text-lg opacity-80">
            {result === 1 ? "The model suggests a high probability. Please consult a doctor." : "Your vitals look healthy based on our model."}
          </p>
        </motion.div>
      )}
    </motion.div>
);
};

export default DiseaseForm;