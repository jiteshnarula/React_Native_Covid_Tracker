import { create } from 'apisauce';

const apiClient = create({
  baseURL: 'https://api.covid19india.org/v4',
});

export default apiClient;
