import {useEffect} from 'react';
import EditorBoard from '../../features/editorBoard';
import PasteBoard from '../../features/pasteBoard';
import {FaRegCopy} from 'react-icons/fa';
import {readPaste} from '../../api/paste';
import {RootState} from '../../redux/store';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';

export default function Paste() {
  const paste = useAppSelector((state: RootState) => state.paste);
  const {authKey} = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    readPaste(authKey, dispatch);
  }, [authKey]);

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
