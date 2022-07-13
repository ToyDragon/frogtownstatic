import React from 'react';
import {useId, useEffect} from 'react';
import {DataLoader} from '../../data/data_loader';


export default function hoverCardHandler(props: {loader: DataLoader}) {
  const id = useId();
  useEffect(() => {
    document.getElementsByTagName('body')[0].addEventListener('mousemove', (e) => {
      const hoverCard = document.getElementById(id);
      const idToImageUri = props.loader.getMapDataSync('IDToNormalImageURI');
      if (!hoverCard || !idToImageUri) {
        return;
      }
      let found = false;
      const allElements = document.elementsFromPoint(e.clientX, e.clientY);
      for (const ele of allElements) {
        const cardId = ele.getAttribute('data-hovercardid');
        if (cardId) {
          const bg = idToImageUri[cardId];
          if (bg) {
            hoverCard.style.top = (e.pageY + 20) + 'px';
            hoverCard.style.left = e.pageX + 'px';
            hoverCard.style.backgroundImage = `url(${bg})`;
            found = true;
            break;
          }
        }
      }

      if (!found) {
        hoverCard.style.top = '-9999999px';
        hoverCard.style.left = '-9999999px';
      }
    });
  }, []);

  return <div id={id} style={{
    position: 'fixed',
    width: '223px',
    height: '312px',
    borderRadius: '15px',
    backgroundSize: '100% 100%',
    overflow: 'hidden',
    zIndex: '5',
  }}></div>;
};
