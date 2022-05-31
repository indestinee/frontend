import {useEffect, useState} from 'react';
import EditorBoard from '../../components/editorBoard';
import PasteBoard, {PasteInfo} from '../../components/pasteBoard';

export default function Paste() {
  const [infos, setInfos] = useState<PasteInfo[]>([]);
  const [ip, setIp] = useState('unknown');

  const refreshPaste = () => {
    fetch('/paste/read')
        .then((res) => res.json())
        .then(
            (result) => {
              setInfos(result.files);
              setIp(result.ip);
            },
            (error) => {
              setInfos([{
                text: '你好，\n今天天气真好。\nabcdefg',
                expire: 1653981341,
                time: 1653981341,
                ip: 'error',
              }]);
              setIp('error');
            },
        );
  };


  useEffect(() => {
    refreshPaste();
  }, []);

  return (
    <>
      <h2>Shared Clipboard</h2>
      <p>Your IP is: {ip}</p>
      <EditorBoard onSubmit={refreshPaste}/>
      <br /><br />
      <PasteBoard infos={infos} />
    </>
  );
}
