import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Location from './pages/Location';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Teams from './pages/Teams';
import WingsDetails from './components/WingsDetails';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <About />
              <Events />
              <JoinUs />
            </main>
          } />
          <Route path="/team" element={<Teams />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/wings" element={<WingsDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;