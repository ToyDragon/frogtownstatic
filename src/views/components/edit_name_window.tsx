import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';

export type EditNameWindowHandle = {
  open: (newValue: string) => void,
};

type EditNameWindowProps = {
  nameChanged: (newName: string) => void,
};

const EditNameWindow = forwardRef<EditNameWindowHandle, EditNameWindowProps>(function EditNameWindow(
    props: EditNameWindowProps,
    ref: ForwardedRef<EditNameWindowHandle>,
) {
  const [inputValue, setInputValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: (newValue: string) => {
      setInputValue(newValue);
      setIsOpen(true);
      setTimeout(() => inputRef.current?.select(), 0);
    },
  }));

  if (!isOpen) {
    return null;
  }

  const submit: any = (allowSpace: boolean) => {
    return (e?: React.KeyboardEvent<HTMLButtonElement>) => {
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

      if (inputValue.trim().length === 0) {
        setErrorText('Invalid name.');
        return;
      }

      props.nameChanged(inputValue);
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
      }}>New Name</div>
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
          onKeyDown={submit(false)}>Submit</button>
      </div>
    </div>
  </div>;
});

export default EditNameWindow;
