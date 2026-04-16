import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFilms } from '../services/api';

const Films = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFilms(page, searchTerm);
        setFilms(data.results);
        setTotalPages(Math.ceil(data.count / 10)); 
      } catch {
        setError('An error occurred while loading films. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
          <Film className="text-yellow-500" size={36} /> Films
        </h1>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-sm"
            placeholder="Search films (e.g., A New Hope)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); 
            }}
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!loading && !error && films.length === 0 && (
        <p className="text-center text-gray-500 text-xl py-10">No films found matching your criteria.</p>
      )}

      {!loading && !error && films.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film, index) => {
            const id = film.url.split('/').filter(Boolean).pop();
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={id}
              >
                <Link 
                  to={`/films/${id}`} 
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full"
                >
                  <div className="p-6 space-y-3 h-full flex flex-col">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {film.title}
                      </h2>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded dark:bg-yellow-900/30 dark:text-yellow-500 ml-2 shrink-0">
                        Episode {film.episode_id}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                      {film.opening_crawl}
                    </p>
                    
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 mt-auto">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Director: <span className="font-medium text-gray-700 dark:text-gray-300">{film.director}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Release Date: <span className="font-medium text-gray-700 dark:text-gray-300">{new Date(film.release_date).toLocaleDateString("en-US")}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Films;
