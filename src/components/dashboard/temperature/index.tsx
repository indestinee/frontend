import React, {useEffect, useState} from 'react';
import ProgressBar from '../../progressBar';
import './index.css';

export default function Temperature() {
  const [temperatures, setTemperatures] = useState<number[]>([]);

  const fetchTemperature = () => {
    fetch('/temperature')
        .then((res) => res.json())
        .then(
            (result) => {
              setTemperatures(result.data);
            },
            (error) => {
              const result = {'data': [10, 20, 55, 60, 65, 66, 73]};
              setTemperatures(result.data);
            },
        );
  };

  useEffect(() => {
    fetchTemperature();
    setInterval(fetchTemperature, 2000);
  }, []);

  return (
    <>
      <h2>Temperatures</h2>
      {
        temperatures.map((val, index) => (
          <div key={index} className='process-bar-block'>
            <span>Sensor#{index}</span>&nbsp;
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
