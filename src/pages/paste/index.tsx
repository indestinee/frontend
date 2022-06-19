import {useEffect} from 'react';
import EditorBoard from '../../components/editorBoard';
import PasteBoard from '../../components/pasteBoard';
import {FaRegCopy} from 'react-icons/fa';
import {readPaste} from '../../api/paste';
import {RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';

export default function Paste() {
  const paste = useSelector((state: RootState) => state.paste);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatcher = useDispatch();

  useEffect(() => {
    readPaste(auth.authKey, dispatcher);
  }, []);

  return (
    <>
      <h2><FaRegCopy />Shared Clipboard</h2>
      <p>Your IP is: {paste.ip}</p>
      <EditorBoard />
      <br /><br />
      <PasteBoard />
    </>
  );
}
