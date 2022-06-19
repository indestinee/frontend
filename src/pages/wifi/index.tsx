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
                    <p><FaWifi size={24}/>{'  '}{k}</p>
                    <p><FaKey size={24}/>{'  '}{v}</p>
                    <br />
                    <QRCode
                      height="auto"
                      width="auto"
                      style={{maxWidth: '400px'}}
                      value={`WIFI:T:WPA;S:${k};P:${v};;`}
                      renderAs="svg" />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))
      }
    </Accordion>
  );
}
