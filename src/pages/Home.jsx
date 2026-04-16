import { Link } from 'react-router-dom';
import { Users, Globe, Rocket, Film, Car, Dna } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[75vh] text-center space-y-12"
    >
      
      {/* Hero Bölümü (Başlık ve Açıklama) */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-sm">
          GALAXY WIKI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Welcome to a galaxy far, far away. Start exploring the characters, 
          planets, and legendary starships of the Star Wars universe.
        </p>
      </div>

      {/* Hızlı Erişim Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        
        {/* Filmler Kartı */}
        <Link to="/films" className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full group-hover:scale-110 transition-transform">
            <Film size={40} />
          </div>
          <h2 className="text-2xl font-bold">Films</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Discover all episodes and production details of the legendary series.
          </p>
        </Link>
        
        {/* Karakterler Kartı */}
        <Link to="/characters" className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
            <Users size={40} />
          </div>
          <h2 className="text-2xl font-bold">Characters</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Examine all inhabitants of the universe, from Jedi knights to Sith lords.
          </p>
        </Link>

        {/* Gezegenler Kartı */}
        <Link to="/planets" className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full group-hover:scale-110 transition-transform">
            <Globe size={40} />
          </div>
          <h2 className="text-2xl font-bold">Planets</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Discover all systems from the deserts of Tatooine to the glaciers of Hoth.
          </p>
        </Link>

        {/* Gemiler Kartı */}
        <Link to="/starships" className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full group-hover:scale-110 transition-transform">
            <Rocket size={40} />
          </div>
          <h2 className="text-2xl font-bold">Starships</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Delve into the details of legendary vehicles from the Millennium Falcon to Star Destroyers.
          </p>
        </Link>

        {/* Araçlar Kartı */}
        <Link to="/vehicles" className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full group-hover:scale-110 transition-transform">
            <Car size={40} />
          </div>
          <h2 className="text-2xl font-bold">Vehicles</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Explore atmospheric crafts, from sleek speeders to heavy ground assault machines.
          </p>
        </Link>

        {/* Türler Kartı */}
        <Link to="/species" className="group p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full group-hover:scale-110 transition-transform">
            <Dna size={40} />
          </div>
          <h2 className="text-2xl font-bold">Species</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Study the biology and origins of the vast sentient species across the galaxy.
          </p>
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;