import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Users, Globe2, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPlanetById } from '../services/api';

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState(null);
  const [residents, setResidents] = useState([]);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPlanetById(id);
        setPlanet(data);

        // Fetch Residents
        if (data.residents && data.residents.length > 0) {
          const residentPromises = data.residents.slice(0, 5).map(url => fetch(url).then(res => res.json()));
          const residentData = await Promise.all(residentPromises);
          setResidents(residentData.map(r => ({
            name: r.name,
            id: r.url.split('/').filter(Boolean).pop()
          })));
        }

        // Fetch Films
        if (data.films && data.films.length > 0) {
          const filmsPromises = data.films.map(url => fetch(url).then(res => res.json()));
          const filmsData = await Promise.all(filmsPromises);
          setFilms(filmsData.map(f => ({
            name: f.title,
            id: f.url.split('/').filter(Boolean).pop()
          })));
        }

        const favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === id && fav.type === 'planet'));
      } catch {
        setError('An error occurred while loading planet details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlanetDetails();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.id === id && fav.type === 'planet'));
    } else {
      favorites.push({ id, name: planet.name, type: 'planet' });
    }
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-yellow-500" size={64} /></div>;
  if (error || !planet) {
    return <div className="text-red-500 text-center py-10 text-xl">{error || 'Planet not found.'}</div>;
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
          <h1 className="text-4xl font-black text-yellow-500 uppercase tracking-tighter">{planet.name}</h1>
          <button onClick={toggleFavorite} className={`p-3 rounded-full ${isFavorite ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400'}`}>
            <Star size={24} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2"><Globe2 size={20}/> Planet Information</h3>
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Climate:</span> <span className="font-medium capitalize text-right ml-4 text-gray-800 dark:text-gray-200">{planet.climate}</span></li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Terrain:</span> <span className="font-medium capitalize text-right ml-4 text-gray-800 dark:text-gray-200">{planet.terrain}</span></li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Diameter:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{planet.diameter} km</span></li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Gravity:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{planet.gravity}</span></li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Surface Water:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{planet.surface_water}%</span></li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Rotation Period:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{planet.rotation_period} hours</span></li>
              <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2"><span>Orbital Period:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{planet.orbital_period} days</span></li>
              <li className="flex justify-between pb-1"><span>Population:</span> <span className="font-medium text-gray-800 dark:text-gray-200">{planet.population}</span></li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2"><Users size={20} className="text-blue-500" /> Notable Residents</h3>
              {residents.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {residents.map(r => (
                    <Link key={r.id} to={`/characters/${r.id}`} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-sm">
                      {r.name}
                    </Link>
                  ))}
                </div>
              ) : <p className="text-gray-500">No registered residents found.</p>}
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold flex items-center gap-2 border-b pb-2"><Film size={20} className="text-indigo-500" /> Featured in Films</h3>
              {films.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {films.map(f => (
                    <Link key={f.id} to={`/films/${f.id}`} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-sm">
                      {f.name}
                    </Link>
                  ))}
                </div>
              ) : <p className="text-gray-500">Not featured in a specific film.</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanetDetail;