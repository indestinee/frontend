import {Button, Form, Table} from 'react-bootstrap';
import {saltedDecrypt} from '../../utils/customEncryption';
import {FaClipboardList, FaTrash, FaStar} from 'react-icons/fa';


export interface PasteInfo {
  text: string,
  time: number,
  ip: string,
  expire: number,
}

interface PastePadParam {
  info: PasteInfo,
  refreshFunc: () => void,
  active: boolean,
}

export interface PasteBoardParam {
  infos: PasteInfo[],
  refreshFunc: () => void,
  ip: string,
}

const PastePad = (param: PastePadParam) => {
  const date = new Date(param.info.time * 1000);
  const content = saltedDecrypt(param.info.text);

  const deleteFile = (ip: string) => {
    fetch('/paste/delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'ip': ip}),
    }).then(() => param.refreshFunc());
  };

  return (
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
        <Form.Control as="textarea" rows={5} value={content} disabled />
      </td>
    </tr>
  );
};

export default function PasteBoard(param: PasteBoardParam) {
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
          { param.infos.length > 0 &&
            param.infos.sort((a, b) => b.time - a.time)
                .map((info) => (
                  <PastePad
                    key={info.ip}
                    refreshFunc={param.refreshFunc}
                    info={info}
                    active={param.ip == info.ip} />
                ))
          }
        </tbody>
      </Table>
    </>
  );
}
