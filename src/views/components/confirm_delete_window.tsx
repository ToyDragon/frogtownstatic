import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';

export type ConfirmDeleteWindowHandle = {
  open: (deckName: string) => void,
};

type ConfirmDeleteWindowProps = {
  deleteConfirmed: () => void,
};

const ConfirmDeleteWindow = forwardRef<ConfirmDeleteWindowHandle, ConfirmDeleteWindowProps>(
    function ConfirmDeleteWindow(
        props: ConfirmDeleteWindowProps,
        ref: ForwardedRef<ConfirmDeleteWindowHandle>,
    ) {
      const [deckName, setDeckName] = useState('');
      const [isOpen, setIsOpen] = useState(false);

      useImperativeHandle(ref, () => ({
        open: (deckName: string) => {
          setDeckName(deckName);
          setIsOpen(true);
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
        zIndex: '6',
      }} onMouseUp={(e) => {
        if (e.button === 0) {
          setIsOpen(false);
        }
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
          }}>{`Delete Deck "${deckName}"?`}</div>
          <div style={{marginLeft: '383px', marginTop: '51px'}}>
            <button className='btn btn-secondary'
              onMouseUp={(e) => {
                if (e.button === 0) {
                  setIsOpen(false);
                }
              }} onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsOpen(false);
                }
              }}>Cancel</button>
            <button style={{marginLeft: '32px'}} className='btn btn-primary' onMouseUp={(e) => {
              if (e.button === 0) {
                props.deleteConfirmed();
                setIsOpen(false);
              }
            }} onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                props.deleteConfirmed();
                setIsOpen(false);
              }
            }}>Delete</button>
          </div>
        </div>
      </div>;
    });

export default ConfirmDeleteWindow;
