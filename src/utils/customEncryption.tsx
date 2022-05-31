import {decrypt, encrypt} from './encryption';
import pbkdf2 from 'pbkdf2';
import cipherJson from './customCipher.json';

const randomStr = (size: number) => {
  let s = '';
  while (s.length < size) {
    s += Math.random().toString(36).substring(2, 15);
  }
  return s.substring(0, size);
};

const password = cipherJson.password;
const salt = cipherJson.salt;

const key = pbkdf2.pbkdf2Sync(password, salt, 1000, 256 / 8);
const iv = pbkdf2.pbkdf2Sync(password, salt, 2000, 128 / 8);
const blockSize = key.length;

export const saltedEncrypt = (text: string) => {
  const padText = randomStr(blockSize) + text + randomStr(blockSize);
  return encrypt(padText, key, iv);
};

export const saltedDecrypt = (cipher: string) => {
  const padText = decrypt(cipher, key, iv);
  return padText.substring(blockSize, padText.length - blockSize);
};
