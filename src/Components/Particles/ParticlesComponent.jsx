import React from 'react'
import Particles from "react-tsparticles";
import './particles.style.scss'
// **********
import particlesConfig from "./particlesConfig"
const ParticlesComponent = () => {
  const particlesInit = (main) => {
    console.log(main);
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