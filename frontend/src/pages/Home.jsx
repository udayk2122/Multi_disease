import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, ArrowRight, HeartPulse } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen pt-40 pb-12 px-6">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center mb-24">
        
        {/* Left Side: Main Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-violet-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
            </span>
            AI-Powered Health Analysis
          </div>
          
          <h1 className="text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Your Health, <br />
            <span className="text-gradient">Decoded by AI.</span>
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Advanced machine learning algorithms that predict Diabetes, Heart Disease, and Kidney issues with high accuracy. 
            Simple, fast, and reliable.
          </p>
          
          <div className="flex gap-4">
            <Link to="/register" className="btn-primary flex items-center gap-2">
              Start Checkup <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="px-6 py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-600 hover:border-violet-600 hover:text-violet-600 transition-all bg-white/50 backdrop-blur-sm">
              How it Works
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Image with Slogan Overlay */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
          
          {/* Main Image Container */}
          <div className="relative z-10 rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
              alt="Family Health" 
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Slogan Overlay (Gradient Fade) */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90"></div>
            
            {/* Slogan Text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h3 className="text-violet-600 font-bold tracking-widest text-sm uppercase mb-1">
                Predict. Prevent. Empower.
              </h3>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Your Health, Our AI.
              </h2>
            </div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -top-6 -right-6 glass p-4 rounded-xl flex items-center gap-4 z-20 animate-bounce-slow">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase">Accuracy</p>
              <p className="font-bold text-slate-800">98.5% Verified</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose HealthGuard?</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Zap className="text-yellow-500"/>, 
              title: "Instant Prediction", 
              desc: "Get real-time results powered by optimized Random Forest & Gradient Boosting models.",
              color: "yellow" 
            },
            { 
              icon: <HeartPulse className="text-rose-500"/>, 
              title: "Multi-Disease Support", 
              desc: "One unified portal to check Diabetes, Heart, and Kidney health markers.",
              color: "rose"
            },
            { 
              icon: <ShieldCheck className="text-emerald-500"/>, 
              title: "Secure & Private", 
              desc: "Your health data is processed locally in the session and never shared with third parties.",
              color: "emerald"
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 p-16 bg-${feature.color}-500/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150`}></div>
              
              <div className={`bg-${feature.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;