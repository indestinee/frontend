import {useState} from 'react';
import {Form, FloatingLabel, Button} from 'react-bootstrap';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {appendMessage} from '../../redux/generalSlice';
import {RootState} from '../../redux/store';
import authJson from '../../config/auth.json';
import './index.css';
import {authKeyName, setAuthKey} from '../../redux/authSlice';
import {hmacSha256} from '../../utils/cipher/hash';
import {writeToCache} from '../../utils/cache';

export const AuthKeyInput = () => {
  const [text, setText] = useState('');
  const [validated, setValidated] = useState(false);

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const submit = () => {
    if (text.length < 10) {
      setValidated(true);
      return;
    }
    setValidated(false);

    const authKey = hmacSha256('key-' + authJson.authKeySalt, text);
    dispatch(setAuthKey(authKey));
    writeToCache(authKeyName, authKey);
    dispatch(appendMessage({
      level: 'success',
      content: `successfully set auth key to ${authKey.slice(0, 5)}...`,
    }));

    setText('');
  };

  return (
    <Form onSubmit={submit} >
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
              (validated) ?
                'Please input a valid auth key with at least 10 length.':
                'You must input an auth key first!'
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
