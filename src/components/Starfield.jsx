import { useEffect, useState } from 'react';

const Starfield = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars on mount
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random(),
      animationDuration: Math.random() * 5 + 5 + 's',
      animationDelay: Math.random() * 5 + 's'
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="absolute inset-0 hidden dark:block">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration} infinite ${star.animationDelay} ease-in-out`
            }}
          />
        ))}
      </div>
      
      {/* CSS Animation Keyframes right inside component for simplicity */}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
};

export default Starfield;
