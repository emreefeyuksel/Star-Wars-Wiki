import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Car, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVehicleById } from '../services/api';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
        const favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === id && fav.type === 'vehicle'));
      } catch {
        setError('An error occurred while loading vehicle details.');
      }
      finally { setLoading(false); }
    };
    fetchVehicle();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.id === id && fav.type === 'vehicle'));
    } else {
      favorites.push({ id, name: vehicle.name, type: 'vehicle' });
    }
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-yellow-500" size={64} /></div>;
  if (error || !vehicle) {
    return <div className="text-red-500 text-center py-10 text-xl">{error || 'Vehicle not found.'}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors"><ArrowLeft size={20} /> Go Back</button>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">{vehicle.vehicle_class}</span>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">{vehicle.name}</h1>
          </div>
          <button onClick={toggleFavorite} className={`p-3 rounded-full transition-all ${isFavorite ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400 hover:text-yellow-500'}`}>
            <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-4 shadow-inner"
          >
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200"><Car size={20} className="text-purple-500"/> Technical Specifications</h2>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Model:</span> <span className="font-medium text-right ml-4 text-gray-800 dark:text-gray-200">{vehicle.model}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Manufacturer:</span> <span className="font-medium text-right ml-4 text-gray-800 dark:text-gray-200">{vehicle.manufacturer}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Length:</span> <span className="font-medium flex-shrink-0 text-gray-800 dark:text-gray-200">{vehicle.length} m</span></li>
              <li className="flex justify-between text-sm pb-1"><span className="text-gray-500 dark:text-gray-400">Cost (Credits):</span> <span className="font-medium text-yellow-600 dark:text-yellow-500">{vehicle.cost_in_credits === "unknown" ? "Unknown" : parseInt(vehicle.cost_in_credits).toLocaleString("en-US")}</span></li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-4 shadow-inner"
          >
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200"><ShieldCheck size={20} className="text-blue-500"/> Performance & Crew</h2>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Crew:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{vehicle.crew}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Passenger Capacity:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{vehicle.passengers}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Cargo Capacity:</span> <span className="font-medium flex-shrink-0 text-gray-800 dark:text-gray-200">{vehicle.cargo_capacity} kg</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Max Atmosphering Speed:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{vehicle.max_atmosphering_speed}</span></li>
              <li className="flex justify-between text-sm pb-1"><span className="text-gray-500 dark:text-gray-400">Max Consumables Duration:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{vehicle.consumables}</span></li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleDetail;
