/* eslint-disable max-len */
export interface EncryptedPaste {
  text: string,
  expireTime: number,
  aesMessage: string,
  signature: string,
}

export interface PasteInfo {
  encryptedPaste: EncryptedPaste,
  time: number,
  ip: string,
}

export interface ReadPasteResponse {
  ip: string,
  pasteInfos: PasteInfo[],
  success: boolean,
  message?: string,
}

export const exampleReadPasteResponse = {'pasteInfos': [{'encryptedPaste': {'signature': 'a9dae6ce9eeb0b06e4d84e801ee98afc21aad405bd6f1d46d746af65b8481f86', 'text': '60494560aa2f29d8dcf44c3255d055f9c844b7d2ba9a7df19231e34599a2b0198e0e410afdd24921d34c32e1fd586faf6ad5aa31e8523a60b41e4ab9d2c1a75f7121b59d63389487549a5fd3d93235d0', 'expireTime': 3600, 'aesMessage': '9r7kv3k61clpe2ppwfwhbi43y08mz43u'}, 'expire': 1655569409, 'time': 1655565809, 'ip': '192.168.8.182'}, {'encryptedPaste': {'signature': 'b3d3c857be4eea3d68b2c73725e3597d172f82d5cd554261e9a9f29009e5bc53', 'text': 'e750d5cffb966be1fd0966c93525795546c7d9c64e8ad5ea9ee1abb8ac99a1aa00d14b9e3e86a6b20d3b32754e953da2663d7155111f0096e4635946e24bf7c17270eb5a3da548b2f1b0b511829ae194', 'expireTime': 3600, 'aesMessage': 'cckyacov2vmyo1mtzje9lnfi7fupzu3t'}, 'expire': 1655569396, 'time': 1655565796, 'ip': '192.168.8.186'}], 'success': true, 'ip': '192.168.8.186'};
