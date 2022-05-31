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
                // eslint-disable-next-line max-len
                text: '1dad85a6566a892e664f336e5a2b1d89632e97525b017b1f69f7ef19bf90ccbc9dc0e2e3cbed46e9001a6bb89cafb3d1e4de08d6933cffab16e6a83f6721e2688fbda85fc098d22d16a7470c9cc0c3f0a6fea91d513c768feacce26ce8465fbebe528209b335a36fd78cdd0f7ad9a460',
                expire: 0,
                time: 3600,
                ip: 'error',
              }, {
                // eslint-disable-next-line max-len
                text: '6b3fcc3d012047b2b92cd6a51c8bb3876211b878c4c015781163ded3b8277c95513dda5cd0507bddd6473edf483b16a2138d7bc0d8e2de7e6f1f8cab325afb759ab28588a04a9538cb8c1a30155ff9dc0b424edc075fc2c12b664ad8833f5c50c514ed9107f4fbd3cbff6db1faef30bcb2c0022426712825a08d008b82659d99',
                expire: 0,
                time: 7200,
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
