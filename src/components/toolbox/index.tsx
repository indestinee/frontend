import {Card, Tab, Tabs} from 'react-bootstrap';
import HashBox from './hashbox';
import './index.css';

export default function ToolBox() {
  return (
    <div className="tool-box">
      <h5>Tool Box</h5>
      <Card className="custom-card">
        <Tabs
          defaultActiveKey="greet"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="greet" title="Greet" className="custom-tab">
            Hello, this is an greeting message.
          </Tab>
          <Tab eventKey="hash" title="Hash" className="custom-tab">
            <HashBox />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};
