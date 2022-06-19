import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {getAesParam, saltedEncrypt} from '../../utils/cipher/customEncryption';
import {FaEdit} from 'react-icons/fa';
import {randomStr} from '../../utils/random';
import {readPaste, writePaste} from '../../api/paste';
import {hmacSha256} from '../../utils/cipher/hash';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';


export default function EditorBoard() {
  const [text, setText] = useState('');
  const auth = useSelector((state: RootState) => state.auth);
  const dispatcher = useDispatch();

  const submit = () => {
    if (text.length == 0) {
      readPaste(auth.authKey, dispatcher);
      return;
    }
    const msg = randomStr(32);
    const aesParam = getAesParam(msg, auth.authKey);
    const cipher = saltedEncrypt(text, aesParam);
    if (cipher.length > 10 * 1024 * 1024) {
      alert(`cipher too large ${cipher.length}B, exceeded 10MB`);
      readPaste(auth.authKey, dispatcher);
      return;
    }
    writePaste({
      text: cipher,
      expireTime: 3600,
      aesMessage: msg,
      signature: hmacSha256(msg, auth.authKey),
    }, auth.authKey).then(() => readPaste(auth.authKey, dispatcher));
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
