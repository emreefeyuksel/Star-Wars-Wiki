import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Rocket, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStarshipById } from '../services/api';

const StarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchShip = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStarshipById(id);
        setShip(data);
        const favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === id && fav.type === 'starship'));
      } catch {
        setError('An error occurred while loading starship details.');
      }
      finally { setLoading(false); }
    };
    fetchShip();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.id === id && fav.type === 'starship'));
    } else {
      favorites.push({ id, name: ship.name, type: 'starship' });
    }
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-yellow-500" size={64} /></div>;
  if (error || !ship) {
    return <div className="text-red-500 text-center py-10 text-xl">{error || 'Starship not found.'}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-yellow-500"><ArrowLeft size={20} /> Go Back</button>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{ship.starship_class}</span>
            <h1 className="text-4xl font-black">{ship.name}</h1>
          </div>
          <button onClick={toggleFavorite} className={`p-3 rounded-full ${isFavorite ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400'}`}>
            <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-4"
          >
            <h2 className="font-bold flex items-center gap-2 border-b pb-2"><Rocket size={18}/> Technical Specifications</h2>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Model:</span> <span className="font-medium text-right ml-4">{ship.model}</span></p>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Length:</span> <span className="font-medium flex-shrink-0">{ship.length} m</span></p>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Crew:</span> <span className="font-medium">{ship.crew}</span></p>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Passenger Capacity:</span> <span className="font-medium">{ship.passengers}</span></p>
            <p className="flex justify-between text-sm pb-1"><span>Cost (Credits):</span> <span className="font-medium text-yellow-600 dark:text-yellow-500">{ship.cost_in_credits === "unknown" ? "Unknown" : parseInt(ship.cost_in_credits).toLocaleString("en-US")}</span></p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-4"
          >
            <h2 className="font-bold flex items-center gap-2 border-b pb-2"><ShieldCheck size={18}/> Performance</h2>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>MGLT:</span> <span className="font-medium">{ship.MGLT}</span></p>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Hyperdrive Rating:</span> <span className="font-medium">{ship.hyperdrive_rating}</span></p>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Cargo Capacity:</span> <span className="font-medium flex-shrink-0">{ship.cargo_capacity} kg</span></p>
            <p className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Max Atmosphering Speed:</span> <span className="font-medium">{ship.max_atmosphering_speed}</span></p>
            <p className="flex justify-between text-sm pb-1"><span>Max Consumables Duration:</span> <span className="font-medium">{ship.consumables}</span></p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StarshipDetail;