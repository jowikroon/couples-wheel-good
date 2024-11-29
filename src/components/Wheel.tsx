import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Sparkles, Zap } from 'lucide-react';
import { useGesture } from '@use-gesture/react';
import { Howl } from 'howler';
import { useSpring as useReactSpring, animated } from '@react-spring/web';

interface WheelProps {
  items: string[];
  spinning: boolean;
  selectedItem: number | null;
  onSpin: () => void;
  color?: 'red' | 'orange';
}

const spinSound = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'],
  volume: 0.5,
});

const winSound = new Howl({
  src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'],
  volume: 0.5,
});

export const Wheel: React.FC<WheelProps> = ({
  items,
  spinning,
  selectedItem,
  onSpin,
  color = 'red'
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const rotateValue = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20
  });

  const [spring, api] = useReactSpring(() => ({
    from: { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' },
    config: { mass: 1, tension: 180, friction: 12 }
  }));

  const colors = {
    red: {
      primary: '#FF3366',
      secondary: '#FF5C8A',
      accent: '#FFE1E8'
    },
    orange: {
      primary: '#FF9933',
      secondary: '#FFB366',
      accent: '#FFE8D6'
    }
  };

  useEffect(() => {
    if (spinning) {
      spinSound.play();
      
      const baseSpins = 5;
      const extraSpins = Math.random() * 3;
      const selectedAngle = (selectedItem || 0) * (360 / items.length);
      const totalRotation = (baseSpins + extraSpins) * 360 + selectedAngle;

      controls.start({
        rotate: totalRotation,
        transition: {
          duration: 4,
          ease: [0.64, 0.00, 0.78, 0.00],
          onComplete: () => winSound.play()
        }
      });
    }
  }, [spinning, selectedItem, controls, items.length]);

  const bind = useGesture({
    onMove: ({ xy: [x, y], event }) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((x - centerX) / rect.width);
      mouseY.set((y - centerY) / rect.height);
      
      api.start({
        transform: `
          perspective(1000px)
          rotateX(${(y - centerY) / 20}deg)
          rotateY(${-(x - centerX) / 20}deg)
        `
      });
    },
    onDrag: ({ movement: [x, y], velocity: [vx, vy], last }) => {
      if (spinning) return;

      const angle = Math.atan2(y, x);
      const velocity = Math.sqrt(vx * vx + vy * vy);

      if (last && velocity > 1) {
        const momentum = Math.min(velocity * 100, 1000);
        controls.start({
          rotate: rotateValue.get() + momentum,
          transition: {
            type: "spring",
            duration: 2,
            bounce: 0.25
          }
        });
      } else {
        rotateValue.set(angle * (180 / Math.PI));
      }
    }
  });

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 perspective-1000">
      {/* 3D container */}
      <animated.div
        style={spring}
        className="relative w-full h-full"
        {...bind()}
      >
        {/* Digital glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-50 blur-xl"
          style={{
            background: `radial-gradient(circle, ${colors[color].primary}40 0%, transparent 70%)`
          }}
        />

        {/* Main wheel */}
        <motion.div
          ref={wheelRef}
          className="absolute inset-0 rounded-full backdrop-blur-sm transform-gpu"
          style={{
            background: `
              linear-gradient(135deg, 
                ${colors[color].primary}20, 
                ${colors[color].secondary}10
              )
            `,
            border: `2px solid ${colors[color].primary}30`,
            boxShadow: `
              0 0 20px ${colors[color].primary}20,
              inset 0 0 30px ${colors[color].primary}10
            `
          }}
          animate={controls}
        >
          {/* Segments */}
          {items.map((item, index) => {
            const angle = (360 / items.length) * index;
            return (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                {/* Segment divider with 3D effect */}
                <div 
                  className="absolute h-full w-[2px] origin-bottom"
                  style={{
                    background: `linear-gradient(to top, 
                      ${colors[color].primary}40,
                      ${colors[color].primary}20,
                      transparent
                    )`,
                    transform: 'translateZ(2px)'
                  }}
                />
                
                {/* Text with 3D lift */}
                <motion.div
                  className="absolute w-full text-center px-8 -translate-y-[8.5rem]"
                  style={{ 
                    transform: `rotate(-${angle}deg) translateZ(4px)`,
                    textShadow: `0 2px 4px rgba(0,0,0,0.2)`
                  }}
                  animate={spinning ? {
                    scale: [1, 1.02, 1],
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={{ duration: 0.5, repeat: spinning ? Infinity : 0 }}
                >
                  <p className="text-sm font-medium text-white/90 truncate">
                    {item}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center decoration with 3D effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={spinning ? {
              rotate: 360,
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 2, repeat: spinning ? Infinity : 0 }}
            style={{ transform: 'translateZ(8px)' }}
          >
            <div className="relative w-16 h-16">
              <Heart 
                className="absolute inset-0 w-full h-full filter drop-shadow-lg"
                style={{ color: colors[color].primary }}
              />
              <Zap
                className="absolute inset-0 w-full h-full opacity-50"
                style={{ color: colors[color].accent }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced 3D edge glow */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                ${colors[color].primary}20 0%,
                transparent 60%
              )
            `,
            transform: 'translateZ(-4px)',
            mixBlendMode: 'screen'
          }}
        />
      </animated.div>

      {/* Spin button */}
      <motion.button
        onClick={onSpin}
        disabled={spinning}
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 
                 px-8 py-3 rounded-full font-semibold text-white
                 disabled:opacity-50 disabled:cursor-not-allowed
                 shadow-lg hover:shadow-xl transition-all"
        style={{
          background: `linear-gradient(135deg, ${colors[color].primary}, ${colors[color].secondary})`
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {spinning ? (
          <motion.span 
            className="flex items-center gap-2"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            Spinning...
          </motion.span>
        ) : (
          'Spin the Wheel!'
        )}
      </motion.button>

      {/* Enhanced 3D particles */}
      {spinning && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ perspective: '1000px' }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: colors[color].primary,
                top: `${50 + Math.cos(i * 30 * Math.PI / 180) * 45}%`,
                left: `${50 + Math.sin(i * 30 * Math.PI / 180) * 45}%`,
                transform: `translateZ(${Math.random() * 50}px)`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0.3, 0.8],
                y: [0, -20, 0],
                rotateX: [0, 360],
                rotateY: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};