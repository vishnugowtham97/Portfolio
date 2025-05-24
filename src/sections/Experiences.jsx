import { useRef } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
const Experiences = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ position: "relative" }}
    >
      <ParticleBackground containerRef={containerRef} />
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
