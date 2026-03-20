import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProjectForm from '../components/ProjectForm';
import ExperienceForm from '../components/ExperienceForm';
import { Plus, Edit2, Trash2, Globe, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, expRes] = await Promise.all([
        axios.get((import.meta.env.VITE_API_URL || "http://localhost:5000") + '/api/projects'),
        axios.get((import.meta.env.VITE_API_URL || "http://localhost:5000") + '/api/experience')
      ]);
      setProjects(projRes.data);
      setExperiences(expRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/${type}/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleEditProject = (p) => {
    setEditData(p);
    setShowProjectForm(true);
  };

  const handleEditExperience = (e) => {
    setEditData(e);
    setShowExperienceForm(true);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-700 mb-8 overflow-x-auto">
          <button 
            className={`px-8 py-4 font-medium transition whitespace-nowrap ${activeTab === 'projects' ? 'border-b-2 border-accent text-accent' : 'text-slate-400 hover:text-slate-300'}`}
            onClick={() => setActiveTab('projects')}
          >
            Manage Projects
          </button>
          <button 
            className={`px-8 py-4 font-medium transition whitespace-nowrap ${activeTab === 'experience' ? 'border-b-2 border-accent text-accent' : 'text-slate-400 hover:text-slate-300'}`}
            onClick={() => setActiveTab('experience')}
          >
            Manage Experience
          </button>
        </div>

        {activeTab === 'projects' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Projects ({projects.length})</h2>
              <button 
                onClick={() => { setEditData(null); setShowProjectForm(true); }}
                className="flex items-center space-x-2 bg-accent hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium transition shadow-lg shadow-blue-500/20"
              >
                <Plus size={18} /> <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="bg-primary rounded-xl border border-slate-700 overflow-hidden hover:border-slate-500 transition">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover border-b border-slate-700" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-800 text-accent rounded whitespace-nowrap border border-slate-700">{tech}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
                      <div className="flex space-x-3 text-slate-400">
                        {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-white"><Globe size={18} /></a>}
                        {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-white"><Github size={18} /></a>}
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditProject(project)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete('projects', project._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No projects found. Create one to get started.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Experience ({experiences.length})</h2>
              <button 
                onClick={() => { setEditData(null); setShowExperienceForm(true); }}
                className="flex items-center space-x-2 bg-accent hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium transition shadow-lg shadow-blue-500/20"
              >
                <Plus size={18} /> <span>Add Experience</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp._id} className="bg-primary rounded-xl border border-slate-700 p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-slate-500 transition">
                  <div className="w-full">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <p className="text-accent font-medium mt-1">{exp.company}</p>
                      </div>
                      <div className="text-slate-400 text-sm">{exp.duration}</div>
                    </div>
                    {exp.description && (
                      <p className="text-slate-400 text-sm mt-4">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex md:flex-col md:ml-6 mt-4 md:mt-0 space-x-2 md:space-x-0 md:space-y-2 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 justify-end">
                     <button onClick={() => handleEditExperience(exp)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition"><Edit2 size={16} /></button>
                     <button onClick={() => handleDelete('experience', exp._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded transition"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              {experiences.length === 0 && (
                <div className="py-12 text-center text-slate-500">
                  No experience records found. Create one to get started.
                </div>
              )}
            </div>
          </motion.div>
        )}

      </main>

      {showProjectForm && <ProjectForm project={editData} onClose={() => setShowProjectForm(false)} onRefresh={fetchData} />}
      {showExperienceForm && <ExperienceForm experience={editData} onClose={() => setShowExperienceForm(false)} onRefresh={fetchData} />}
    </div>
  );
};

export default Dashboard;
