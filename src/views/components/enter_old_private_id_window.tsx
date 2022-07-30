import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import URLLoader from './url_loader';

export type EnterOldPrivateIdWindowHandle = {
  open: () => void,
};

type EnterOldPrivateIdWindowProps = {
  idEntered: (publicId: string) => void,
  urlLoader: URLLoader,
};

const EditNameWindow = forwardRef<EnterOldPrivateIdWindowHandle, EnterOldPrivateIdWindowProps>(function EditNameWindow(
    props: EnterOldPrivateIdWindowProps,
    ref: ForwardedRef<EnterOldPrivateIdWindowHandle>,
) {
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      setInputValue('');
      setIsOpen(true);
      setTimeout(() => inputRef.current?.select(), 0);
    },
  }));

  if (!isOpen) {
    return null;
  }

  const submit: any = (allowSpace: boolean) => {
    return async (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (typeof e !== 'undefined' &&
        typeof e.key !== 'undefined' &&
        e.key !== 'Enter' &&
        (allowSpace || e.key !== ' ')) {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
        setErrorText('');
        return;
      }

      const enteredId = inputValue.trim();
      if (enteredId.length !== 64) {
        setErrorText('Not a private Id.');
        return;
      }
      const data = await props.urlLoader.load(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${enteredId}.txt`);
      if (!data || data.length != 24) {
        setErrorText('Not a private Id.');
        return;
      }

      props.idEntered(data);
      setIsOpen(false);
    };
  };

  return <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: '#00000070',
    zIndex: '6',
  }} onMouseUp={() => {
    setIsOpen(false);
  }}>
    <div style={{
      width: '600px',
      height: '160px',
      position: 'absolute',
      left: 'calc(50% - 300px)',
      top: 'calc(50% - 80px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '16px',
    }} onMouseUp={(e) => e.stopPropagation()}>
      <div style={{
        fontSize: '24px',
      }}>Legacy Private ID</div>
      <input ref={inputRef} style={{
        fontSize: '24px',
        width: '100%',
      }} type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={submit(true)}></input>
      <div style={{marginTop: '12px'}}>
        <span style={{
          display: 'inline-block',
          color: 'red',
          fontWeight: 'bold',
          width: '380px',
        }}>{errorText}</span>
        <button className='btn btn-secondary'
          onMouseUp={() => setIsOpen(false)}>Cancel</button>
        <button style={{marginLeft: '32px'}} className='btn btn-primary' onMouseUp={submit(false)}
          onKeyDown={submit(false)}>Import</button>
      </div>
    </div>
  </div>;
});

export default EditNameWindow;
