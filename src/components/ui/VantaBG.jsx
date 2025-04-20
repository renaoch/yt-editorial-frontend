import React, { useEffect } from "react";
import * as THREE from "three";
import VANTA from "vanta/src/vanta.net";

const VantaBackground = () => {
  useEffect(() => {
    const element = document.getElementById("vanta-background");

    if (element) {
      const vantaEffect = VANTA({
        el: element,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 2.0,
        scaleMobile: 1.0,
        backgroundColor: 0x1a1a1a,
        color: 0xff00ff,
      });

      return () => {
        vantaEffect?.destroy();
      };
    }
  }, []);

  return (
    <div
      id="vanta-background"
      style={{
        position: "fixed", // <- key change
        top: 0,
        left: 0,
        width: "100%",
        height: "100%", // <- full scrollable height
        zIndex: 3,
      }}
    />
  );
};

export default VantaBackground;
