import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

interface Param {
  onSubmit: () => void,
}

export default function EditorBoard(param: Param) {
  const [text, setText] = useState('');

  const submit = () => {
    fetch('/paste/write', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
          {'text': text, 'expire_time': 3600},
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
        <h5>Edit Board</h5>
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
