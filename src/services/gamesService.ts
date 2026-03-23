import axios from 'axios';

export const fetchGamesService = async (search: string = '') => {
  const response = await axios.get(`/api/games?search=${search}`);
  return response.data.results;
};