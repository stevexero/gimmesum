'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSprings, animated } from '@react-spring/web';
import Image from 'next/image';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFirePreset } from '@tsparticles/preset-fire';
import Link from 'next/link';

export default function Hero() {
  const cards = useMemo(
    () => [
      {
        label: 'つみ',
        labelImage: '/images/sin.png',
        labelImageRed: '/images/sin_red.png',
        image: '/images/orange.jpg',
        burntImage: '/images/burnt_1_a.png',
        paperImage: '/images/paper_1.png',
        translationLabel: 'sin',
        dropDate: 'Fall / Winter 2026',
        inspirationSlug: 'sin',
      },
      {
        label: 'くやむ',
        labelImage: '/images/regret.png',
        labelImageRed: '/images/regret_red.png',
        image: '/images/red.jpg',
        burntImage: '/images/burnt_2_a.png',
        paperImage: '/images/paper_2.png',
        translationLabel: 'regret',
        dropDate: 'Spring / Summer 2027',
        inspirationSlug: 'regret',
      },
      {
        label: 'たえる',
        labelImage: '/images/endure.png',
        labelImageRed: '/images/endure_red.png',
        image: '/images/blue.jpg',
        burntImage: '/images/burnt_1_a.png',
        paperImage: '/images/paper_3.png',
        translationLabel: 'endure',
        dropDate: 'Fall / Winter 2027',
        inspirationSlug: 'endure',
      },
      {
        label: 'あらためる',
        labelImage: '/images/reform.png',
        labelImageRed: '/images/reform_red.png',
        image: '/images/green.jpg',
        burntImage: '/images/burnt_4_a.png',
        paperImage: '/images/paper_4.png',
        translationLabel: 'reform',
        dropDate: 'Spring / Summer 2028',
        inspirationSlug: 'reform',
      },
      {
        label: 'あがなう',
        labelImage: '/images/redemption.png',
        labelImageRed: '/images/redemption_red.png',
        image: '/images/yellow.jpg',
        burntImage: '/images/burnt_2_a.png',
        paperImage: '/images/paper_5.png',
        translationLabel: 'redemption',
        dropDate: 'Fall / Winter 2028',
        inspirationSlug: 'redemption',
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
  const [hoveredDivs, setHoveredDivs] = useState<number[]>([]);

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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (!hoveredDivs.includes(index)) {
      setHoveredDivs((prev) => [...prev, index]);
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
  };

  const handleClick = (index: number, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }

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
          value: 15,
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
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 2 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: { min: 1, max: 2 },
          direction: 'top' as const,
          random: true,
          straight: false,
          outModes: {
            default: 'destroy' as const,
          },
        },
      },
    }),
    []
  );

  const embersParticlesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: {
        color: {
          value: 'transparent',
        },
      },
      particles: {
        number: {
          value: 10,
          density: {
            enable: false,
          },
        },
        color: {
          value: [
            '#ffffff',
            '#aa0000',
            '#ff0000',
            '#ff5500',
            '#ff8800',
            '#ff5544',
          ],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.1, max: 0.8 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        size: {
          value: { min: 0.5, max: 2 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: { min: 0, max: 0.2 },
          direction: 'top' as const,
          random: true,
          straight: false,
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
            handleClick(i, e);
          }}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
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
            <div
              className={`fire
            ${
              hoveredDivs.includes(i)
                ? 'lit bottom-[175px] h-0'
                : 'bottom-0 h-full group-hover:bottom-[175px] group-hover:h-0'
            } transition-all duration-[5000ms] ease-in-out`}
            ></div>
            <div
              className={`${
                hoveredDivs.includes(i)
                  ? 'items-center pb-56 pt-40 text-red-900'
                  : 'group-hover:items-center group-hover:pb-56 group-hover:pt-40 group-hover:text-red-900'
              } relative flex flex-col items-center p-2 text-black/40 transition-all duration-300 ease-in-out`}
            >
              <span
                className={`${
                  hoveredDivs.includes(i)
                    ? 'opacity-75 scale-125 mb-12'
                    : 'group-hover:opacity-75 group-hover:scale-125 group-hover:mb-12'
                } font-bold transition-all duration-300 ease-in-out`}
                translate='no'
              >
                {cards[i].label}
              </span>
              <div className='relative w-24 h-24'>
                {particlesInit && hoveredIndex === i && (
                  <>
                    <div className='absolute top-0 left-0 w-full h-full'>
                      <Particles
                        id={`tsparticles-${i}`}
                        options={particlesOptions}
                        style={{
                          zIndex: 5,
                        }}
                      />
                    </div>
                  </>
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
                  className={`${
                    hoveredDivs.includes(i)
                      ? 'opacity-0'
                      : 'opacity-75 group-hover:opacity-0'
                  } transition-all duration-300 ease-in-out`}
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
                  className={`${
                    hoveredDivs.includes(i)
                      ? 'opacity-85 scale-[2]'
                      : 'opacity-0 group-hover:opacity-85 group-hover:scale-[2]'
                  } transition-all duration-300 ease-in-out`}
                />
              </div>
              <span
                className={`${
                  hoveredDivs.includes(i)
                    ? 'opacity-75 scale-125 mt-8'
                    : 'group-hover:opacity-75 group-hover:scale-125 group-hover:mt-8'
                } font-bold transition-all duration-300 ease-in-out`}
              >
                ( {cards[i].translationLabel} )
              </span>
            </div>
            <div>
              <Image
                src={cards[i].paperImage}
                alt='burnt paper'
                fill
                priority
                style={{
                  objectFit: 'contain',
                  mixBlendMode: 'darken',
                  filter: 'blur(10px)',
                }}
                className={`${
                  hoveredDivs.includes(i)
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                } object-[100%_104%] transition-all duration-[5000ms] ease-out`}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center text-center px-8 z-10 ${
                  hoveredDivs.includes(i)
                    ? 'opacity-100 -bottom-[80%]'
                    : '-bottom-[200%] opacity-0 group-hover:opacity-100 group-hover:-bottom-[80%]'
                } transition-all duration-[5000ms] ease-out`}
              >
                <Link
                  href={`/collections/${cards[i].inspirationSlug}`}
                  className='text-red-900 font-serif text-lg leading-relaxed border-b-2 border-red-900 hover:scale-105 transition-all duration-300 ease-in-o'
                >
                  {cards[i].dropDate}
                </Link>
              </div>
            </div>
            <Image
              src={cards[i].burntImage}
              alt='burnt edges'
              fill
              priority
              style={{
                objectFit: 'contain',
              }}
              className={`${
                hoveredDivs.includes(i)
                  ? `scale-x-150 object-[100%_100%]`
                  : `scale-x-100 object-[100%_140%] group-hover:scale-x-150 group-hover:object-[100%_100%]`
              } transition-all duration-[5000ms] ease-out`}
            />
            <div
              className={`${
                hoveredDivs.includes(i)
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              } transition-all duration-[5000ms] ease-in`}
            >
              {particlesInit && (
                <div className='absolute left-0 bottom-[165px] w-full h-7 overflow-hidden'>
                  <Particles
                    id={`tsparticles-${i}-embers`}
                    options={embersParticlesOptions}
                    style={{ zIndex: 5, width: '100%', height: '100%' }}
                  />
                </div>
              )}
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
