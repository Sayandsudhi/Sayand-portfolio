import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  technologies: [{ type: String }],
  link: { type: String },
  github: { type: String },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
