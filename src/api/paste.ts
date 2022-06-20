import {Dispatch} from 'react';
import {AnyAction} from 'redux';
import {setIp, setPasteInfos} from '../redux/pasteSlice';
import {
  EncryptedPaste,
  exampleReadPasteResponse,
  ReadPasteResponse,
} from '../schemas/paste';
import {getHeaders} from './common';

export const readPaste = async (
  authKey: string,
  dispatch: Dispatch<AnyAction>,
) => {
  const rsp = await fetch('/paste/read', {
    method: 'GET',
    headers: getHeaders(authKey),
  });
  return rsp.json()
    .then(
      (rsp) => rsp as ReadPasteResponse,
      (error) => exampleReadPasteResponse,
    )
    .then((rsp) => {
      dispatch(setIp(rsp.ip));
      dispatch(setPasteInfos(rsp.pasteInfos));
    },
    );
};

export const writePaste = async (
  request: EncryptedPaste,
  authKey: string,
) => {
  fetch( '/paste/write', {
    method: 'POST',
    headers: getHeaders(authKey),
    body: JSON.stringify(request),
  });
};

export const deletePaste = async (
  ip: string,
  authKey: string,
) => {
  fetch('/paste/delete', {
    method: 'DELETE',
    headers: getHeaders(authKey),
    body: JSON.stringify({'ip': ip}),
  });
};
