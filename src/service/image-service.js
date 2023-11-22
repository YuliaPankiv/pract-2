import axios from 'axios';

const API_KEY = 'Uq3Al26bO62nqZfwo8Gh6ITxA6ezFW18xdLe9XFexPEVtuQ2ts1a7OwX';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  return data;
};
