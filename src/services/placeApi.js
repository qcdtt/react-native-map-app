import apisauce from 'apisauce';
// import { API_KEY } from './apiKey';

const create = (baseURL = 'https://63025017c6dda4f287b79680.mockapi.io/places/') => {
// const create = (baseURL = 'http://maps.googleapis.com/maps/api/place/autocomplete/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000,
  });

  const setAuthToken = userAuth => api.setHeader('X-Auth-Token', userAuth);
  const setLanguage = () => api.setHeader('Accept-Language', 'id');
  const removeAuthToken = () => api.setHeader('Authorization', '');

  const getPlaces = async() => await api.get('/');
  // const getPlaces = async(input) => await api.get('/json?input=' + input + '&key=' + API_KEY);

  return {
    api,
    setAuthToken,
    setLanguage,
    removeAuthToken,
    getPlaces,
  };
};

export default create();