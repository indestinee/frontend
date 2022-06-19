import {Button, Form, Table} from 'react-bootstrap';
import {getAesParam, saltedDecrypt} from '../../utils/cipher/customEncryption';
import {FaClipboardList, FaTrash, FaStar} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {deletePaste, readPaste} from '../../api/paste';
import {RootState} from '../../redux/store';
import {PasteInfo} from '../../schemas/paste';
import {hmacSha256} from '../../utils/cipher/hash';


interface PastePadParam {
  info: PasteInfo,
  active: boolean,
}


const PastePad = (param: PastePadParam) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatcher = useDispatch();

  const date = new Date(param.info.time * 1000);
  const signature = hmacSha256(
      param.info.encryptedPaste.aesMessage, auth.authKey);

  const deleteFile = (ip: string) => {
    deletePaste(ip, auth.authKey)
        .then(() => readPaste(auth.authKey, dispatcher));
  };

  return (signature != param.info.encryptedPaste.signature) ? (<></>) : (
    <tr>
      <td style={{verticalAlign: 'middle'}}>
        <div>
          <div style={{margin: 'auto'}}>
            {param.active ? <><FaStar />{' '}</> : ''}{param.info.ip}
          </div>
          <div style={{margin: 'auto'}}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
          <div style={{margin: 'auto'}}>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={() => deleteFile(param.info.ip)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      </td>
      <td>
        <Form.Control
          as="textarea"
          rows={5}
          value={saltedDecrypt(
              param.info.encryptedPaste.text,
              getAesParam(param.info.encryptedPaste.aesMessage, auth.authKey),
          )}
          disabled />
      </td>
    </tr>
  );
};

export default function PasteBoard() {
  const paste = useSelector((state: RootState) => state.paste);

  return (
    <>
      <h5><FaClipboardList />Paste Board</h5>
      <Table striped style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th style={{width: '20%'}}>IP & Time</th>
            <th style={{width: '80%'}}>Content</th>
          </tr>
        </thead>
        <tbody>
          { paste.pasteInfos.length > 0 &&
            paste.pasteInfos
                .map((info) => (
                  <PastePad
                    key={info.ip}
                    info={info}
                    active={paste.ip == info.ip} />
                ))
          }
        </tbody>
      </Table>
    </>
  );
}
