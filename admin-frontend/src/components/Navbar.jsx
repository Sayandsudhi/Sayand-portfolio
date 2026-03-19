import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary border-b border-slate-700 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <LayoutDashboard className="text-accent h-6 w-6" />
        <h1 className="text-xl font-bold font-sans tracking-wide text-white">Portfolio Admin</h1>
      </div>
      
      {user && (
        <div className="flex items-center space-x-6">
          <span className="text-slate-400 text-sm hidden md:block">Logged in as {user.email}</span>
          <button 
            onClick={logout}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition border border-slate-600"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
