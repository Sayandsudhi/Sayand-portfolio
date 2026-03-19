import express from 'express';
import Experience from '../models/Experience.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all experiences (public)
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create experience (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    const savedExp = await newExp.save();
    res.status(201).json(savedExp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update experience (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete experience (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
