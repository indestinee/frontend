import {useEffect} from 'react';
import EditorBoard from '../../components/editorBoard';
import PasteBoard from '../../components/pasteBoard';
import {FaRegCopy} from 'react-icons/fa';
import {readPaste} from '../../api/paste';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';

export default function Paste() {
  const ip = useSelector((state: RootState) => state.paste.ip);
  const authKey = useSelector((state: RootState) => state.auth.authKey);
  const dispatcher = useDispatch();

  useEffect(() => {
    readPaste(authKey, dispatcher);
  }, []);

  return (
    <>
      <h2><FaRegCopy />Shared Clipboard</h2>
      <p>Your IP is: {ip}</p>
      <EditorBoard />
      <br /><br />
      <PasteBoard />
    </>
  );
}
