import {Button, Form, Table} from 'react-bootstrap';
import {getAesParam, saltedDecrypt} from '../../utils/cipher/customEncryption';
import {FaClipboardList, FaTrash, FaStar} from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {deletePaste, readPaste} from '../../api/paste';
import {RootState} from '../../redux/store';
import {PasteInfo} from '../../schemas/paste';
import {hmacSha256} from '../../utils/cipher/hash';


interface PastePadParam {
  info: PasteInfo,
  active: boolean,
}


const PastePad = (param: PastePadParam) => {
  const authKey = useSelector((state: RootState) => state.auth.authKey);

  const date = new Date(param.info.time * 1000);
  const aesParam = getAesParam(param.info.encryptedPaste.aesMessage);
  const signature = hmacSha256(param.info.encryptedPaste.aesMessage, authKey);

  const deleteFile = (ip: string) => {
    deletePaste(ip).then(() => readPaste());
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
          value={saltedDecrypt(param.info.encryptedPaste.text, aesParam)}
          disabled />
      </td>
    </tr>
  );
};

export default function PasteBoard() {
  const pasteInfos = useSelector((state: RootState) => state.paste.pasteInfos);
  const ip = useSelector((state: RootState) => state.paste.ip);

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
          { pasteInfos.length > 0 &&
            pasteInfos.sort((a, b) => b.time - a.time)
                .map((info) => (
                  <PastePad
                    key={info.ip}
                    info={info}
                    active={ip == info.ip} />
                ))
          }
        </tbody>
      </Table>
    </>
  );
}
