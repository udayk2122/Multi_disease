import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 top-4 px-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">
            Health<span className="text-violet-600">Guard</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-violet-600 transition">Home</Link>
          <Link to="/about" className="hover:text-violet-600 transition">About</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-violet-600 font-semibold hover:underline">Dashboard</Link>
              <div className="flex items-center gap-2 bg-violet-50 px-4 py-2 rounded-full border border-violet-100">
                <User size={18} className="text-violet-500"/>
                <span className="text-sm text-violet-700 font-bold capitalize">{user}</span>
              </div>
              <button onClick={handleLogout} className="bg-red-50 p-2 rounded-full text-red-500 hover:bg-red-100 transition">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 hover:text-violet-600 font-semibold">Login</Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu (Simple) */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 glass rounded-xl p-4 flex flex-col gap-4 md:hidden animate-fade-in-down">
          <Link to="/" className="text-slate-700 font-medium">Home</Link>
          <Link to="/about" className="text-slate-700 font-medium">About</Link>
          {!user && <Link to="/login" className="text-slate-700 font-medium">Login</Link>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;