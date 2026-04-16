import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { type: 'characters', id: 1, name: 'Luke Skywalker' },
  { type: 'characters', id: 4, name: 'Darth Vader' },
  { type: 'characters', id: 13, name: 'Chewbacca' },
  { type: 'characters', id: 14, name: 'Han Solo' },
  { type: 'characters', id: 20, name: 'Yoda' },
  { type: 'planets', id: 1, name: 'Tatooine' },
  { type: 'planets', id: 4, name: 'Hoth' },
  { type: 'planets', id: 5, name: 'Dagobah' },
  { type: 'starships', id: 9, name: 'Death Star' },
  { type: 'starships', id: 10, name: 'Millennium Falcon' },
  { type: 'starships', id: 12, name: 'X-wing' },
  { type: 'films', id: 1, name: 'A New Hope' },
  { type: 'films', id: 2, name: 'The Empire Strikes Back' },
  { type: 'vehicles', id: 4, name: 'Sand Crawler' },
  { type: 'vehicles', id: 8, name: 'TIE/LN starfighter' },
  { type: 'species', id: 3, name: 'Wookiee' },
  { type: 'species', id: 2, name: 'Droid' },
  { type: 'species', id: 6, name: 'Yoda\'s species' },
];

const RandomExplorer = () => {
  const navigate = useNavigate();
  const [jumping, setJumping] = useState(false);

  const handleJump = () => {
    if (jumping) return;
    setJumping(true);
    
    // Jump sound effect (optional/conceptual)
    // const audio = new Audio('/hyperspace.mp3');
    // audio.play().catch(() => {});
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * destinations.length);
      const dest = destinations[randomIndex];
      navigate(`/${dest.type}/${dest.id}`);
      setJumping(false);
    }, 800); // simulate hyperdrive calculation time
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {jumping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 right-0 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-bold shadow-lg whitespace-nowrap flex items-center gap-2 border border-gray-700"
          >
            <Loader2 size={16} className="animate-spin text-yellow-500" /> Calculating Jump...
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleJump}
        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 p-4 rounded-full shadow-2xl transition-colors ring-4 ring-yellow-500/30"
        title="Hyperdrive Jump to Random Page!"
      >
        <Dices size={28} />
      </motion.button>
    </div>
  );
};

export default RandomExplorer;
