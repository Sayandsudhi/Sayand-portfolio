import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Seed Admin User (only for initial setup)
router.post('/seed', async (req, res) => {
  try {
    const exists = await User.findOne({ email: 'sayand@gmail.com' });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('sayand@shalu', salt);

    const newAdmin = new User({ email: 'sayand@gmail.com', password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
