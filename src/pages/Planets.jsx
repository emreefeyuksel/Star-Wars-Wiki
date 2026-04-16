import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPlanets } from '../services/api';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
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
        const data = await getPlanets(page, searchTerm);
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch {
        setError('An error occurred while loading planets. Please try again.');
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
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Globe className="text-green-500" size={36} /> Planets
        </h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
            placeholder="Search planets..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-yellow-500" size={48} /></div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : planets.length === 0 ? (
        <p className="text-center text-gray-500 text-xl py-10">No planets found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {planets.map((planet, index) => {
            const id = planet.url.split('/').filter(Boolean).pop();
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={id}
              >
                <Link to={`/planets/${id}`} className="block h-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border dark:border-gray-700">
                  <Globe className="text-green-500 mb-4" size={32} />
                  <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white truncate">{planet.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Climate: <span className="text-gray-700 dark:text-gray-300 truncate inline-block max-w-[150px] align-bottom capitalize">{planet.climate}</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Terrain: <span className="text-gray-700 dark:text-gray-300 truncate inline-block max-w-[150px] align-bottom capitalize">{planet.terrain}</span></p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Sayfalama */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-8">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">Previous</button>
          <span className="font-medium text-gray-700 dark:text-gray-300">Page {page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">Next</button>
        </div>
      )}
    </motion.div>
  );
};

export default Planets;