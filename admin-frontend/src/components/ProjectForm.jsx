import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';

const ProjectForm = ({ project, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    link: project?.link || '',
    github: project?.github || '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'technologies') {
          // Convert comma separated string to array string
          const techsArray = formData[key].split(',').map(t => t.trim()).filter(t => t);
          data.append('technologies', JSON.stringify(techsArray));
        } else {
          data.append(key, formData[key]);
        }
      });
      
      if (image) {
        data.append('image', image);
      }

      const url = project ? `http://localhost:5000/api/projects/${project._id}` : 'http://localhost:5000/api/projects';
      const method = project ? 'put' : 'post';

      await axios[method](url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-primary rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">{project ? 'Edit Project' : 'Add New Project'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Technologies (comma separated)</label>
            <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Live Link</label>
              <input type="url" name="link" value={formData.link} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">GitHub Link</label>
              <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Project Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-lg hover:border-accent transition">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-400 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-accent hover:text-blue-400 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  </label>
                </div>
                {image && <p className="text-xs text-green-400">{image.name}</p>}
                {!image && project?.imageUrl && <p className="text-xs text-slate-400">Current image keeps if none selected.</p>}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-accent hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
