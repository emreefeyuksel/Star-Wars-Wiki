import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Star, Film, Calendar, Clapperboard, AlignLeft, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFilmById } from '../services/api';

const FilmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const filmData = await getFilmById(id);
        setFilm(filmData);

        // İlişkisel Veri: Filmdeki karakterleri (ilk 5 tanesini) çek
        if (filmData.characters && filmData.characters.length > 0) {
          const charPromises = filmData.characters.slice(0, 5).map(url => fetch(url).then(res => res.json()));
          const charData = await Promise.all(charPromises);
          setCharacters(charData.map(c => ({
            name: c.name,
            id: c.url.split('/').filter(Boolean).pop()
          })));
        }

        const favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
        const isFav = favorites.some(fav => fav.id === id && fav.type === 'film');
        setIsFavorite(isFav);

      } catch {
        setError('An error occurred while loading film details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('starwars_favorites') || '[]');
    
    if (isFavorite) {
      favorites = favorites.filter(fav => !(fav.id === id && fav.type === 'film'));
    } else {
      favorites.push({ id, name: film.title, type: 'film' });
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

  if (error || !film) {
    return <div className="text-red-500 text-center py-10 text-xl">{error || 'Film not found.'}</div>;
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
            <div>
              <span className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-2 block">
                Episode {film.episode_id}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 leading-tight">
                {film.title}
              </h1>
            </div>
            
            <button 
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition-all duration-300 shadow-md transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/40' 
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
              className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl space-y-4 shadow-inner"
            >
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                <Clapperboard size={20} className="text-indigo-500" /> Production Information
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Director:</span> 
                  <span className="font-medium text-right ml-4 text-gray-800 dark:text-gray-200">{film.director}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 dark:border-gray-700/50 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Producer:</span> 
                  <span className="font-medium text-right ml-4 text-gray-800 dark:text-gray-200">{film.producer}</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Calendar size={18}/> Release Date:</span> 
                  <span className="font-medium text-gray-800 dark:text-gray-200">{new Date(film.release_date).toLocaleDateString("en-US")}</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl space-y-4 shadow-inner"
            >
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                <AlignLeft size={20} className="text-yellow-500" /> Opening Crawl
              </h2>
              <p className="text-gray-700 dark:text-gray-300 italic whitespace-pre-line leading-relaxed text-sm md:text-base font-serif">
                "{film.opening_crawl}"
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl space-y-4 shadow-inner"
            >
              <h2 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 flex items-center gap-2">
                <Users size={20} className="text-blue-500" /> Notable Characters
              </h2>
              {characters.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {characters.map(c => (
                    <Link key={c.id} to={`/characters/${c.id}`} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all shadow-sm">
                      {c.name}
                    </Link>
                  ))}
                </div>
              ) : <p className="text-gray-500">Loading characters...</p>}
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilmDetail;
