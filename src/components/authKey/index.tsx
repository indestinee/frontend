import {useState} from 'react';
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthKey} from '../../redux/authSlice';
import {appendMessage} from '../../redux/generalSlice';
import {RootState} from '../../redux/store';
import './index.css';

export const AuthKeyInput = () => {
  const [text, setText] = useState('');
  const dispatcher = useDispatch();
  const submit = () => {
    if (text.length < 10) {
      setValidated(true);
      return;
    }
    setValidated(false);
    dispatcher(setAuthKey(text));
    dispatcher(appendMessage({
      level: 'success',
      content: `successfully set auth key to ${auth.authKey.slice(0, 5)}...`,
    }));
    setText('');
  };
  const auth = useSelector((state: RootState) => state.auth);
  const [validated, setValidated] = useState(false);

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
            onChange={(event) => setText(event.target.value)}
            isInvalid={
              text.length < 10 && validated ||
                auth.authKey.length == 0
            }/>
          <Form.Control.Feedback type="invalid">
            {
              (auth.authKey.length == 0) ?
              'You must input an auth key first!':
              'Please input a valid auth key with at least 10 length.'
            }
          </Form.Control.Feedback>
        </FloatingLabel>
        <Button
          size="lg"
          variant="outline-success"
          onClick={submit}
          style={{height: '58px'}}
        >Submit</Button>
      </div>

    </Form>
  );
};
