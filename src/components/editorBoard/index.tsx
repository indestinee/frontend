import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {saltedEncrypt} from '../../utils/cipher/customEncryption';
import {FaEdit} from 'react-icons/fa';

interface Param {
  onSubmit: () => void,
}

export default function EditorBoard(param: Param) {
  const [text, setText] = useState('');

  const submit = () => {
    if (text.length == 0) {
      param.onSubmit();
      return;
    }
    const cipher = saltedEncrypt(text);
    if (cipher.length > 10 * 1024 * 1024) {
      alert(`cipher too large ${cipher.length}B, exceeded 10MB`);
      param.onSubmit();
      return;
    }
    fetch('/paste/write', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
          {'text': cipher, 'expire_time': 3600},
      ),
    })
        .then((res) => res.json())
        .then(
            (result) => param.onSubmit(),
            (error) => {},
        );
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="clipBoard">
        <h5><FaEdit />Edit Board</h5>
        <Form.Control as="textarea" rows={8} value={text} onChange={
          (data) => setText(data.target.value)
        } />
      </Form.Group>
      <Button size="lg" variant="outline-success" onClick={submit}>
        Submit
      </Button>
    </>
  );
}
