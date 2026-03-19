import express from 'express';
import Project from '../models/Project.js';
import { verifyToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create project (protected)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, link, github } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const techs = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;

    const newProject = new Project({
      title,
      description,
      technologies: techs,
      link,
      github,
      imageUrl
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update project (protected)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, technologies, link, github } = req.body;
    const updateData = { title, description, link, github };
    
    if (technologies) {
      updateData.technologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    }

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete project (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
