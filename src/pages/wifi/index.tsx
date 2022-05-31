import wifiJson from './wifi.json';
import './index.css';
import QRCode from 'qrcode.react';

export default function Wifi() {
  return (
    <div>
      {
        Object.entries(wifiJson).map(
            ([k, v]) => (
              <div className="wifi" key={k}>
                <p>SSID: {k}</p>
                <p>PASSWORD: {v}</p>
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
