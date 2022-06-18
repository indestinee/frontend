import React, {useEffect} from 'react';
import ProgressBar from '../../progressBar';
import './index.css';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import {fetchTemperature} from '../../../api/temperature';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export default function Temperature() {
  const temperatures = useSelector(
      (state: RootState) => state.dashboard.temperatures);

  useEffect(() => {
    fetchTemperature();
    setInterval(fetchTemperature, 2000);
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
