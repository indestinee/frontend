import {Form, Table} from 'react-bootstrap';

export interface PasteInfo {
  text: string,
  time: number,
  ip: string,
  expire: number,
}

export interface PasteBoardParam {
  infos: PasteInfo[],
}

const PastPad = (info: PasteInfo) => {
  const date = new Date(info.time * 1000);

  return (
    <tr>
      <td style={{verticalAlign: 'middle'}}>
        <div>
          <div style={{margin: 'auto'}}>{info.ip}</div>
          <div style={{margin: 'auto'}}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </div>
        </div>
      </td>
      <td>
        <Form.Control as="textarea" rows={5} value={info.text} disabled />
      </td>
    </tr>
  );
};

export default function PasteBoard(param: PasteBoardParam) {
  return (
    <>
      <h5>Paste Board</h5>
      <Table striped style={{textAlign: 'center'}}>
        <thead>
          <tr>
            <th style={{width: '20%'}}>IP & Time</th>
            <th style={{width: '80%'}}>Content</th>
          </tr>
        </thead>
        <tbody>
          {
            param.infos.sort((a, b) => b.time - a.time)
                .map((info) => (
                  <PastPad key={info.ip} {...info}></PastPad>
                ))
          }
        </tbody>
      </Table>
    </>
  );
}
