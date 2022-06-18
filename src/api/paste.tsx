import {useDispatch} from 'react-redux';
import {setIp, setPasteInfos} from '../redux/pasteSlice';
import {EncryptedPaste, ReadPasteResponse} from '../schemas/paste';
import {getHeaders} from './common';

export const readPaste = async () => {
  const dispatcher = useDispatch();
  const rsp = await fetch('/paste/read', {
    method: 'GET',
    headers: getHeaders(),
  });
  return rsp.json()
      .then((rsp) => rsp.data as ReadPasteResponse)
      .then((rsp) => {
        dispatcher(setIp(rsp.ip));
        dispatcher(setPasteInfos(rsp.pasteInfos));
      },
      );
};

export const writePaste = async (request: EncryptedPaste) => {
  fetch( '/paste/write', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(request),
  }).then(() => readPaste());
};

export const deletePaste = async (ip: string) => {
  fetch('/paste/delete', {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify({'ip': ip}),
  }).then(() => readPaste());
};
