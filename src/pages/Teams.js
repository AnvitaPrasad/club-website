// Teams.js
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import Navbar from '../components/Navbar';  // Import the Navbar component

const getInitialAvatar = (name) => {
  const initials = name.split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div className="w-40 h-40 rounded-full mx-auto mb-4 flex items-center justify-center 
      bg-gradient-to-br from-red-600/70 to-black/70 text-white text-5xl font-bold">
      {initials}
    </div>
  );
};

const TeamMemberCard = ({ name, position, image, github, linkedin }) => {
  return (
    <div className="flip-card w-64 h-80">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="h-full bg-black/30 backdrop-blur-sm rounded-xl p-4">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
              />
            ) : (
              getInitialAvatar(name)
            )}
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <p className="text-gray-300">{position}</p>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="h-full bg-black/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
            <div className="space-y-4">
              <div className="opacity-20">
                {image ? (
                  <img 
                    src={image} 
                    alt={name}
                    className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                  />
                ) : (
                  getInitialAvatar(name)
                )}
                <h3 className="text-lg font-bold text-white mb-1 text-center">{name}</h3>
              </div>
              {github && (
                <a 
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors no-underline"
                >
                  <FaGithub className="w-8 h-8" />
                  <span>GitHub</span>
                </a>
              )}
              {linkedin && (
                <a 
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors no-underline"
                >
                  <FaLinkedin className="w-8 h-8" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Teams = () => {
  const mountRef = useRef(null);
  const backgroundRef = useRef(null);

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

    // City setup (same as before)
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

  // Updated team data structure
  const teamData = {
      leadership: {
      head: {
        name: "Dheeraj Singh",
        position: "Head Core",
        image: "/team/dheeraj.jpg",
        github: "https://github.com/dheerajsingh89",
        linkedin: "https://www.linkedin.com/in/dheeraj-singh-3105b7226/"
      },
      techLead: {
        name: "Chanakya Vasantha",
        position: "Tech Lead",
        image: "/team/chanakya.jpg",
        github: "https://github.com/chanakyavasantha",
        linkedin: "https://www.linkedin.com/in/chanakya-chowdary-vasantha-081a00222?originalSubdomain=in"
      },
      facultyAdvisor: {
        name: "Prof. Masilamani V",
        position: "Faculty Advisor",
        image: "/team/masilamani.jpg",
        linkedin: "https://www.linkedin.com/in/masilamani-vedhanayagam-266b3653/?originalSubdomain=in"
      }
    },
    divisions: {
      "COMPETITIVE PROGRAMMING": {
        cores: [
          {
            name: "Avinaash A",
            position: "Core",
            image: "/team/avinaash.jpg",
            github: "https://github.com/Avinaasha382",
            linkedin: "https://www.linkedin.com/in/avinaash-a-7955a1289?originalSubdomain=in"
          },
          {
            name: "Mohammed Shoaib",
            position: "Core",
            image: "/team/shoaib.jpg",
            github: "https://github.com/Shoaib1890",
            linkedin: "https://www.linkedin.com/in/mohammed-shoaib-5a8718261?originalSubdomain=in"
          }
        ],
        jointCores: [
          {
            name: "Sharad Kumar Dubey",
            position: "Joint Core",
            image: "/team/sharad.jpg",
            github: "https://github.com/sha-ey",
            linkedin: "https://www.linkedin.com/in/sharad-kumar-dubey-24aa54282?originalSubdomain=in"
          },
          {
            name: "Kishore K",
            position: "Joint Core",
            image:"",
            github: "https://github.com/chmod-Kishore",
            linkedin: "https://www.linkedin.com/in/kishore-kumaresan-62a101273/"
          },
          {
            name: "Anvita Prasad",
            position: "Joint Core",
            image: "/team/anvita.jpg",
            github: "https://github.com/AnvitaPrasad",
            linkedin: "https://www.linkedin.com/in/anvita-prasad-a3a17625a/"
          },
          {
            name: "Dhanya Venkatesh",
            position: "Joint Core",
            image: "/team/dhanya.jpg",
            github: "https://github.com/its-dhanya",
            linkedin: "https://www.linkedin.com/in/dhanya-venkatesh-1531801b3?originalSubdomain=in"
          },
          {
            name: "Daniel Ashish Abraham",
            position: "Joint Core",
            image: "/team/daniel.jpg",
            github: "https://github.com/ashdane",
            linkedin: "https://www.linkedin.com/in/daniel-ashish?originalSubdomain=in"
          }
        ]
      },
      "ARTIFICIAL INTELLIGENCE": {
        cores: [
          {
            name: "Aditi Gupta",
            position: "Core",
            image: "/team/aditi.jpg",
            github: "https://github.com/Aditi-Gp",
            linkedin: "https://www.linkedin.com/in/aditi-gupta-56429322a?originalSubdomain=in"
          },
          {
            name: "Rishit Rashtogi",
            position: "Core",
            image: "/team/rishit.jpg",
            github: "https://github.com/r-rishit27",
            linkedin: "https://www.linkedin.com/in/rishit-rastogi-1aa545208/"
          }
        ],
        jointCores: [
          {
            name: "Rohan Joshi",
            position: "Joint Core",
            image: "/team/rohan.jpg",
            github: "https://github.com/rohanjoshi15",
            linkedin: "https://www.linkedin.com/in/rohan-joshi-1a96b0282?originalSubdomain=in"
          },
          {
            name: "Ajitha Arvinth",
            position: "Joint Core",
            image: "/team/ajitha.jpg",
            github: "https://github.com/fuggi11",
            linkedin: "https://www.linkedin.com/in/ajitha-arvinth-2a3926264?originalSubdomain=in"
          },
          {
            name: "Hari Krishnan K V",
            position: "Joint Core",
            image: "",
            github: "https://github.com/Hari-2103",
            linkedin: "https://linkedin.com/in/jc1"
          },
          {
            name: "Sree Balaji S",
            position: "Joint Core",
            image: "/team/balaji.jpg",
            github: "https://github.com/poggyztsi",
            linkedin: "https://linkedin.com/in/jc1"
          }
        ]
      },
      "EdITH": {
        cores: [
          {
            name: "Anshu Saini",
            position: "Core",
            image: "",
            github: "https://github.com/0Anshu1",
            linkedin: "https://www.linkedin.com/in/anshu-saini-328446258/?originalSubdomain=in"
          },
          {
            name: "P. Surya Sri Rama Murthy",
            position: "Core",
            image: "",
            github: "https://github.com/sriram0620",
            linkedin: "https://www.linkedin.com/in/surya-sri-rama-murthy/?originalSubdomain=in"
          }
        ],
        jointCores: [
          {
            name: "Ranveer Gautam",
            position: "Joint Core",
            image: "",
            github: "https://github.com/martial-gautam5",
            linkedin: "https://www.linkedin.com/in/martial-gautam/?originalSubdomain=in"
          },
          {
            name: "Ayush Mishra",
            position: "Joint Core",
            image: "/team/ayush.jpg",
            github: "https://github.com/ayush10mishra",
            linkedin: "https://www.linkedin.com/in/ayush-mishra-a7236b327/"
          },
          {
            name: "Y.Yaswitha Nandu",
            position: "Joint Core",
            image: "/team/nandu.jpg",
            github: "https://github.com/yaswithanandu",
            linkedin: "https://www.linkedin.com/in/yaswitha-nandu-4975a4317/?originalSubdomain=in"
          },
          {
            name: "Y.Subhasree",
            position: "Joint Core",
            image: "/team/subha.jpg",
            github: "https://github.com/Subha1706",
            linkedin: "https://www.linkedin.com/in/subhasree-yenigalla-5688a228a/?originalSubdomain=in"
          }
        ]
      },
      "PRIT": {
        cores: [
          {
            name: "Prince Maurya",
            position: "Core",
            image: "/team/prince.jpg",
            github: "https://github.com/princemaurya002",
            linkedin: "https://www.linkedin.com/in/prince-maurya-3939311a9?originalSubdomain=in"
          },
          {
            name: "Varshitha Masaram ",
            position: "Core",
            image: "/team/varshitha.jpg",
            github: "https://github.com/varshitha1983",
            linkedin: "https://www.linkedin.com/in/varshitha-masaram-93171b286?originalSubdomain=in"
          }
        ],
        jointCores: [
          {
            name: "Anjaninithin Chalamchala",
            position: "Joint Core",
            image: "/team/Anjan.jpg",
            github: "https://github.com/Nithinchalamchala",
            linkedin: "https://linkedin.com/in/jc1"
          },
          {
            name: "Abinav",
            position: "Joint Core",
            image: "/team/abinav.jpg",
            github: "https://github.com/ayush10mishra",
            linkedin: "https://www.linkedin.com/in/abinav-rajagopal-2ba65a286/"
          },
          {
            name: "S Harshini",
            position: "Joint Core",
            image: "/team/harshini.jpg",
            github: "https://github.com/harshinis30",
            linkedin: "https://www.linkedin.com/in/harshini-s-624228289?originalSubdomain=in"
          },
          {
            name: "Monish M",
            position: "Joint Core",
            image: "/team/monish.jpg",
            github: "https://github.com/monishm2004",
            linkedin: "https://www.linkedin.com/in/monish-murugan?originalSubdomain=in"
          }
        ]
      },
      "NETWORKING": {
        cores: [
          {
            name: "Prabhas",
            position: "Core",
            image: "",
            github: "https://github.com/prabhas133",
            linkedin: "https://www.linkedin.com/in/prabhas-dhanikonda-0007a6275?originalSubdomain=in"
          },
          {
            name: "Annaladasu Rakesh",
            position: "Core",
            image: "",
            github: "#",
            linkedin: "https://www.linkedin.com/in/rakesh-annnaladasu-aa368722a?originalSubdomain=in"
          }
        ],
        jointCores: [
          {
            name: "Tarun Vignesh G",
            position: "Joint Core",
            image: "/team/tarun.jpg",
            github: "https://github.com/tarunkillscodes",
            linkedin: "https://www.linkedin.com/in/tarun-vignesh-297310288?originalSubdomain=in"
          },
          {
            name: "Banoth Yogichand Naik",
            position: "Joint Core",
            image: "",
            github: "#",
            linkedin: "https://www.linkedin.com/in/yogichand-naik-banoth-986470344?originalSubdomain=in"
          },
          {
            name: "K Shashank Reddy",
            position: "Joint Core",
            image: "",
            github: "https://github.com/shashank-256",
            linkedin: "https://www.linkedin.com/in/shashank-reddy-k-903607332?originalSubdomain=in"
          },
          {
            name: "Aneesh Reddy",
            position: "Joint Core",
            image: "",
            github: "#",
            linkedin: "https://www.linkedin.com/in/aneesh-reddy-b4a44b278?originalSubdomain=in"
          }
        ]
      }
      // Add other divisions similarly
    }
  };

  return (
    <>
      <Navbar />
      <div ref={mountRef} className="min-h-screen">
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-20 pt-24">
            {/* Leadership Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mb-20"
            >
              <h2 className="text-4xl font-bold text-white mb-12 text-center">Leadership</h2>
              <TeamMemberCard {...teamData.leadership.head} />
              <div className="mt-12 flex flex-wrap justify-center gap-8">
                <TeamMemberCard {...teamData.leadership.techLead} />
                <TeamMemberCard {...teamData.leadership.facultyAdvisor} />
              </div>
            </motion.div>

            {/* Divisions */}
            {Object.entries(teamData.divisions).map(([division, { cores, jointCores }], index) => (
              <motion.div
                key={division}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="mb-20"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {division}
                </h2>
                {cores.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 text-center">Cores</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                      {cores.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                      ))}
                    </div>
                  </div>
                )}
                {jointCores.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 text-center">Joint Cores</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                      {jointCores.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;