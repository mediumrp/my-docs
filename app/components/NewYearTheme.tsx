// app/components/NewYearTheme.tsx
'use client';

import { useEffect, useState } from 'react';

// ⭐ ГЛАВНЫЙ ПЕРЕКЛЮЧАТЕЛЬ - установи false чтобы отключить
const NEW_YEAR_ENABLED = true;

// Настройки
const SNOWFLAKE_COUNT = 40;

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: SNOWFLAKE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 6 + 4, // 4-10px (было 2-5px)
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 text-white dark:text-gray-300"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
          }}
        >
          ❄
        </div>
      ))}
      
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export function NewYearTheme() {
  if (!NEW_YEAR_ENABLED) {
    return null;
  }

  return <Snow />;
}

export { NEW_YEAR_ENABLED };