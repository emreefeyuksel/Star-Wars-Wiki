import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Favorites = () => {
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('starwars_favorites') || '[]')
  );
  const [activeTab, setActiveTab] = useState('all');

  const removeFavorite = (id, type) => {
    const updated = favorites.filter(fav => !(fav.id === id && fav.type === type));
    localStorage.setItem('starwars_favorites', JSON.stringify(updated));
    setFavorites(updated);
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'film', label: 'Films' },
    { id: 'character', label: 'Characters' },
    { id: 'planet', label: 'Planets' },
    { id: 'starship', label: 'Starships' },
    { id: 'vehicle', label: 'Vehicles' },
    { id: 'species', label: 'Species' }
  ];

  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === activeTab);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Star className="text-yellow-500" fill="currentColor" size={36} /> My Favorites
        </h1>
        
        {/* Kategori Filtreleme Sekmeleri */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl shadow-sm text-sm overflow-x-auto w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-gray-700 shadow-sm rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700"
        >
          <p className="text-xl text-gray-500">You haven't added any favorites yet.</p>
          <Link to="/characters" className="text-yellow-500 hover:underline mt-4 inline-block">Start exploring!</Link>
        </motion.div>
      ) : filteredFavorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 text-lg">No favorites found in this category.</p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFavorites.map((fav) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                key={`${fav.type}-${fav.id}`} 
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <Link to={`/${fav.type === 'film' ? 'films' : fav.type === 'character' ? 'characters' : fav.type === 'planet' ? 'planets' : fav.type === 'starship' ? 'starships' : fav.type === 'vehicle' ? 'vehicles' : 'species'}/${fav.id}`} className="flex-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">{fav.type}</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-yellow-500 transition-colors">{fav.name}</h2>
                </Link>
                <button 
                  onClick={() => removeFavorite(fav.id, fav.type)} 
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-colors ml-4"
                  title="Remove from Favorites"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Favorites;