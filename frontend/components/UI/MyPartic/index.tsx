import React from "react";
import Particles from "react-particles-js";

export const MyPartic: React.FC<{ active?: boolean }> = ({
  active = false,
}) => {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 400,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: "#fff",
          },
          opacity: {
            value: 0.8,
            anim: {
              enable: active,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: active,
              speed: 6,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            speed: active ? 0.2 : 0,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              size: 10,
              distance: 200,
              opacity: 0.4,
              duration: 5,
            },
          },
        },
      }}
    />
  );
};
