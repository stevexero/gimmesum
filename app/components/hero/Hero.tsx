'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSprings, animated } from '@react-spring/web';
import Image from 'next/image';

export default function Hero() {
  const cards = useMemo(
    () => [
      { label: 'Orange', image: '/images/orange.jpg' },
      { label: 'Red', image: '/images/red.jpg' },
      { label: 'Blue', image: '/images/blue.jpg' },
      { label: 'Green', image: '/images/green.jpg' },
      { label: 'Yellow', image: '/images/yellow.jpg' },
    ],
    []
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<number | null>(null);

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

  const handleClick = (index: number) => {
    if (selected === null) {
      setPendingSelection(index);
      // Preload the image
      const img = new window.Image();
      img.src = cards[index].image;
      img.onload = () => {
        setIsImageLoaded(true);
      };
    } else {
      setSelected(null);
    }
  };

  return (
    <div
      className={`w-full max-w-[1173px] aspect-[1173/800] mt-10 mx-auto flex ${
        selected === null ? 'gap-4' : 'gap-0'
      }`}
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
          className='flex-1 relative flex items-center justify-center cursor-pointer'
          style={{
            ...style,
            transformStyle: 'preserve-3d',
            transform: style.transform.to((t) => `${t} translateZ(20px)`),
            margin: '0 -10px',
          }}
        >
          {/* Front face */}
          <div
            className='absolute inset-0 flex items-end justify-center bg-white pb-4 border border-neutral-200'
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(20px)',
            }}
          >
            {cards[i].label}
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
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 0`,
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
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 0`,
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
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 0`,
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
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 0`,
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
                  objectPosition: `${(i * 100) / (cards.length - 1)}% 0`,
                }}
              />
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
