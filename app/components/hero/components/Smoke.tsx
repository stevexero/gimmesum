'use client';

import { useEffect, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadImageShape } from '@tsparticles/shape-image';
// I'm not using this component anymore

export default function Smoke({ i }: { i: number }) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadImageShape(engine);
    });
  }, []);

  const smokeOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      particles: {
        number: {
          value: 50,
          density: {
            enable: false,
          },
        },
        shape: {
          type: 'image',
          options: {
            image: {
              src: '/images/smoke.png',
              width: 256,
              height: 256,
            },
          },
        },
        opacity: {
          value: 1,
          animation: { enable: true, speed: 0.5, minimumValue: 0, sync: false },
        },
        size: {
          value: 64,
          random: { enable: true, minimumValue: 32 },
        },
        life: { duration: { value: 5 }, count: 1 },
        move: {
          enable: true,
          gravity: { enable: true, acceleration: -0.5 },
          speed: 2,
          direction: 'top' as const,
          outModes: { default: 'destroy' as const, bottom: 'none' as const },
        },
      },
    }),
    []
  );

  return (
    <Particles
      id={`smoke-${i}`}
      options={smokeOptions}
      style={{ width: '100%', height: '100%', zIndex: 4 }}
    />
  );
}
