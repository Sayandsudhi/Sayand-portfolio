const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'portfolio-frontend/src/components/Projects.jsx',
  'portfolio-frontend/src/components/Experience.jsx',
  'portfolio-frontend/src/pages/ProjectDetail.jsx',
  'admin-frontend/src/components/ExperienceForm.jsx',
  'admin-frontend/src/components/ProjectForm.jsx',
  'admin-frontend/src/context/AuthContext.jsx',
  'admin-frontend/src/pages/Dashboard.jsx',
];

const basePath = 'd:\\SAYAND portfolio';

filesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace standard quotes
    content = content.replace(/'http:\/\/localhost:5000/g, '(import.meta.env.VITE_API_URL || "http://localhost:5000") + \'');
    // Replace backticks (template strings)
    // We want `http://localhost:5000/api/${type}/${id}` to become `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/${type}/${id}`
    content = content.replace(/`http:\/\/localhost:5000/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
