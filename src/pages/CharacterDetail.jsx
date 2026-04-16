import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Globe, Film, Dna, Car, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCharacterById } from '../services/api';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const charData = await getCharacterById(id);
        setCharacter(charData);

        // Fetch Homeworld
        if (charData.homeworld) {
          const hwResponse = await fetch(charData.homeworld);
          const hwData = await hwResponse.json();
          const hwId = charData.homeworld.split('/').filter(Boolean).pop();
          setHomeworld({ id: hwId, name: hwData.name });
        }

        // Fetch Films
        if (charData.films && charData.films.length > 0) {
          const p = charData.films.map(url => fetch(url).then(r => r.json()));
          const res = await Promise.all(p);
          setFilms(res.map(i => ({ id: i.url.split('/').filter(Boolean).pop(), name: i.title })));
        }

        // Fetch Species
        if (charData.species && charData.species.length > 0) {
          const p = charData.species.map(url => fetch(url).then(r => r.json()));
          const res = await Promise.all(p);
          setSpecies(res.map(i => ({ id: i.url.split('/').filter(Boolean).pop(), name: i.name })));
        }

        // Fetch Vehicles
        if (charData.vehicles && charData.vehicles.length > 0) {
          const p = charData.vehicles.map(url => fetch(url).then(r => r.json()));
          const res = await Promise.all(p);
          setVehicles(res.map(i => ({ id: i.url.split('/').filter(Boolean).pop(), name: i.name })));
        }

        // Fetch Starships
        if (charData.starships && charData.starships.length > 0) {
          const p = charData.starships.map(url => fetch(url).then(r => r.json()));
          const res = await Promise.all(p);
          setStarships(res.map(i => ({ id: i.url.split('/').filter(Boolean).pop(), name: i.name })));
        }

        const favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === id && fav.type === 'character'));

      } catch {
        setError('An error occurred while loading character details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.id === id && fav.type === 'character'));
    } else {
      favorites.push({ id, name: character.name, type: 'character' });
    }
    localStorage.setItem('starwars_favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="animate-spin text-yellow-500" size={64} />
      </div>
    );
  }

  if (error || !character) {
    return <div className="text-red-500 text-center py-10 text-xl">{error}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Go Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-8 md:p-12 space-y-8">
          
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {character.name}
            </h1>
            <button 
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-all duration-300 shadow-md ${
                isFavorite 
                  ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/30' 
                  : 'bg-gray-100 text-gray-400 dark:bg-gray-700 hover:text-yellow-500'
              }`}
              title="Add to Favorites"
            >
              <Star size={28} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl space-y-4"
            >
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 pb-2 flex items-center gap-2"><Globe size={20} className="text-blue-500"/> Physical Characteristics</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-600/50 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Birth Year:</span> 
                  <span className="font-medium">{character.birth_year}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-600/50 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Gender:</span> 
                  <span className="font-medium capitalize">{character.gender}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-600/50 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Height:</span> 
                  <span className="font-medium">{character.height} cm</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-600/50 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Mass:</span> 
                  <span className="font-medium">{character.mass} kg</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-600/50 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Hair Color:</span> 
                  <span className="font-medium capitalize">{character.hair_color}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-600/50 pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Eye Color:</span> 
                  <span className="font-medium capitalize">{character.eye_color}</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-gray-500 dark:text-gray-400">Skin Color:</span> 
                  <span className="font-medium capitalize">{character.skin_color}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl space-y-4 h-fit"
            >
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-600 pb-2 flex items-center gap-2"><Globe size={20} className="text-green-500"/> Origin & Species</h2>
              
              <div className="space-y-4">
                {homeworld && (
                   <Link 
                     to={`/planets/${homeworld.id}`}
                     className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                   >
                     <Globe size={20} />
                     <span className="font-bold">{homeworld.name}</span>
                   </Link>
                )}
                {species.length > 0 ? (
                  species.map(s => (
                    <Link 
                      key={s.id}
                      to={`/species/${s.id}`}
                      className="flex items-center gap-3 p-3 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors"
                    >
                      <Dna size={20} />
                      <span className="font-bold">{s.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg">
                    <Dna size={20} />
                    <span>Human / Unknown</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Extended Relational Data */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl space-y-6 shadow-inner"
            >
              {/* Films */}
              {films.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold border-b dark:border-gray-700 pb-2 flex items-center gap-2"><Film size={18} className="text-indigo-500"/> Featured in Films</h3>
                  <div className="flex flex-wrap gap-2">
                    {films.map(f => (
                      <Link key={f.id} to={`/films/${f.id}`} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium hover:scale-105 transition-all shadow-sm">
                        {f.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicles */}
              {vehicles.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold border-b dark:border-gray-700 pb-2 flex items-center gap-2"><Car size={18} className="text-purple-500"/> Driven Vehicles</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicles.map(v => (
                      <Link key={v.id} to={`/vehicles/${v.id}`} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium hover:scale-105 transition-all shadow-sm">
                        {v.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Starships */}
              {starships.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold border-b dark:border-gray-700 pb-2 flex items-center gap-2"><Rocket size={18} className="text-red-500"/> Piloted Starships</h3>
                  <div className="flex flex-wrap gap-2">
                    {starships.map(s => (
                      <Link key={s.id} to={`/starships/${s.id}`} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-medium hover:scale-105 transition-all shadow-sm">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterDetail;