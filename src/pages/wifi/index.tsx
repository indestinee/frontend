import wifiJson from './wifi.json';
import './index.css';
import QRCode from 'qrcode.react';
import {FaKey, FaWifi} from 'react-icons/fa';

export default function Wifi() {
  return (
    <div>
      {
        Object.entries(wifiJson).map(
            ([k, v]) => (
              <div className="wifi" key={k}>
                <p><FaWifi size={30}/>{'  '}{k}</p>
                <p><FaKey size={30}/>{'  '}{v}</p>
                <QRCode
                  size={384}
                  value={`WIFI:T:WPA;S:${k};P:${v};;`}
                  renderAs="canvas" />,
              </div>
            ))
      }
    </div>
  );
}
