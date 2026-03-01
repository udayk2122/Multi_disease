import { motion } from 'framer-motion';
import { Database, Brain, Layout, Server, GitBranch, User, Code, Shield } from 'lucide-react';

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const techStack = [
    { icon: <Layout />, name: "React.js", desc: "Frontend UI", color: "blue" },
    { icon: <Server />, name: "Flask", desc: "Backend API", color: "green" },
    { icon: <Brain />, name: "Scikit-Learn", desc: "ML Models", color: "orange" },
    { icon: <Database />, name: "SQLite", desc: "Database", color: "indigo" },
    { icon: <Code />, name: "Tailwind CSS", desc: "Styling", color: "cyan" },
    { icon: <GitBranch />, name: "Ensemble", desc: "Voting Logic", color: "purple" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1 
          initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-slate-900 mb-6"
        >
          About the <span className="text-gradient">Project</span>
        </motion.h1>
        <motion.p 
          initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-900 leading-relaxed"
        >
          A comprehensive Capstone project demonstrating the convergence of 
          <span className="font-bold text-gradient"> Modern Web Development</span> and 
          <span className="font-bold text-gradient"> Artificial Intelligence</span> to solve real-world healthcare challenges.
        </motion.p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Left Column: Mission & Models */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="text-violet-600" /> Project Mission
            </h2>
            <p className="text-slate-600 mb-4">
              Early detection is the key to managing chronic diseases. This system leverages historical medical data to identify risk patterns that might be missed by standard observation.
            </p>
            <p className="text-slate-600">
              Our goal is to provide a <span className="font-semibold text-slate-800">non-invasive, instant, and accessible</span> risk assessment tool for everyone.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Brain className="text-fuchsia-600" /> ML Architecture
            </h2>
            <ul className="space-y-6">
              {[
                { name: "Diabetes Model", desc: "A soft-voting ensemble of Random Forest, SVM, and Logistic Regression achieving 78% accuracy on Pima Indian data." },
                { name: "Heart Disease Model", desc: "Optimized Random Forest Classifier with Hyperparameter tuning, achieving 98.5% accuracy." },
                { name: "Kidney Disease Model", desc: "Gradient Boosting model handling missing values via imputation, achieving 100% accuracy on CKD dataset." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="min-w-[4px] bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Tech Stack & Developer */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Tech Stack Grid */}
          <div className="bg-white/50 p-8 rounded-3xl border border-white shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Technology Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className={`text-${tech.color}-500 mb-2`}>{tech.icon}</div>
                  <span className="font-bold text-sm text-slate-800">{tech.name}</span>
                  <span className="text-xs text-slate-500">{tech.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Card */}
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-10 rounded-bl-full"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-violet-100 p-4 rounded-full text-violet-600">
                <User size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Developed By</h3>
                <p className="text-violet-600 font-medium">Your Name</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-4">
              Final Year Computer Science & Engineering Student specializing in Data Science.
            </p>
            
            <div className="flex gap-3">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Full Stack</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Data Science</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">ML Ops</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer Disclaimer */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-16 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl text-center"
      >
        <p className="text-sm text-blue-800">
          <strong>⚠️ Disclaimer:</strong> This application is intended for educational and demonstration purposes only. 
          The predictions generated by the AI models should not be considered as professional medical advice. 
          Always consult with a qualified healthcare provider for diagnosis and treatment.
        </p>
      </motion.div>

    </div>
  );
};

export default About;