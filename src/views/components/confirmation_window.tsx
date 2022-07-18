import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';

export type ConfirmationWindowHandle = {
  open: (title: string, message: string, confirmAction: string) => Promise<boolean>,
};

const ConfirmationWindow = forwardRef<ConfirmationWindowHandle, {}>(function ConfirmationWindow(
    _props: {},
    ref: ForwardedRef<ConfirmationWindowHandle>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [confirmAction, setConfirmAction] = useState('');
  const [message, setMessage] = useState('');
  const callbackRef = useRef<((result: boolean) => unknown) | null>(null);

  useImperativeHandle(ref, () => ({
    open: (title: string, message: string, confirmAction: string) => {
      if (isOpen) {
        console.error('Tried to open two confirmation windows at the same time.');
        return Promise.resolve(false);
      }
      setIsOpen(true);
      setTitle(title);
      setMessage(message);
      setConfirmAction(confirmAction);
      return new Promise<boolean>((resolve) => {
        callbackRef.current = resolve;
      });
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
      height: '350px',
      position: 'absolute',
      left: 'calc(50% - 400px)',
      top: 'calc(50% - 175px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '16px',
    }}>
      <div style={{padding: '12px', fontSize: '36px'}}>{title}</div>
      <div style={{fontSize: '24px'}}>{message}</div>
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
      }}>
        <button className='btn btn-secondary' onMouseUp={async (e) => {
          if (e.button === 0) {
            setIsOpen(false);
            callbackRef.current!(false);
          }
        }}>Cancel</button>
        <button className='btn btn-primary' style={{marginLeft: '8px'}} onMouseUp={async (e) => {
          if (e.button === 0) {
            setIsOpen(false);
            callbackRef.current!(true);
          }
        }}>{confirmAction}</button>
      </div>
    </div>
  </div>;
});

export default ConfirmationWindow;

