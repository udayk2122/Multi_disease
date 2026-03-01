import { Github, Twitter, Linkedin, Heart, Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <Activity className="text-blue-500" /> HealthGuard AI
          </h3>
          <p className="text-slate-400 max-w-sm">
            Advanced multi-disease prediction system powered by Machine Learning. 
            Helping you monitor your health risks with precision and ease.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition">About Project</a></li>
            <li><a href="/dashboard" className="hover:text-blue-400 transition">Prediction Engine</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition"><Github size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Your name
        </p>
      </div>
    </footer>
  );
};

export default Footer;