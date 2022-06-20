import {
  getRandomTemperatureResponse,
  TemperatureResponse,
} from '../schemas/temperature';
import {getHeaders} from './common';


export const fetchTemperature = async (authKey: string) => {
  const rsp = await fetch(
    '/temperature',
    {
      method: 'GET',
      headers: getHeaders(authKey),
    });
  return rsp.json()
    .then(
      (rsp) => rsp as TemperatureResponse,
      (error) => getRandomTemperatureResponse(),
    );
};
