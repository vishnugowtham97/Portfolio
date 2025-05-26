import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
// import ParallaxBackground from "../components/parallaxBackground";
// import { Astronaut } from "../components/Astronaut";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import * as THREE from "three";
import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  // const { scene } = useGLTF("/models/eve_wall-e__eva.glb");

    const containerRef = useRef(null);
  
  return (
    <section
      id="home"
      ref={containerRef}
      style={{ position: "relative" }}
      className="flex w-full items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
      <HeroText />
      {/* <ParallaxBackground /> */}
      <ParticleBackground containerRef={containerRef}/>
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile && [0, -1.5, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas> */}
        <Canvas camera={{ position: [0, 0, 5], fov: isMobile ? 35 : 40 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <OrbitControls enableZoom={false} />
          <Suspense fallback={<Loader />}>
            <Float>
              <AnimatedModel
                url="/models/eve_wall-e__eva.glb"
                scale={isMobile ? 0.25 : 0.4}
                // position={isMobile ? [-0.275, -0.5, 0] : [0, 0, 0]}
                position={isMobile ? [0.1, -0.5, 0] : [0.9, 0, 0]}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>

      <div className="absolute xs:bottom-10 bottom-10 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

// function Rig() {
//   return useFrame((state, delta) => {
//     easing.damp3(
//       state.camera.position,
//       [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
//       0.5,
//       delta
//     );
//   });
// }

function Rig() {
  return useFrame((state, delta) => {
    const { camera, mouse } = state;

    const targetX = mouse.x * 0.5;
    const targetY = 1 + mouse.y * 0.3;
    easing.damp3(camera.position, [targetX, targetY, 3], 0.3, delta);
    camera.lookAt(0, 0, 0);
  });
}

export default Hero;

const AnimatedModel = ({ url, scale = 0.5, position = [0, -1.5, 0] }) => {
  const { scene, animations } = useGLTF(url);
  const mixerRef = useRef(null);

  useEffect(() => {
    if (animations.length) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixerRef.current.clipAction(clip).play();
      });
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return <primitive object={scene} scale={scale} position={position} />;
};
