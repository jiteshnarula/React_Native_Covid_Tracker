import apiClient from './client';

const getListings = () => apiClient.get('/min/data.min.json');

export default {
  getListings,
};
