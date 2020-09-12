import apiOffcialClient from './offcialClient';

const getOfficialListings = () => apiOffcialClient.get('/latest');
const getOfficialHistoryListings = () =>
  apiOffcialClient.get('/history');

export { getOfficialListings, getOfficialHistoryListings };
