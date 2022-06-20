import QRCode from 'qrcode.react';
import {useState} from 'react';
import {Form, Row, Col, FloatingLabel} from 'react-bootstrap';

export default function QrCodeBox() {
  const [text, setText] = useState('hello');

  return (
    <Form>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Message">
            <Form.Control
              type="text"
              placeholder="text"
              value={text}
              onChange={(event) => setText(event.target.value)}/>
          </FloatingLabel>
        </Col>
      </Row>
      <div style={{marginTop: '12px', textAlign: 'center'}}>
        <QRCode
          height="auto"
          width="auto"
          style={{maxWidth: '400px'}}
          value={text}
          renderAs="svg" />
      </div>
    </Form>
  );
};
