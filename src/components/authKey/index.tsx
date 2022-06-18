import {useState} from 'react';
import {Form, FloatingLabel, Button, Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthKey} from '../../redux/authSlice';
import {RootState} from '../../redux/store';
import {Spacing} from '../spacing';
import './index.css';

export const AuthKeyInput = () => {
  const [text, setText] = useState('');
  const dispatcher = useDispatch();
  const submit = () => {
    dispatcher(setAuthKey(text));
    setText('');
  };
  const authKey = useSelector((state: RootState) => state.auth.authKey);

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
      {
        !authKey && (
          <Spacing marginTop='0.5rem'>
            <Alert variant="danger">
            You must enter an valid auth key!
            </Alert>
          </Spacing>
        )
      }
    </Form>
  );
};
