'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSprings, animated } from '@react-spring/web';
import Image from 'next/image';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFirePreset } from '@tsparticles/preset-fire';

export default function Hero() {
  const cards = useMemo(
    () => [
      {
        label: 'つみ',
        labelImage: '/images/sin.png',
        labelImageRed: '/images/sin_red.png',
        image: '/images/orange.jpg',
        translationLabel: 'sin',
      },
      {
        label: 'くやむ',
        labelImage: '/images/regret.png',
        labelImageRed: '/images/regret_red.png',
        image: '/images/red.jpg',
        translationLabel: 'regret',
      },
      {
        label: 'たえる',
        labelImage: '/images/endure.png',
        labelImageRed: '/images/endure_red.png',
        image: '/images/blue.jpg',
        translationLabel: 'endure',
      },
      {
        label: 'あらためる',
        labelImage: '/images/reform.png',
        labelImageRed: '/images/reform_red.png',
        image: '/images/green.jpg',
        translationLabel: 'reform',
      },
      {
        label: 'あがなう',
        labelImage: '/images/redemption.png',
        labelImageRed: '/images/redemption_red.png',
        image: '/images/yellow.jpg',
        translationLabel: 'redemption',
      },
    ],
    []
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<number | null>(null);
  const [particlesInit, setParticlesInit] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [springs, api] = useSprings(cards.length, (i) => ({
    transform: 'rotateY(0deg)',
    config: { mass: 1, tension: 280, friction: 30 },
    delay: i * 100,
  }));

  useEffect(() => {
    if (isImageLoaded && pendingSelection !== null) {
      setSelected(pendingSelection);
      setActiveImage(cards[pendingSelection].image);
      setPendingSelection(null);
      setIsImageLoaded(false);
    }
  }, [isImageLoaded, pendingSelection, cards]);

  useEffect(() => {
    api.start((i) => ({
      transform: selected !== null ? 'rotateY(180deg)' : 'rotateY(0deg)',
      delay: i * 100,
    }));
  }, [selected, api]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFirePreset(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  useEffect(() => {
    const img1 = new window.Image();
    img1.src = '/images/bg_fire_1.png';
    const img2 = new window.Image();
    img2.src = '/images/bg_fire_2.png';
  }, []);

  const handleClick = (index: number) => {
    if (selected === null) {
      setPendingSelection(index);
      const img = new window.Image();
      img.src = cards[index].image;
      img.onload = () => {
        setIsImageLoaded(true);
      };
    } else {
      setSelected(null);
      setHoveredIndex(null);
    }
  };

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: false,
          },
        },
        color: {
          value: ['#aa0000', '#ff0000', '#ff5500', '#ff8800', '#ff5544'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.1, max: 0.8 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: { min: 1, max: 3 },
          direction: 'top' as const,
          random: true,
          straight: false,
          outModes: {
            default: 'destroy' as const,
          },
        },
      },
      emitters: {
        position: {
          x: 50,
          y: 25,
        },
        rate: {
          quantity: 2,
          delay: 0.1,
        },
        size: {
          width: 5,
          height: 5,
        },
      },
    }),
    []
  );

  return (
    <div
      className='w-full max-w-[1173px] aspect-[1173/800] mt-6 mx-auto flex relative'
      style={{
        perspective: 1000,
      }}
      onClick={() => setSelected(null)}
    >
      {springs.map((style, i) => (
        <animated.div
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(i);
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className='flex-1 relative flex items-center justify-center cursor-pointer group'
          style={{
            ...style,
            transformStyle: 'preserve-3d',
            transform: style.transform.to((t) => `${t} translateZ(20px)`),
            margin: '0 -10px',
          }}
        >
          {/* Front face */}
          <div
            className='absolute inset-0 flex items-end justify-center pb-4 border border-amber-900/50 overflow-hidden'
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(20px)',
            }}
          >
            <div className='absolute inset-0 bg-orange-200'>
              <Image
                src='/images/yoshitoshi.png'
                alt='Yoshitoshi'
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 50%`,
                  opacity: 0.5,
                }}
              />
            </div>
            <div className='fire' />
            <div className='relative flex flex-col items-center p-2 text-black/40 transition-all duration-300 ease-in-out group-hover:items-center group-hover:pb-56 group-hover:pt-40 group-hover:text-red-900'>
              <span
                className='font-bold group-hover:opacity-75 group-hover:scale-125 group-hover:mb-12 transition-all duration-300 ease-in-out'
                translate='no'
              >
                {cards[i].label}
              </span>
              <div className='relative w-24 h-24'>
                {particlesInit && hoveredIndex === i && (
                  <div className='absolute top-0 left-0 w-full h-full'>
                    <Particles
                      id={`tsparticles-${i}`}
                      options={particlesOptions}
                      style={{
                        zIndex: 5,
                      }}
                    />
                  </div>
                )}
                <Image
                  src={cards[i].labelImage}
                  alt={cards[i].label}
                  fill
                  priority
                  style={{
                    objectFit: 'contain',
                    transition: 'opacity 300ms ease-in-out',
                    zIndex: 10,
                  }}
                  className='opacity-75 group-hover:opacity-0 transition-all duration-300 ease-in-out'
                />
                <Image
                  src={cards[i].labelImageRed}
                  alt={cards[i].label}
                  fill
                  priority
                  style={{
                    objectFit: 'contain',
                    transition: 'opacity 300ms ease-in-out',
                    zIndex: 10,
                  }}
                  className='opacity-0 group-hover:opacity-85 group-hover:scale-[2] transition-all duration-300 ease-in-out'
                />
              </div>
              <span className='font-bold group-hover:opacity-75 group-hover:scale-125 group-hover:mt-8 transition-all duration-300 ease-in-out'>
                ( {cards[i].translationLabel} )
              </span>
            </div>
          </div>

          {/* Back face */}
          <div
            className='absolute inset-0 overflow-hidden'
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(20px)',
            }}
          >
            <div className='relative w-full h-full'>
              <Image
                src={activeImage || cards[i].image}
                alt={cards[i].label}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 50%`,
                }}
              />
            </div>
          </div>

          {/* Top face */}
          <div
            className='absolute overflow-hidden'
            style={{
              position: 'absolute',
              width: '100%',
              height: '40px',
              top: '-20px',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(90deg) translateZ(20px)',
            }}
          >
            <div className='relative w-full h-full'>
              <Image
                src={activeImage || cards[i].image}
                alt={cards[i].label}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 50%`,
                }}
              />
            </div>
          </div>

          {/* Bottom face */}
          <div
            className='absolute overflow-hidden'
            style={{
              position: 'absolute',
              width: '100%',
              height: '40px',
              bottom: '-20px',
              backfaceVisibility: 'hidden',
              transform: 'rotateX(-90deg) translateZ(20px)',
            }}
          >
            <div className='relative w-full h-full'>
              <Image
                src={activeImage || cards[i].image}
                alt={cards[i].label}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 50%`,
                }}
              />
            </div>
          </div>

          {/* Left face */}
          <div
            className='absolute overflow-hidden'
            style={{
              position: 'absolute',
              height: '100%',
              width: '40px',
              left: '-20px',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(90deg) translateZ(20px)',
            }}
          >
            <div className='relative w-full h-full'>
              <Image
                src={activeImage || cards[i].image}
                alt={cards[i].label}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 50%`,
                }}
              />
            </div>
          </div>

          {/* Right face */}
          <div
            className='absolute overflow-hidden'
            style={{
              position: 'absolute',
              height: '100%',
              width: '40px',
              right: '-20px',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(-90deg) translateZ(20px)',
            }}
          >
            <div className='relative w-full h-full'>
              <Image
                src={activeImage || cards[i].image}
                alt={cards[i].label}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 50%`,
                }}
              />
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
