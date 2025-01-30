import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="utility-page">
      <motion.div
        className="utility-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-300">Message</label>
            <textarea
              rows="4"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
            ></textarea>
          </div>
          <EncryptButton />
        </form>
      </motion.div>
    </div>
  );
};

const TARGET_TEXT = "Send Message";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          if (char === " ") return " ";
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];
          return randomChar;
        })
        .join("");
      setText(scrambled);
      pos++;
      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      type="submit"
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className="group relative overflow-hidden rounded-lg bg-primary hover:bg-primary/80 text-white px-6 py-3 font-mono transition-colors w-full"
    >
      <div className="relative z-10 flex items-center gap-2 justify-center">
        <FiSend />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-primary/0 from-40% via-primary/40 to-primary/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default Contact;