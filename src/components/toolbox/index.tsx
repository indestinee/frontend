import {Card, Tab, Tabs} from 'react-bootstrap';
import {FaReact, FaTools} from 'react-icons/fa';
import EncodeBox from './encodeBox';
import './index.css';

export default function ToolBox() {
  return (
    <div className="tool-box">
      <h5><FaTools />{' '}Tool Box </h5>
      <Card className="custom-card">
        <Tabs
          defaultActiveKey="greet"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="greet" title="Greet" className="custom-tab">
            <Card body>
              <FaReact size="20px"/>{' '}
              Hello, this is an greeting message.
            </Card>
          </Tab>
          <Tab eventKey="encode" title="Encode" className="custom-tab">
            <EncodeBox />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};
