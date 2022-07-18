import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';

export type NotificationWindowHandle = {
  open: (title: string, message: string) => void,
  close: () => void,
};

const NotificationWindow = forwardRef<NotificationWindowHandle, {}>(function NotificationWindow(
    _props: {},
    ref: ForwardedRef<NotificationWindowHandle>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => ({
    open: (title: string, message: string) => {
      if (isOpen) {
        console.error('Tried to open two notification windows at the same time.');
        return;
      }
      setIsOpen(true);
      setTitle(title);
      setMessage(message);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  if (!isOpen) {
    return null;
  }

  return <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: '#00000070',
    zIndex: '7',
  }}>
    <div style={{
      width: '800px',
      height: '250px',
      position: 'absolute',
      left: 'calc(50% - 300px)',
      top: 'calc(50% - 125px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '16px',
    }}>
      <div style={{padding: '12px', fontSize: '36px'}}>{title}</div>
      <div style={{fontSize: '24px'}}>{message}</div>
    </div>
  </div>;
});

export default NotificationWindow;
