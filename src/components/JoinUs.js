import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import TRUNK from 'vanta/dist/vanta.trunk.min';

const JoinUs = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const calculateTimeLeft = () => {
    const recruitmentDate = new Date('2025-08-01');
    const now = new Date();
    const difference = recruitmentDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        TRUNK({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xf02050,
          backgroundColor: 0x000000,
          spacing: 1.00,
          chaos: 5.50
        })
      );
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      ref={vantaRef} 
      id="join" 
      className="page-container relative min-h-screen bg-black"
      style={{ 
        marginTop: '0',
        minHeight: '100vh'  // Ensure full viewport height
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 text-white">
            Join Us
          </h2>
          
          <motion.p 
            className="text-xl mb-16 max-w-3xl mx-auto text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            We're looking for passionate individuals to join our community. 
            Our next recruitment drive begins in August 2025!
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <motion.div
                key={unit}
                className="enhanced-card group relative overflow-hidden bg-black/30 p-4 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseMove={handleCardMouseMove}
              >
                <div className="card-spotlight" />
                <motion.div className="relative">
                  <motion.div 
                    className="text-4xl font-bold mb-2 text-white"
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: { duration: 1, repeat: Infinity }
                    }}
                  >
                    {value}
                  </motion.div>
                  <div className="text-[#F02050] capitalize font-medium">{unit}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .card-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(240, 32, 80, 0.1),
            transparent 40%
          );
        }

        .enhanced-card:hover .card-spotlight {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default JoinUs;