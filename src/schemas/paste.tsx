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
}
