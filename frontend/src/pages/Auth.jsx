import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => { setIsLogin(location.pathname === '/login'); }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/login' : '/register';
    
    try {
      const res = await axios.post(`http://127.0.0.1:5000${endpoint}`, formData);
      if (isLogin) {
        localStorage.setItem('user', res.data.username);
        setUser(res.data.username);
        navigate('/dashboard');
      } else {
        alert("Registration Successful! Please Login.");
        setIsLogin(true);
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl glass rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side (Visual) */}
        <div className="lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Welcome to the Future of Health.</h2>
            <ul className="space-y-4">
              {['AI-Driven Predictions', 'Secure Data Handling', 'Instant Results'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-violet-100 font-medium">
                  <CheckCircle2 className="text-fuchsia-300" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-10">
            <p className="text-sm text-violet-200">© 2025 HealthGuard AI Project.</p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="lg:w-1/2 p-12 flex items-center justify-center bg-white/60">
          <motion.div 
            key={isLogin ? 'login' : 'register'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{isLogin ? 'Sign In' : 'Join Us'}</h2>
            <p className="text-slate-500 mb-8">Enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                autoComplete="username"
                placeholder="Username"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password" 
                className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition shadow-sm"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              
              {error && <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{error}</div>}

              <button className="btn-primary w-full shadow-xl shadow-violet-500/20">
                {isLogin ? 'Login to Dashboard' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                {isLogin ? "New here? " : "Already have an account? "}
                <button 
                  onClick={() => { setIsLogin(!isLogin); navigate(isLogin ? '/register' : '/login'); }}
                  className="text-violet-700 font-bold hover:underline"
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;