import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {hmacSha256} from '../utils/cipher/hash';
import {randomStr} from '../utils/random';

export const getHeaders = () => {
  const salt = randomStr(32);
  const authKey = useSelector((state: RootState) => state.auth.authKey);
  return {
    ['Content-Type']: 'application/json',
    ['Salt']: salt,
    ['Signature']: hmacSha256(salt, authKey),
  };
};
