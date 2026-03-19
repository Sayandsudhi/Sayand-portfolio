import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="bg-transparent text-white min-h-screen font-sans selection:bg-neon selection:text-black">
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onFinish={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <div className="relative z-0">
            <Navbar />
            <AnimatedRoutes />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
