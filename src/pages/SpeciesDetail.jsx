import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Dna, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSpeciesById } from '../services/api';

const SpeciesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [species, setSpecies] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSpeciesById(id);
        setSpecies(data);
        
        // İlişkisel Veri: Ana Gezegen
        if (data.homeworld) {
          const hwResponse = await fetch(data.homeworld);
          const hwData = await hwResponse.json();
          const hwId = data.homeworld.split('/').filter(Boolean).pop();
          setHomeworld({ id: hwId, name: hwData.name });
        }

        const favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === id && fav.type === 'species'));
      } catch {
        setError('An error occurred while loading species details.');
      } finally {
        setLoading(false);
      }
    };
    fetchSpecies();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.id === id && fav.type === 'species'));
    } else {
      favorites.push({ id, name: species.name, type: 'species' });
    }
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-yellow-500" size={64} /></div>;
  if (error || !species) {
    return <div className="text-red-500 text-center py-10 text-xl">{error || 'Species not found.'}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors"><ArrowLeft size={20} /> Go Back</button>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border dark:border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xs font-bold text-teal-500 uppercase tracking-widest">{species.classification}</span>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white capitalize">{species.name}</h1>
          </div>
          <button onClick={toggleFavorite} className={`p-3 rounded-full transition-all ${isFavorite ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400 hover:text-yellow-500'}`}>
            <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-4 shadow-inner"
          >
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200"><Dna size={20} className="text-teal-500"/> Biological Info</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Designation:</span> <span className="font-medium capitalize text-right ml-4 text-gray-800 dark:text-gray-200">{species.designation}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Average Height:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{species.average_height} cm</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Average Lifespan:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{species.average_lifespan} years</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Eye Colors:</span> <span className="font-medium text-gray-800 dark:text-gray-200 text-right capitalize">{species.eye_colors}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Hair Colors:</span> <span className="font-medium text-gray-800 dark:text-gray-200 text-right capitalize">{species.hair_colors}</span></li>
              <li className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700/50 pb-2"><span className="text-gray-500 dark:text-gray-400">Skin Colors:</span> <span className="font-medium text-gray-800 dark:text-gray-200 text-right capitalize">{species.skin_colors}</span></li>
              <li className="flex justify-between text-sm pb-1"><span className="text-gray-500 dark:text-gray-400">Language:</span> <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">{species.language}</span></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-4 shadow-inner h-fit"
          >
            <h3 className="text-xl font-bold flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 text-gray-800 dark:text-gray-200"><Globe size={20} className="text-green-500"/> Origin</h3>
            {homeworld ? (
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Homeworld:</p>
                <Link 
                  to={`/planets/${homeworld.id}`}
                  className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors shadow-sm"
                >
                  <Globe size={24} />
                  <span className="text-xl font-bold">{homeworld.name}</span>
                </Link>
                <p className="text-xs text-gray-400 dark:text-gray-500">Click to view planet details.</p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No specific homeworld recorded or data is loading.</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeciesDetail;
