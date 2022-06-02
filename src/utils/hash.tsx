import CryptoJS from 'crypto-js';


/* eslint-disable new-cap */
export const md5 = (value: string) => CryptoJS.MD5(value).toString();
export const sha256 = (value: string) => CryptoJS.SHA256(value).toString();
export const b64Encode = (value: string) =>
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value)).toString();
export const b64Decode = (value: string) =>
  CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(value)).toString();
