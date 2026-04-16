import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Globe, Rocket, Star, Moon, Sun, Menu, X, Film, Car, Dna } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Films', path: '/films', icon: Film },
    { name: 'Characters', path: '/characters', icon: Users },
    { name: 'Planets', path: '/planets', icon: Globe },
    { name: 'Starships', path: '/starships', icon: Rocket },
    { name: 'Vehicles', path: '/vehicles', icon: Car },
    { name: 'Species', path: '/species', icon: Dna },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 shadow-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all flex items-center gap-2">
            STAR WARS<span className="hidden sm:inline"> WIKI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`flex items-center gap-2 font-medium transition-colors hover:text-yellow-500 ${isActive ? 'text-yellow-500' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  <Icon size={20} /> {link.name}
                </Link>
              );
            })}
            
            <Link 
              to="/favorites" 
              className={`flex items-center gap-2 font-medium transition-colors hover:text-red-400 ${location.pathname.startsWith('/favorites') ? 'text-red-500' : 'text-red-400/70 dark:text-red-500/70'}`}
            >
              <Star size={20} fill={location.pathname.startsWith('/favorites') ? "currentColor" : "none"} className={location.pathname.startsWith('/favorites') ? "text-red-500" : "text-red-400/70"} /> Favorites
            </Link>

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:ring-2 ring-yellow-500 transition-all text-gray-700 dark:text-yellow-500"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-500 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-white transition-all hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium ${isActive ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
                  >
                    <Icon size={22} /> {link.name}
                  </Link>
                );
              })}
              <Link 
                to="/favorites" 
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors font-medium ${location.pathname.startsWith('/favorites') ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500'}`}
              >
                <Star size={22} fill={location.pathname.startsWith('/favorites') ? "currentColor" : "none"} /> Favorites
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;