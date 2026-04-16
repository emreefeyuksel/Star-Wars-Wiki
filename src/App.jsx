import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Planets from './pages/Planets';
import PlanetDetail from './pages/PlanetDetail';
import Starships from './pages/Starships';
import StarshipDetail from './pages/StarshipDetail';
import Vehicles from './pages/Vehicles';
import VehicleDetail from './pages/VehicleDetail';
import Species from './pages/Species';
import SpeciesDetail from './pages/SpeciesDetail';
import Favorites from './pages/Favorites';
import Starfield from './components/Starfield';
import RandomExplorer from './components/RandomExplorer';

function App() {
  return (
    <Router>
      <Starfield />
      <div className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/films/:id" element={<FilmDetail />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planets/:id" element={<PlanetDetail />} />
            <Route path="/starships" element={<Starships />} />
            <Route path="/starships/:id" element={<StarshipDetail />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
            <Route path="/species" element={<Species />} />
            <Route path="/species/:id" element={<SpeciesDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <RandomExplorer />
      </div>
    </Router>
  );
}

export default App;