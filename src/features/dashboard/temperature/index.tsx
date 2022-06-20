import React, {useEffect} from 'react';
import ProgressBar from '../../progressBar';
import './index.css';
import {FaTemperatureHigh, FaTemperatureLow} from 'react-icons/fa';
import {fetchTemperature} from '../../../api/temperature';
import {RootState} from '../../../redux/store';
import {setTemperatures} from '../../../redux/dashboardSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';

export const Temperature = () => {
  const dispatch = useAppDispatch();

  const dashboard = useAppSelector((state: RootState) => state.dashboard);
  const {authKey}= useAppSelector((state: RootState) => state.auth);

  const refreshTemperatures = (authKey: string) => {
    fetchTemperature(authKey).then(
      (rsp) => dispatch(setTemperatures(rsp.temperatures)));
  };

  useEffect(() => {
    refreshTemperatures(authKey);
    const interval = setInterval(() => refreshTemperatures(authKey), 2000);
    return () => clearInterval(interval);
  }, [authKey]);

  return (
    <>
      <h5><FaTemperatureLow />{' '}Temperatures</h5>
      {
        dashboard.temperatures.map((val: number, index: number) => (
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
};
