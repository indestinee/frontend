import React, {useEffect} from 'react';
import ProgressBar from '../../progressBar';
import './index.css';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import {fetchTemperature} from '../../../api/temperature';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setTemperatures} from '../../../redux/dashboardSlice';

export default function Temperature() {
  const dispatcher = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const dashboard = useSelector(
      (state: RootState) => state.dashboard);

  const refreshTemperatures = () => {
    fetchTemperature(auth.authKey).then(
        (rsp) => dispatcher(setTemperatures(rsp.temperatures)));
  };

  useEffect(() => {
    refreshTemperatures();
    const interval = setInterval(refreshTemperatures, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h5><FaTemperatureLow />{' '}Temperatures</h5>
      {
        dashboard.temperatures.map((val, index) => (
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
