import {decrypt, encrypt} from './encryption';
import pbkdf2 from 'pbkdf2';
import {randomStr} from '../random';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';


const salt = '92b38b93b0395a869e527883e87b5bef';

interface AesParam {
  key: Buffer,
  iv: Buffer,
}

export const getAesParam = (msg: string) => {
  const authKey = useSelector((state: RootState) => state.auth.authKey);

  if (authKey == null) {
    console.log('auth key is empty');
    throw new Error('auth key is empty');
  }
  return {
    key: pbkdf2.pbkdf2Sync(authKey, salt + msg, 1000, 256 / 8),
    iv: pbkdf2.pbkdf2Sync(authKey, salt + msg, 2000, 128 / 8),
  };
};

export const saltedEncrypt = (text: string, aesParam: AesParam) => {
  const blockSize = aesParam.key.length;
  const padText = randomStr(blockSize) + text + randomStr(blockSize);
  return encrypt(padText, aesParam.key, aesParam.iv);
};

export const saltedDecrypt = (cipher: string, aesParam: AesParam) => {
  const blockSize = aesParam.key.length;
  const padText = decrypt(cipher, aesParam.key, aesParam.iv);
  return padText.substring(blockSize, padText.length - blockSize);
};
