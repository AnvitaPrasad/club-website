import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Carousel } from "@material-tailwind/react";
import { delay } from 'framer-motion';


const WingsDetails = () => {
  const mountRef = useRef(null);
  const backgroundRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeWing, setActiveWing] = useState(0);

  useEffect(() => {
    // Three.js background setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Background and fog
    const setcolor = 0xF02050;
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);
    camera.position.set(0, 2, 14);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Make renderer fill the screen
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';

    backgroundRef.current = renderer.domElement;
    mountRef.current.appendChild(backgroundRef.current);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // City setup
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();

    // Building creation function
    const init = () => {
      const segments = 2;
      for (let i = 1; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1, segments, segments, segments);
        const material = new THREE.MeshStandardMaterial({
          color: 0x000000,
          wireframe: false,
          side: THREE.DoubleSide
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.scale.y = 0.1 + Math.abs(Math.random() * 8);
        const cubeWidth = 0.9;
        cube.scale.x = cube.scale.z = cubeWidth + Math.random() * (1 - cubeWidth);
        cube.position.x = Math.round(Math.random() * 8 - 4);
        cube.position.z = Math.round(Math.random() * 8 - 4);
        town.add(cube);
      }
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
    const lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    scene.add(ambientLight);
    scene.add(lightFront);
    scene.add(city);
    city.add(smoke);
    city.add(town);
    init();

    // Mouse movement handling
    let mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);



    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      city.rotation.y -= ((mouse.x * 8) - city.rotation.y) * 0.001;
      city.rotation.x -= (-(mouse.y * 2) - city.rotation.x) * 0.001;
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 1;
      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;
      camera.lookAt(city.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(backgroundRef.current);
      renderer.dispose();
    };
  }, []);

  // Rest of your existing wings data and component logic
  const wings = {
    cp: {
      title: "Competitive Programming",
      description: "Our CP wing is dedicated to enhancing algorithmic problem-solving and competitive programming skills. We host regular contests and interactive sessions, providing valuable resources and guidance to help members excel in competitive programming. Additionally, we foster a collaborative environment for skill development and knowledge sharing, empowering members to refine their techniques and strategies for tackling complex challenges.",
      events: [
        {
          image: "/cpicpc.jpg"
        },
        {
          image: "/cppotd2.jpg"
        },
        {
          image: "/cpgraph.jpg"
        },
        {
          image: "/cpcontest24.jpg"
        },
        {
          image: "/cppotd1.jpg"
        },
        {
          image: "/cpcodeastra.jpg"
        },
        {
          image: "/cpstarters57.jpg"
        },
        {
          image: "/cpcontest2022.jpg"
        }
      ]
    },
    edith: {
      title: "EDITH",
      description: "Our EDITH wing focuses on educating members about Information Technology and Hardware, bridging the gap between theory and practice. We conduct workshops, hands-on sessions, and expert talks, helping members explore the latest trends in IT and hardware. By fostering an interactive learning environment, we encourage experimentation with technologies, troubleshooting, and real-world problem-solving, equipping members for success in the tech industry.",
      events: [
        {
          image: "/edithhacking.jpg"
        },
        {
          image: "/edithweb.jpg"
        },
        {
          image: "/edithlinux.jpg"
        },
        {
          image: "/edithwebgl.jpg"
        }
      ]
    },
    ai: {
      title: "Artificial Intelligence",
      description: "The AI wing delves into cutting-edge developments in machine learning, deep learning, and artificial intelligence. We engage in research projects and hands-on applications, providing members with opportunities to explore the latest advancements in AI. Through workshops, collaborative projects, and expert sessions, we foster a deeper understanding of AI technologies and their real-world impact. This wing aims to equip members with the skills to innovate and contribute to the rapidly growing field of artificial intelligence.",
      events: [
        {
          image: "/aiintro.jpg"
        }
      ]
    },
    prit: {
      title: "PRIT",
      description: "PRIT (Project, Research & Industrial Talks) is the wing of the CS Club dedicated to bridging the gap between academic learning and industry practices. We focus on driving hands-on projects, fostering research initiatives, and organizing talks by industry professionals to provide students with a comprehensive understanding of real-world applications. Our goal is to ensure that students are not only equipped with textbook knowledge but also prepared for the challenges they’ll face in the industry. We create a dynamic learning environment where fun, enthusiasm, and practical experience go hand in hand.",
      events: [
        {
          image: "/prithack.jpg"
        }
      ]
    },
    Networking: {
      title: "Networking",
      description: "The Networking team is the creative hub responsible for spreading the word about our events and initiatives. They design eye-catching posters, manage social media posts, and create offline displays to keep the campus informed. By sharing event details on Instagram, sending out emails, and ensuring widespread publicity, the team plays a key role in engaging students and maximizing participation. Their efforts help create visibility and excitement, ensuring that every event reaches its intended audience and receives the attention it deserves.",
      events: [
        {
          image: "/networkinginsta.jpg"
        },
        {
          image: "/networkinglinkedin.jpg"
        }
      ]
    }
  };



  useEffect(() => {
    const currentWingEvents = Object.values(wings)[activeWing]?.events || [];
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentWingEvents.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeWing]);

  const nextSlide = (wingEvents) => {
    setCurrentSlide((prev) => (prev + 1) % wingEvents.length);
  };

  const prevSlide = (wingEvents) => {
    setCurrentSlide((prev) => prev === 0 ? wingEvents.length - 1 : prev - 1);
  };

  const [marginBottom, setMarginBottom] = useState(0); // Default marginBottom

  useEffect(() => {
    const updateMarginBottom = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile devices
        setMarginBottom(15);
      } else {
        // Larger screens
        setMarginBottom(0);
      }
    };

    // Initial check
    updateMarginBottom();

    // Event listener for window resize
    window.addEventListener("resize", updateMarginBottom);

    return () => {
      window.removeEventListener("resize", updateMarginBottom);
    };
  }, []);


  return (
    <div ref={mountRef} className="min-h-screen">
      <div className="relative z-10">
        {Object.entries(wings).map(([key, wing], index) => (
          <div
            key={key}
            className="wing-section h-screen w-full flex items-center justify-center snap-center mb-12  "
            style={{ marginBottom: `${marginBottom}rem` }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className={`transform transition-all duration-500 ease-out ${index === activeWing ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
                  }`}>
                  <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 mt-60">
                    {wing.title}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="text-gray-300 text-lg md:text-xl leading-relaxed">
                      {wing.description}
                    </div>

                    <div className="relative aspect-square w-full max-w-lg mx-auto">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Carousel className='rounded-xl' loop autoplay autoplayDelay={2000} navigation={false}>
                          {wing.events.map((event, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={event.image}
                                className="w-full h-full object-contain"
                                alt='image'
                              />
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WingsDetails;