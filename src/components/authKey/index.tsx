import {useState} from 'react';
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {setAuthKey} from '../../redux/authSlice';
import './index.css';

export const AuthKeyInput = () => {
  const [text, setText] = useState('');
  const dispatcher = useDispatch();
  const submit = () => {
    dispatcher(setAuthKey(text));
    setText('');
  };

  return (
    <Form>
      <div className='inline-input'>
        <FloatingLabel
          controlId="floatingInputGrid"
          label="Auth Key"
          className="auth-input-box">
          <Form.Control
            type="password"
            placeholder="text"
            value={text}
            onChange={(event) => setText(event.target.value)}/>
        </FloatingLabel>
        <Button
          size="lg"
          variant="outline-success"
          onClick={submit}
        >Submit</Button>
      </div>
    </Form>
  );
};
