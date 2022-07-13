import React from 'react';
import {DataLoader} from '../../data/data_loader';
import CardActions from './card_actions';
import CompactDetailsCard from './compact_details_card';
import CompactListCard from './compact_list_card';
import DetailsCard from './details_card';
import {DisplayMode} from './display_dropdown';
import ImageLoadTracker from './image_load_tracker';
import ListCard from './list_card';
import URLLoader from './url_loader';

export function countCards(cardIds: string[]): {id: string, count: number}[] {
  const idToCount: Record<string, number> = {};
  for (const id of cardIds) {
    idToCount[id] = (idToCount[id] || 0) + 1;
  }
  return Object.keys(idToCount).map((id) => {
    return {
      id,
      count: idToCount[id],
    };
  });
};

export default function CardGroup(props: {
  cardIds: string[], loader: DataLoader, displayMode: DisplayMode, imageLoadTracker: ImageLoadTracker,
  previousCount: number, urlLoader: URLLoader, actionHandlers: {
    onAdd?: (cardId: string) => void,
    onRemove?: (cardId: string) => void,
    onSimilar?: (cardId: string) => void,
    onSideboard?: (cardId: string) => void,
    onMainboard?: (cardId: string) => void,
    onStar?: (cardId: string) => void,
  }
}) {
  const idToImageUri = props.loader.getMapDataSync('IDToLargeImageURI');
  if (props.displayMode === DisplayMode.Grid ||
    props.displayMode === DisplayMode.CompactGrid ||
    props.displayMode === DisplayMode.SingleGrid) {
    const multipleCardsInStacks = props.displayMode === DisplayMode.CompactGrid;
    return (
      <div>
        <div className={!multipleCardsInStacks ? 'actionContainer' : ''} style={{
          margin: '16px',
          position: 'relative',
          width: '223px',
          height: (312 + (props.cardIds.length-1) * 37) + 'px',
        }}>
          {
            props.cardIds.map((cardId, i) => {
              const bg = (idToImageUri && idToImageUri[cardId]) || 'https://www.frogtown.me/Images/CardBack.jpg';
              const bgProp = props.imageLoadTracker.getURLIsLoaded(bg) ? {} : {
                'data-lazybackground': bg,
              };
              return <div key={cardId + '_' + i}
                className={(multipleCardsInStacks ? 'actionContainer' : '') + ' hoverContainer'} style={{
                  borderRadius: '15px',
                  position: 'absolute',
                  top: (37 * i) + 'px',
                  height: (props.displayMode !== DisplayMode.CompactGrid || i === props.cardIds.length - 1) ?
                    '312px' : '37px',
                }}>
                {multipleCardsInStacks ?
                  <CardActions top={multipleCardsInStacks} cardId={cardId} {...props.actionHandlers} /> :
                null}
                <div className='hoverToTop'
                  {...bgProp} style={{
                    backgroundImage: props.imageLoadTracker.getURLIsLoaded(bg) ? `url("${bg}")` : '',
                    width: '223px',
                    height: '312px',
                    borderRadius: '15px',
                    backgroundSize: '100% 100%',
                    position: 'relative',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}></div>
              </div>;
            })
          }
          {!multipleCardsInStacks ?
            <CardActions top={multipleCardsInStacks} cardId={props.cardIds[0]} {...props.actionHandlers} /> :
          null}
        </div>
      </div>
    );
  }
  if (props.displayMode === DisplayMode.SmallList) {
    return <>
      {
        props.cardIds.map((cardId, i) => {
          return <CompactListCard key={cardId} cardId={cardId} loader={props.loader} urlLoader={props.urlLoader}
            index={i + props.previousCount} actionHandlers={props.actionHandlers} />;
        })
      }
    </>;
  }
  const countedCards = countCards(props.cardIds);
  if (props.displayMode === DisplayMode.List) {
    return <>
      {
        countedCards.map((idAndCount, i) => {
          return <ListCard key={idAndCount.id} cardId={idAndCount.id} count={idAndCount.count} loader={props.loader}
            urlLoader={props.urlLoader} index={i + props.previousCount} actionHandlers={props.actionHandlers} />;
        })
      }
    </>;
  }
  if (props.displayMode === DisplayMode.SmallDetails) {
    return <>
      {
        props.cardIds.map((cardId, i) => {
          return <CompactDetailsCard key={cardId} cardId={cardId} loader={props.loader} urlLoader={props.urlLoader}
            index={i + props.previousCount} actionHandlers={props.actionHandlers} />;
        })
      }
    </>;
  }
  if (props.displayMode === DisplayMode.Details) {
    return <>
      {
        countedCards.map((idAndCount, i) => {
          console.log(idAndCount);
          return <DetailsCard key={idAndCount.id} cardId={idAndCount.id} count={idAndCount.count} loader={props.loader}
            urlLoader={props.urlLoader} index={i + props.previousCount} actionHandlers={props.actionHandlers} />;
        })
      }
    </>;
  }
  if (props.displayMode === DisplayMode.Text) {
    const idToNameMap = props.loader.getMapDataSync('IDToName')!;
    const idToSetCode = props.loader.getMapDataSync('IDToSetCode')!;
    return <textarea readOnly style={{
      width: '600px',
      height: `${(countedCards.length + 1) * 26}px`,
    }} value={
      countedCards.map((idAndCount) => {
        console.log(idAndCount);
        return `${idAndCount.count} ${idToNameMap[idAndCount.id]} <${idToSetCode[idAndCount.id]}>\n`;
      }).join('')
    }></textarea>;
  }
  if (props.displayMode === DisplayMode.TextIDs) {
    const idToNameMap = props.loader.getMapDataSync('IDToName')!;
    const idToSetCode = props.loader.getMapDataSync('IDToSetCode')!;
    return <textarea readOnly style={{
      width: '800px',
      height: `${(countedCards.length + 1) * 26}px`,
    }} value={
      countedCards.map((idAndCount) => {
        console.log(idAndCount);
        return `${idAndCount.count} ${idAndCount.id} // ${idToNameMap[idAndCount.id]}` +
          ` <${idToSetCode[idAndCount.id]}>\n`;
      }).join('')
    }></textarea>;
  }
  console.error('Unsupported display mode: ' + props.displayMode);
  return <div></div>;
}
