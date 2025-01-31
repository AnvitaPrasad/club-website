import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Events = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [listPosition, setListPosition] = useState(0);
  const carouselRef = useRef(null);
  const listRef = useRef(null);

  const pastEvents = [
    {
      id: "0",
      title: "Mock ICPC Contest",
      eyebrow: "01",
      description: "Simulated the ICPC experience.",
      image: "/eventicpc.jpg"
    },
    {
      id: "1",
      title: "Intro to AI",
      eyebrow: "02",
      description: "Introduced the basics of AI.",
      image: "/eventai.jpg"
    },
    {
      id: "2",
      title: "First CP Contest 2024",
      eyebrow: "03",
      description: "CP contest for second-years.",
      image: "/eventcp.jpg"
    },
    {
      id: "3",
      title: "POTD",
      eyebrow: "04",
      description: "Problem of the day.",
      image: "/eventpotd.jpg"
    }
  ];

  const upcomingEvents = [
    {
      title: "Vashisht",
      date: "March 2025",
      description: "Experience the pinnacle of innovation and creativity at our annual tech fest, Vashisht, featuring workshops, competitions, and showcases.",
      image: "/vashisht.jpg"
    },
    {
      title: "Intro to CP",
      date: "Jan 2025",
      description: "Kickstart your journey into competitive programming with this foundational session designed for beginners.",
      image: "/introcp.jpg"
    }
  ];

  const handleMouseMove = (event) => {
    if (!carouselRef.current || !listRef.current) return;
    
    const carouselRect = carouselRef.current.getBoundingClientRect();
    const listHeight = listRef.current.clientHeight;
    const carouselHeight = carouselRect.height;
    
    const relativeY = event.clientY - carouselRect.top;
    const normalizedY = relativeY / carouselHeight;
    const offset = -(normalizedY * (listHeight - carouselHeight));
    
    setListPosition(offset);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section id="events" className="relative bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-16 text-white">Events of the Academic Year</h2>
          
          <div className="mb-24">
            <h3 className="text-2xl mb-8 text-white no-underline">Past Events</h3>
            <div 
              ref={carouselRef}
              onMouseMove={handleMouseMove}
              className="relative h-[600px] w-full max-w-4xl mx-auto overflow-hidden rounded-lg"
            >
              <motion.ul 
                ref={listRef}
                className="absolute left-0 w-2/3 z-10 pl-8"
                animate={{ y: listPosition }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              >
                {pastEvents.map((event, index) => (
                  <motion.li 
                    key={event.id}
                    className="relative group"
                    onClick={() => handleClick(index)} // Handle click for mobile
                    onMouseEnter={() => setActiveIndex(index)} // Handle hover for desktop
                    animate={{
                      opacity: index === activeIndex ? 1 : 0.5,
                      x: index === activeIndex ? 20 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="block py-6 group-hover:cursor-crosshair no-underline">
                      <p className="relative pb-3 text-sm tracking-widest text-left">
                        <span className="absolute -left-8 top-0.5 text-white opacity-50">
                          {event.eyebrow}
                        </span>
                      </p>
                      <h4 className="text-3xl font-bold tracking-wider text-left text-white no-underline">
                        {event.title}
                      </h4>
                      <p className="text-white/70 mt-2 text-left group-hover:text-white transition-colors duration-300">
                        {event.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="absolute inset-0 z-0">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      scale: index === activeIndex ? 1 : 1.05
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-black/70" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-32">
            <h3 className="text-2xl mb-12 text-white">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-black/60 backdrop-blur-sm p-6 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F02050]/5 to-[#F02050]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-48 object-cover rounded mb-4" 
                  />
                  <h4 className="text-xl font-bold mb-2 text-white relative z-10">{event.title}</h4>
                  <p className="text-white mb-2 relative z-10">{event.date}</p>
                  <p className="text-white/70 relative z-10">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
