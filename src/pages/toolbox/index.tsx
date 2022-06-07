import {Card, Tabs, Tab} from 'react-bootstrap';
import {FaTools, FaReact} from 'react-icons/fa';
import CustomCard from '../../components/card';
import EncodeBox from '../../components/toolbox/encodeBox';
import './index.css';

export default function ToolBox() {
  return (
    <>
      <h5><FaTools />{' '}Tool Box </h5>
      <CustomCard>
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
      </CustomCard>
    </>
  );
}
