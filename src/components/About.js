import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const TARGET_TEXT = "Learn More About Us";
  const CHARS = "!@#$%^&*():{};|,.<>/?";
  const [text, setText] = React.useState(TARGET_TEXT);
  const intervalRef = React.useRef(null);

  const divisions = [
    {
      title: "CP",
      description: "Competitive Programming"
    },
    {
      title: "AI",
      description: "Artificial Intelligence"
    },
    {
      title: "EdITH",
      description: "Educating Information Technology and Hardware"
    },
    {
      title: "PRIT",
      description: "Project, Research & Industrial Talks"
    },
    {
      title: "NETWORKING",
      description: "Managing event communication."
    }
  ];

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / 2 > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");
      setText(scrambled);
      pos++;
      if (pos >= TARGET_TEXT.length * 2) {
        clearInterval(intervalRef.current);
        setText(TARGET_TEXT);
      }
    }, 50);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current);
    setText(TARGET_TEXT);
  };

  return (
    <section id="about" className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 text-white">About Us</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-4xl mx-auto mb-16 text-center">
Welcome to the IIITDM Kancheepuram CS Club — where innovation meets implementation.<br /><br />
We're a dynamic community of tech enthusiasts, problem solvers, and future innovators, united by our passion for computer science and technology.<br />
Our club serves as a catalyst for technical growth, offering a perfect blend of learning, competition, and real-world project experience. From pushing the boundaries of algorithmic challenges to exploring cutting-edge technologies, from developing innovative applications to diving deep into emerging tech domains — we provide the ultimate platform for aspiring technologists.<br />
We're not just about coding; we're about creating possibilities. Through workshops, technical sessions, coding contests, and collaborative projects, we transform curious minds into tech innovators.<br />
Join us in our journey to push the boundaries of what's possible in tech, one line of code at a time. Warning: Side effects may include uncontrollable tech puns and an addiction to solving complex problems.</p>
          <h3 className="text-3xl font-bold mb-12 text-white">Our Wings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {divisions.map((division, index) => (
              <motion.div
                key={index}
                className="glass-card relative overflow-hidden rounded-xl p-6 group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-white">{division.title}</h3>
                  <p className="text-gray-400">{division.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => navigate('/wings')}
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            className="group relative overflow-hidden rounded-lg border border-[#F02050]/20 bg-black/30 px-6 py-3 font-mono font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative z-10 flex items-center gap-2 text-white">
              <span>{text}</span>
            </div>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "-100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
                ease: "linear",
              }}
              className="absolute inset-0 z-0 scale-125 bg-gradient-to-t from-[#F02050]/0 from-40% via-[#F02050]/20 to-[#F02050]/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
            />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(240, 32, 80, 0.1);
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(240, 32, 80, 0.1) 0%,
            rgba(240, 32, 80, 0.05) 15%,
            transparent 50%
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .glass-card:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default About;