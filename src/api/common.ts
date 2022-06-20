import {hmacSha256} from '../utils/cipher/hash';
import {randomStr} from '../utils/random';

export const getHeaders = (
  authKey: string,
) => {
  const salt = randomStr(32);
  if (!authKey) {
    const message = 'auth key is empty';
    throw new Error(message);
  }
  return {
    ['Content-Type']: 'application/json',
    ['Salt']: salt,
    ['Signature']: hmacSha256(salt, authKey),
  };
};
