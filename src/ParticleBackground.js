import React from "react";
import Particles from "react-tsparticles";
import ParticleConfig from "./Components/ParticalsConfig/particle-config";

export default function ParticleBackground() {
  return <Particles params={ParticleConfig}></Particles>;
}
