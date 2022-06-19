import {useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMessage, expireMessage} from '../../redux/generalSlice';
import {RootState} from '../../redux/store';
import './index.css';


export default function Announcement() {
  const general = useSelector(
      (state: RootState) => state.general);
  const dispatcher = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => dispatcher(expireMessage()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="annoucement">
      {
        general.messageInfos.map(
            (messageInfo) => (
              <Alert
                key={messageInfo.hash}
                variant={messageInfo.message.level}
                onClose={() => dispatcher(deleteMessage(messageInfo.hash))}
                dismissible >
                {messageInfo.message.content}
              </Alert>))
      }
    </div>
  );
};
