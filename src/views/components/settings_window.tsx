import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {DataLoader} from '../../data/data_loader';

export type SettingsWindowHandle = {
  open: (backgroundUrl: string) => void,
};

type SettingsWindowProps = {
  loader: DataLoader,
  setBackgroundUrl: (newUrl: string) => void,
};

const SettingsWindow = forwardRef<SettingsWindowHandle, SettingsWindowProps>(function SettingsWindow(
    props: SettingsWindowProps,
    ref: ForwardedRef<SettingsWindowHandle>,
) {
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: (backgroundUrl: string) => {
      setInputValue(backgroundUrl);
      setIsOpen(true);
      setTimeout(() => inputRef.current?.select(), 0);
    },
  }));

  if (!isOpen) {
    return null;
  }

  const submit: any = (submitFromKey: boolean) => {
    return (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (typeof e !== 'undefined' &&
        typeof e.key !== 'undefined' &&
        e.key !== 'Enter' &&
        (submitFromKey || e.key !== ' ')) {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
        setErrors([]);
        return;
      }

      props.setBackgroundUrl(inputValue);
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
      height: '352px',
      position: 'absolute',
      left: 'calc(50% - 300px)',
      top: 'calc(50% - 125px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '16px',
    }} onMouseUp={(e) => e.stopPropagation()}>
      <div style={{}}>
        <div style={{
          display: 'inline-block',
          width: '223px',
          height: '312px',
          backgroundSize: '100% 100%',
          backgroundImage: `url(${inputValue})`,
        }}></div>
        <div style={{
          width: 'calc(100% - 223px)',
          display: 'inline-block',
          verticalAlign: 'top',
          paddingLeft: '6px',
        }}>
          <div style={{
            fontSize: '24px',
          }}>Cardback Image</div>
          <input ref={inputRef} type='text' style={{
            fontSize: '18px',
            width: 'calc(100% - 6px)',
            resize: 'none',
          }} value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={submit(true)}></input>
        </div>
      </div>
      <div style={{position: 'absolute', bottom: '12px'}}>
        <div style={{
          display: 'inline-block',
          color: 'red',
          fontWeight: 'bold',
          width: '380px',
          height: '120px',
          overflowY: 'auto',
        }}>{errors.map((a) => (<div key={a}>{a}</div>))}</div>
        <button className='btn btn-secondary'
          onMouseUp={() => setIsOpen(false)}>Cancel</button>
        <button style={{marginLeft: '32px'}} className='btn btn-primary' onMouseUp={submit(false)}
          onKeyDown={submit(false)}>Submit</button>
      </div>
    </div>
  </div>;
});

export default SettingsWindow;
