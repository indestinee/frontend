import {useState} from 'react';
import {Col, FloatingLabel, Form, Row, Table} from 'react-bootstrap';
import {
  b64Decode, b64Encode, hmacMd5, hmacSha256, md5, sha256,
} from '../../../utils/cipher/hash';
import {HashBlock} from '../hashBlock';

export default function EncodeBox() {
  const [text, setText] = useState('hello');
  const [key, setKey] = useState('key');

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
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Key">
            <Form.Control
              type="password"
              placeholder="key"
              value={key}
              onChange={(event) => setKey(event.target.value)}/>
          </FloatingLabel>
        </Col>
      </Row>
      <div style={{marginTop: '12px', overflow: 'scroll', width: '100%'}}>
        <Table striped style={{width: '100%'}}>
          <thead>
            <tr>
              <th style={{width: '15%'}}>Algorithm</th>
              <th style={{width: '85%'}}>Result</th>
            </tr>
          </thead>
          <tbody>
            <HashBlock name="MD5" getValue={() => md5(text)}/>
            <HashBlock
              name="HMAC-MD5"
              getValue={() => hmacMd5(text, key)}/>
            <HashBlock name="SHA256" getValue={() => sha256(text)}/>
            <HashBlock
              name="HMAC-SHA256"
              getValue={() => hmacSha256(text, key)}/>
            <HashBlock name="B64Encode" getValue={() => b64Encode(text)}/>
            <HashBlock name="B64Decode" getValue={() => b64Decode(text)}/>
          </tbody>
        </Table>
      </div>
    </Form>
  );
};
