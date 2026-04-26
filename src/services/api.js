const BASE_URL = 'https://swapi.py4e.com/api';

const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - Data could not be fetched`);
    }
    return await response.json();
  } catch (error) {
    console.error("SWAPI Fetch Error:", error);
    throw error;
  }
};

export const getCharacters = (page = 1, searchQuery = '') => {
  const query = searchQuery ? `&search=${searchQuery}` : '';
  return fetchAPI(`/people/?page=${page}${query}`);
};

export const getCharacterById = (id) => fetchAPI(`/people/${id}/`);

export const getPlanets = (page = 1, searchQuery = '') => {
  const query = searchQuery ? `&search=${searchQuery}` : '';
  return fetchAPI(`/planets/?page=${page}${query}`);
};

export const getPlanetById = (id) => fetchAPI(`/planets/${id}/`);

export const getStarships = (page = 1, searchQuery = '') => {
  const query = searchQuery ? `&search=${searchQuery}` : '';
  return fetchAPI(`/starships/?page=${page}${query}`);
};

export const getStarshipById = (id) => fetchAPI(`/starships/${id}/`);

export const getFilms = (page = 1, searchQuery = '') => {
  // SWAPI films search endpoint supports searching by title
  const query = searchQuery ? `&search=${searchQuery}` : '';
  return fetchAPI(`/films/?page=${page}${query}`);
};

export const getFilmById = (id) => fetchAPI(`/films/${id}/`);

export const getVehicles = (page = 1, searchQuery = '') => {
  const query = searchQuery ? `&search=${searchQuery}` : '';
  return fetchAPI(`/vehicles/?page=${page}${query}`);
};

export const getVehicleById = (id) => fetchAPI(`/vehicles/${id}/`);

export const getSpecies = (page = 1, searchQuery = '') => {
  const query = searchQuery ? `&search=${searchQuery}` : '';
  return fetchAPI(`/species/?page=${page}${query}`);
};

export const getSpeciesById = (id) => fetchAPI(`/species/${id}/`);