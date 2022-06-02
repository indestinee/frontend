import {useState} from 'react';
import {Form, Table} from 'react-bootstrap';
import {b64Decode, b64Encode, md5, sha256} from '../../../utils/hash';

interface HashBlockParams {
  hashFunction: (value: string) => string,
  name: string,
  value: string,
};

const HashBlock = (param: HashBlockParams) => {
  const calcValue = () => {
    if (!param.value) {
      return '';
    }
    try {
      return param.hashFunction(param.value);
    } catch {
      return '[INVALID]';
    }
  };

  const value = calcValue();

  return (
    <tr>
      <td>{param.name}</td>
      <td>{value}</td>
    </tr>
  );
};

export default function HashBox() {
  const [text, setText] = useState('hello');

  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="plain text"
        value={text}
        onChange={(event) => setText(event.target.value)}/>
      <Table striped style={{marginTop: '12px'}}>
        <thead>
          <tr>
            <th style={{width: '20px'}}>Algorithm</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <HashBlock name="MD5" value={text} hashFunction={md5}/>
          <HashBlock name="SHA256" value={text} hashFunction={sha256}/>
          <HashBlock name="B64Encode" value={text} hashFunction={b64Encode}/>
          <HashBlock name="B64Decode" value={text} hashFunction={b64Decode}/>
        </tbody>
      </Table>
    </Form>
  );
};
