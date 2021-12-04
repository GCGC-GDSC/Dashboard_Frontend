import React from 'react'
import Particles from "react-tsparticles";
import './particles.style.scss'
// **********
import particlesConfig from "./particlesConfig"
const ParticlesComponent = () => {
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <Particles
      params={particlesConfig}
    />
  );
};
export default ParticlesComponent