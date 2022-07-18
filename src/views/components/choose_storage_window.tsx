import React, {RefObject, useEffect, useState} from 'react';
import {ConfirmationWindowHandle} from './confirmation_window';

export default function ChooseStorageWindow(props: {
    storageChosen: (useCache: boolean, folder: FileSystemDirectoryHandle | null) => unknown,
    confirmationWindow: RefObject<ConfirmationWindowHandle>,
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const styleEle = document.createElement('style');
    styleEle.innerHTML = `
      .storageWindow {
        background-color: white;
      }
      .highlightHover:hover {
        background-color: lightblue;
      }
    `;
    document.querySelector('body')!.append(styleEle);
  }, []);

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
      position: 'absolute',
      top: 'calc(50% - 300px)',
      left: 'calc(50% - 506px)',
      width: '1012px',
      fontSize: '24px',
    }}>
      <div className={'storageWindow ' + (!!window.showDirectoryPicker ? 'highlightHover' : '')} style={{
        display: 'inline-block',
        width: '500px',
        height: '600px',
        borderRadius: '12px',
        border: '3px solid #cdd6e4',
        padding: '12px',
        verticalAlign: 'top',
        position: 'relative',
      }} onMouseUp={async (e) => {
        if (e.button === 0 && !!window.showDirectoryPicker) {
          const dir = await window.showDirectoryPicker();
          console.log('Chose directory: ', dir);
          let hasMetadataFile = false;
          try {
            const metadatafile = await dir.getFileHandle('frogtown_metadata.json');
            const contents = await (await metadatafile.getFile()).text();
            console.log('Metadata file contents: ' + contents);
            if (contents) {
              hasMetadataFile = true;
            }
          } catch {}
          if (!hasMetadataFile) {
            console.log('No metadata, confirming choice');
            const approvedFolder = await props.confirmationWindow.current!.open(
                `Folder "${dir.name}" has no Frogtown metadata file, are you sure you want to use this folder?`,
                'This is normal if this is a new folder that you have never used before.',
                'Use This Folder',
            );
            if (approvedFolder) {
              props.storageChosen(false, dir);
              setIsOpen(false);
            }
          } else {
            console.log('Metadata file present, moving forward with directory.');
            props.storageChosen(false, dir);
            setIsOpen(false);
          }
        }
      }}>
        <h1>Store In Folder</h1>
        {
          !!window.showDirectoryPicker ? null :
            <>
              <div style={{padding: '12px', color: 'darkred', fontSize: '24px'}}>
                NOT SUPPORTED IN YOUR BROWSER</div>
              <div style={{paddingLeft: '12px', paddingRight: '12px', color: 'darkred'}}>Try a <a href='https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker#browser_compatibility' target='_blank' rel='noreferrer'>supported browser</a>, like chrome.</div>
            </>
        }
        <div style={{padding: '12px'}}>{`When decks are stored in a folder on your computer, it's a lot harder
          to accidentally lose them.`}</div>
        <div style={{marginTop: '12px'}}></div>
        <div style={{padding: '12px'}}>{`Create a folder called "Frogtown Decks" or something similar on your
          computer, and choose it when the folder selector appears.`}</div>
        <div style={{fontSize: '48px', fontWeight: 'bolder', color: 'darkgreen', position: 'absolute',
          bottom: '0', left: '63px'}}>{`RECOMMENDED`}</div>
      </div>
      <div className='storageWindow highlightHover' style={{
        display: 'inline-block',
        marginLeft: '12px',
        width: '500px',
        height: '600px',
        borderRadius: '12px',
        border: '3px solid #cdd6e4',
        padding: '12px',
        verticalAlign: 'top',
        position: 'relative',
      }} onMouseUp={async (e) => {
        if (e.button === 0) {
          props.storageChosen(true, null);
          setIsOpen(false);
        }
      }}>
        <h1>Store In Browser Cache</h1>
        <div style={{padding: '12px'}}>{`When decks are stored in your browser directly, they can be accidentally
          lost when clearing your browsers cache. Also, they are difficult to back up and restore if something
          goes wrong.`}</div>
        <div style={{fontSize: '48px', fontWeight: 'bolder', color: 'darkred', position: 'absolute',
          bottom: '0', left: '99px'}}>{`DONT DO IT`}</div>
      </div>
    </div>
  </div>;
};
