import aesjs from 'aes-js';

export const encrypt = (text: string, key: Uint8Array, iv: Uint8Array) => {
  const textBytes = aesjs.utils.utf8.toBytes(text);
  const size = textBytes.length + (16 - textBytes.length % 16) % 16;
  const paddedTextBytes = new Uint8Array(size);
  paddedTextBytes.set(textBytes);

  // eslint-disable-next-line new-cap
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptedBytes = aesCbc.encrypt(paddedTextBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
};

export const decrypt = (cipher: string, key: Uint8Array, iv: Uint8Array) => {
  const encryptedBytes = aesjs.utils.hex.toBytes(cipher);

  // eslint-disable-next-line new-cap
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const decryptedBytes = aesCbc.decrypt(encryptedBytes).filter((a) => a != 0);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
};
