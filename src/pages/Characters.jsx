import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCharacters } from '../services/api';

const Characters = () => {
  // State (Durum) Yönetimleri
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Arama ve Sayfalama State'leri
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Veri Çekme ve Debounce (Arama Geciktirmesi) Mantığı
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters(page, searchTerm);
        setCharacters(data.results);
        // SWAPI her sayfada 10 sonuç döndürür, toplam sayfa sayısını hesaplıyoruz
        setTotalPages(Math.ceil(data.count / 10)); 
      } catch {
        setError('An error occurred while loading characters. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce: Kullanıcı yazmayı bıraktıktan 500ms sonra API'ye istek at
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    // Temizleme fonksiyonu (kullanıcı 500ms dolmadan yeni harf yazarsa sayacı sıfırlar)
    return () => clearTimeout(delayDebounceFn);
  }, [page, searchTerm]); // page veya searchTerm değiştiğinde bu effect tetiklenir

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Characters</h1>
        
        {/* Arama Çubuğu */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
            placeholder="Search characters (e.g., Luke Skywalker)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Yeni arama yapıldığında ilk sayfaya dön
            }}
          />
        </div>
      </div>

      {/* Yükleniyor Durumu */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-yellow-500" size={48} />
        </div>
      )}

      {/* Hata Durumu */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Karakter Listesi Grid Yapısı */}
      {!loading && !error && characters.length === 0 && (
        <p className="text-center text-gray-500 text-xl py-10">No characters found matching your criteria.</p>
      )}

      {!loading && !error && characters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character, index) => {
            // SWAPI id'yi URL'nin içinde gönderiyor, onu parçalayıp alıyoruz (Örn: ".../people/1/")
            const id = character.url.split('/').filter(Boolean).pop();
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={id}
              >
                <Link 
                  to={`/characters/${id}`} 
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full"
                >
                  <div className="p-6 space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                      {character.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gender: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{character.gender}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Birth Year: <span className="font-medium text-gray-700 dark:text-gray-300">{character.birth_year}</span>
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Sayfalama (Pagination) */}
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

export default Characters;