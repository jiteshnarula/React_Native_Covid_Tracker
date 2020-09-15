import apiOffcialClient from './offcialClient';

const getOfficialListings = () =>
  apiOffcialClient.get('/stats/latest');
const getOfficialHistoryListings = () =>
  apiOffcialClient.get('/stats/history');
const getContactsListing = () => apiOffcialClient.get('/contacts');
export {
  getOfficialListings,
  getOfficialHistoryListings,
  getContactsListing,
};
