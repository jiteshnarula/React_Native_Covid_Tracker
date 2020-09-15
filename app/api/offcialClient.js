import { create } from 'apisauce';

const apiOffcialClient = create({
  baseURL: 'https://api.rootnet.in/covid19-in',
});

export default apiOffcialClient;
