import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {DataLoader} from '../../data/data_loader';

export type SettingsWindowHandle = {
  open: (existingUrls: string[], backgroundUrl: string) => void,
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
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: (existingUrls: string[], backgroundUrl: string) => {
      console.log('Set existing urls to ', existingUrls);
      setExistingUrls(existingUrls);
      setInputValue(backgroundUrl || '');
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
      width: '800px',
      height: '800px',
      position: 'absolute',
      left: 'calc(50% - 400px)',
      top: 'calc(50% - 400px)',
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
          backgroundImage: `url(https://i.imgur.com/Hg8CwwU.jpeg)`,
        }}>
          <div style={{
            display: 'inline-block',
            width: '223px',
            height: '312px',
            backgroundSize: '100% 100%',
            backgroundImage: `url(${inputValue})`,
          }}></div>
        </div>
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
          <div style={{
            display: 'inline-block',
            color: 'red',
            fontWeight: 'bold',
            width: '380px',
            height: '120px',
            overflowY: 'auto',
          }}>{errors.map((a) => (<div key={a}>{a}</div>))}</div>
        </div>
      </div>
      <div style={{
        fontSize: '24px',
      }}>{'Other Decks\' Cardbacks'}</div>
      <div style={{
        width: '100%',
        overflowX: 'scroll',
      }}>
        <div style={{
          whiteSpace: 'nowrap',
        }}>
          {
            existingUrls.map((url) => {
              return <div key={url} style={{
                display: 'inline-block',
                width: '223px',
                height: '312px',
                marginLeft: '8px',
                marginRight: '8px',
                backgroundSize: '100% 100%',
                backgroundImage: `url(${url})`,
              }} onMouseUp={(e) => {
                if (e.button === 0) {
                  setInputValue(url);
                }
              }}></div>;
            })
          }
        </div>
      </div>
      <div style={{position: 'absolute', bottom: '12px', right: '12px'}}>
        <button className='btn btn-secondary'
          onMouseUp={() => setIsOpen(false)}>Cancel</button>
        <button style={{marginLeft: '32px'}} className='btn btn-primary' onMouseUp={submit(false)}
          onKeyDown={submit(false)}>Submit</button>
      </div>
    </div>
  </div>;
});

export default SettingsWindow;
