import React, {useEffect} from 'react';
import ProgressBar from '../../progressBar';
import './index.css';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import {fetchTemperature} from '../../../api/temperature';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setTemperatures} from '../../../redux/dashboard';

export default function Temperature() {
  const dispatcher = useDispatch();
  const authKey = useSelector((state: RootState) => state.auth.authKey);
  const temperatures = useSelector(
      (state: RootState) => state.dashboard.temperatures);

  const refreshTemperatures = () => {
    fetchTemperature(authKey).then(
        (rsp) => dispatcher(setTemperatures(rsp.temperatues)));
  };

  useEffect(() => {
    refreshTemperatures();
    setInterval(refreshTemperatures, 2000);
  }, []);

  return (
    <>
      <h5><FaTemperatureLow />{' '}Temperatures</h5>
      {
        temperatures.map((val, index) => (
          <div key={index} className='process-bar-block'>
            <span><FaTemperatureHigh/></span>&nbsp;
            <ProgressBar
              value={val}
              minValue={0}
              maxValue={100}
              greenThreshold={{min: 0, max: 63}}
              yellowThreshold={{min: 63, max: 68}}
              redThreshold={{min: 68, max: 100}} />
          </div>
        ))
      }
    </>
  );
}
