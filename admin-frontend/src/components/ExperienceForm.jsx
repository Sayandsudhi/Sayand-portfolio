import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ExperienceForm = ({ experience, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    company: experience?.company || '',
    role: experience?.role || '',
    duration: experience?.duration || '',
    description: experience?.description || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = experience ? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/experience/${experience._id}` : (import.meta.env.VITE_API_URL || "http://localhost:5000") + '/api/experience';
      const method = experience ? 'put' : 'post';

      await axios[method](url, formData);

      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-primary rounded-xl shadow-2xl w-full max-w-2xl border border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">{experience ? 'Edit Experience' : 'Add New Experience'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Company</label>
            <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Role / Job Title</label>
            <input type="text" name="role" required value={formData.role} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Duration (e.g. Jan 2022 - Present)</label>
            <input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-accent hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
