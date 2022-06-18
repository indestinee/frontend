import {hmacSha256} from '../utils/cipher/hash';
import {randomStr} from '../utils/random';

export const getHeaders = (authKey: string) => {
  const salt = randomStr(32);
  if (!authKey) {
    console.log('auth key is empty');
    throw new Error('auth key is empty');
  }
  return {
    ['Content-Type']: 'application/json',
    ['Salt']: salt,
    ['Signature']: hmacSha256(salt, authKey),
  };
};
