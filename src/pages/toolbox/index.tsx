import {Tabs, Tab} from 'react-bootstrap';
import {FaTools} from 'react-icons/fa';
import CustomCard from '../../components/card';
import EncodeBox from '../../components/toolbox/encodeBox';
import QrCodeBox from '../../components/toolbox/qrCodeBox';
import './index.css';

export default function ToolBox() {
  return (
    <>
      <h5><FaTools />{' '}Tool Box </h5>
      <CustomCard>
        <Tabs
          defaultActiveKey="encode"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="encode" title="Encode" className="custom-tab">
            <EncodeBox />
          </Tab>
          <Tab eventKey="qrcode" title="QR Code" className="custom-tab">
            <QrCodeBox />
          </Tab>
        </Tabs>
      </CustomCard>
    </>
  );
}
