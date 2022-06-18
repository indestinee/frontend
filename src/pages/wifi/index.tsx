import wifiJson from '../../config/wifi.json';
import './index.css';
import QRCode from 'qrcode.react';
import {FaKey, FaWifi} from 'react-icons/fa';
import {Accordion} from 'react-bootstrap';

export default function Wifi() {
  return (
    <Accordion defaultActiveKey="0">
      {
        Object.entries(wifiJson).map(
            ([k, v], index) => (
              <Accordion.Item eventKey={`${index}`} key={k}>
                <Accordion.Header>{k}</Accordion.Header>
                <Accordion.Body style={{padding: '24px'}}>
                  <div className="wifi">
                    <p><FaWifi size={30}/>{'  '}{k}</p>
                    <p><FaKey size={30}/>{'  '}{v}</p>
                    <br />
                    <QRCode
                      size={384}
                      value={`WIFI:T:WPA;S:${k};P:${v};;`}
                      renderAs="canvas" />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))
      }
    </Accordion>
  );
}
