import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Hero = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Background and fog
    const setcolor = 0xF02050;
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);
    
    camera.position.set(0, 2, 14);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.needsUpdate = true;
    }

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';

    mountRef.current.appendChild(renderer.domElement);
    
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();
    
    const mathRandom = (num = 8) => {
      return -Math.random() * num + Math.random() * num;
    };

    // Colors for buildings toggle (from original)
    let setTintNum = true;
    const setTintColor = () => {
      if (setTintNum) {
        setTintNum = false;
        return 0x000000;
      } else {
        setTintNum = true;
        return 0x000000;
      }
    };
    
    const init = () => {
      const segments = 2;
      for (let i = 1; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1, segments, segments, segments);
        const material = new THREE.MeshStandardMaterial({
          color: setTintColor(),
          wireframe: false,
          side: THREE.DoubleSide
        });
        const wmaterial = new THREE.MeshLambertMaterial({
          color: 0xFFFFFF,
          wireframe: true,
          transparent: true,
          opacity: 0.03,
          side: THREE.DoubleSide
        });

        const cube = new THREE.Mesh(geometry, material);
        const wire = new THREE.Mesh(geometry, wmaterial);
        const floor = new THREE.Mesh(geometry, material);
        const wfloor = new THREE.Mesh(geometry, wmaterial);
        
        cube.add(wire);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(mathRandom(8));
        
        floor.scale.y = 0.05; // Floor height
        cube.scale.y = 0.1 + Math.abs(mathRandom(8));
        
        const cubeWidth = 0.9;
        cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());
        
        floor.position.set(cube.position.x, 0, cube.position.z);
        
        town.add(floor);
        town.add(cube);
      }
      
      // Particles
      const gmaterial = new THREE.MeshToonMaterial({color: 0xFFFF00, side: THREE.DoubleSide});
      const gparticular = new THREE.CircleGeometry(0.01, 3);
      const aparticular = 5;
      
      for (let h = 1; h < 300; h++) {
        const particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(aparticular), mathRandom(aparticular), mathRandom(aparticular));
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(particular);
      }

      // Add ground plane from original
      const pmaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        roughness: 10,
        metalness: 0.6,
        opacity: 0.9,
        transparent: true
      });
      const pgeometry = new THREE.PlaneGeometry(60, 60);
      const pelement = new THREE.Mesh(pgeometry, pmaterial);
      pelement.rotation.x = -90 * Math.PI / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;
      city.add(pelement);
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
    const lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
    const lightBack = new THREE.PointLight(0xFFFFFF, 0.5);
    const spotLightHelper = new THREE.SpotLightHelper(lightFront);

    lightFront.rotation.x = 45 * Math.PI / 180;
    lightFront.rotation.z = -45 * Math.PI / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);

    smoke.position.y = 2;

    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);

    // Grid helper from original
    const gridHelper = new THREE.GridHelper(60, 120, 0xFF0000, 0x000000);
    city.add(gridHelper);

    // Cars animation from original
    let createCarPos = true;
    const createCars = (cScale = 2, cPos = 20, cColor = 0xFFFF00) => {
      const cMat = new THREE.MeshToonMaterial({color: cColor, side: THREE.DoubleSide});
      const cGeo = new THREE.BoxGeometry(1, cScale/40, cScale/40);
      const cElem = new THREE.Mesh(cGeo, cMat);
      const cAmp = 3;
      
      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = mathRandom(cAmp);

        gsap.to(cElem.position, {
          x: cPos,
          duration: 3,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3)
        });
      } else {
        createCarPos = true;
        cElem.position.x = mathRandom(cAmp);
        cElem.position.z = -cPos;
        cElem.rotation.y = 90 * Math.PI / 180;
        
        gsap.to(cElem.position, {
          z: cPos,
          duration: 5,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
          ease: "power1.inOut"
        });
      }
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    };

    const generateLines = () => {
      for (let i = 0; i < 60; i++) {
        createCars(0.1, 20);
      }
    };

    // Mouse handling with scroll detection
    let mouse = { x: 0, y: 0 };
    const uSpeed = 0.001;
    let isScrolling = false;
    let scrollTimeout;
    
    const handleMouseMove = (event) => {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchStart = (event) => {
      if (event.touches.length === 1 && !isScrolling) {
        mouse.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length === 1 && !isScrolling) {
        mouse.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
      }
    };

    const handleScroll = () => {
      isScrolling = true;
      mouse.x = 0;
      mouse.y = 0;
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchmove', handleTouchMove, false);
    window.addEventListener('scroll', handleScroll, false);
    window.addEventListener('resize', handleResize, false);

    const animate = () => {
      requestAnimationFrame(animate);
      
      city.rotation.y -= ((mouse.x * 8) - camera.rotation.y) * uSpeed;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
      
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 1;
      
      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;
      
      camera.lookAt(city.position);
      renderer.render(scene, camera);
    };
    
    generateLines();
    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="relative h-screen w-full">
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            CS Club IIITDM
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            - One Line of Code at a Time -
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;