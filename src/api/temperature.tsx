import {useDispatch} from 'react-redux';
import {setTemperatures} from '../redux/dashboard';
import {
  TemperatureResponse,
  exampleTemperatureResponse,
} from '../schemas/temperature';
import {getHeaders} from './common';


export const fetchTemperature = async () => {
  const dispatcher = useDispatch();
  const rsp = await fetch(
      '/temperature',
      {
        method: 'GET',
        headers: getHeaders(),
      });
  return rsp.json()
      .then(
          (rsp) => rsp.data as TemperatureResponse,
          (error) => exampleTemperatureResponse,
      ).then((rsp) => dispatcher(setTemperatures(rsp.temperatues)));
};
