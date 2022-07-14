import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import CardArea from './card_area';
import {DisplayMode} from './display_dropdown';
import ImageLoadTracker from './image_load_tracker';
import URLLoader from './url_loader';

export type SwapPrintingsWindowHandle = {
  open: (id: string) => void,
};

type SwapPrintingsWindowProps = {
  loader: DataLoader,
  urlLoader: URLLoader,
  imageLoadTracker: ImageLoadTracker,
  addCard: (id: string) => void,
  swapCard: (fromId: string, toId: string) => void,
};

const SwapPrintingsWindow = forwardRef<SwapPrintingsWindowHandle, SwapPrintingsWindowProps>(
    function SwapPrintingsWindow(
        props: SwapPrintingsWindowProps,
        ref: ForwardedRef<SwapPrintingsWindowHandle>,
    ) {
      const [cardIds, setCardIds] = useState<string[]>([]);
      const [cardName, setCardName] = useState('');
      const [originalId, setOriginalId] = useState('');
      const [isOpen, setIsOpen] = useState(false);

      useImperativeHandle(ref, () => ({
        open: (id: string) => {
          const idToName = props.loader.getMapDataSync('IDToName')!;
          const name = idToName[id];
          setOriginalId(id);
          setCardName(name);
          const candidates: string[] = [];
          for (const id in idToName) {
            if (idToName[id] === name) {
              candidates.push(id);
            }
          }
          setCardIds(candidates);
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
          width: 'calc(100% - 200px)',
          height: 'calc(100% - 200px)',
          position: 'absolute',
          left: '100px',
          top: '100px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '3px solid #cdd6e4',
          padding: '16px',
        }} onMouseUp={(e) => e.stopPropagation()}>
          <div style={{
            fontSize: '24px',
          }}>{`Printings of "${cardName}"`}</div>
          <div style={{
            height: 'calc(100% - 200px)',
          }}>
            <CardArea cardIds={cardIds} displayMode={DisplayMode.SingleGrid} imageLoadTracker={props.imageLoadTracker}
              loader={props.loader} urlLoader={props.urlLoader} actionHandlers={{
                onAdd: props.addCard,
                onSwap: (id: string) => {
                  props.swapCard(originalId, id);
                  setIsOpen(false);
                },
              }}/>
          </div>
          <div style={{position: 'absolute', bottom: '12px', right: '12px'}}>
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
          </div>
        </div>
      </div>;
    });

export default SwapPrintingsWindow;
