import QRCode from 'qrcode.react';
import {FaKey, FaWifi} from 'react-icons/fa';
import {Accordion} from 'react-bootstrap';
import {useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {hmacSha256} from '../../utils/cipher/hash';
import {Buffer} from 'buffer';
import wifiJson from '../../config/wifi.json';
import './index.css';

export default function Wifi() {
  const {authKey} = useAppSelector((state: RootState) => state.auth);
  return (
    <Accordion defaultActiveKey="0">
      {
        wifiJson.map(
          (wifi, index) => {
            const {name, isGuest} = wifi;
            const rawPassword = Buffer.from(hmacSha256(name, authKey), 'hex')
              .toString('base64');
            const password = isGuest ?
              rawPassword.substring(0, 16) :
              rawPassword;
            return (
              <Accordion.Item eventKey={index.toString()} key={name}>
                <Accordion.Header>{name}</Accordion.Header>
                <Accordion.Body style={{padding: '24px'}}>
                  <div className="wifi">
                    <p className="p-break"><FaWifi size={24}/>{'  '}{name}</p>
                    <p className="p-break">
                      <FaKey size={24}/>{'  '}{password}
                    </p>
                    <br />
                    <QRCode
                      height="auto"
                      width="auto"
                      style={{maxWidth: '400px'}}
                      value={`WIFI:T:WPA;S:${name};P:${password};;`}
                      renderAs="svg" />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
      }
    </Accordion>
  );
}
