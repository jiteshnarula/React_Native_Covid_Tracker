import apiClient from './client';

const getListings = () => apiClient.get('/data.json');

export default {
  getListings,
};
