import {useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {
  deleteMessage,
  expireMessage,
  MessageInfo,
} from '../../redux/generalSlice';
import {RootState} from '../../redux/store';
import './index.css';


export default function Announcement() {
  const general = useAppSelector(
    (state: RootState) => state.general);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => dispatch(expireMessage()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="annoucement">
      {
        general.messageInfos.map(
          (messageInfo: MessageInfo) => (
            <Alert
              key={messageInfo.hash}
              variant={messageInfo.message.level}
              onClose={() => dispatch(deleteMessage(messageInfo.hash))}
              dismissible >
              {messageInfo.message.content}
            </Alert>))
      }
    </div>
  );
};
