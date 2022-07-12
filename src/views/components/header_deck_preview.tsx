import React, {useEffect, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import {Deck} from '../../data/deck';
import {MTGCostType} from '../../data/map_data';

function ColorBlock(props: { colorType: MTGCostType, color: string, deck: Deck, loader: DataLoader }) {
  const setColorMapLoaded = useState(false)[1];
  useEffect(() => {
    props.loader.getMapData('IDToColorIdentity').then(() => {
      setColorMapLoaded(true);
    });
  }, []);
  const idToColorIdentity = props.loader.getMapDataSync('IDToColorIdentity');
  let display = 'none';
  if (idToColorIdentity) {
    for (const card of props.deck.mainboard) {
      if (idToColorIdentity[card].indexOf(props.colorType) >= 0) {
        display = 'inline-block';
        break;
      }
    }
    for (const card of props.deck.sideboard) {
      if (idToColorIdentity[card].indexOf(props.colorType) >= 0) {
        display = 'inline-block';
        break;
      }
    }
  }
  return <div style={{
    display: display,
    width: '20px',
    height: '15px',
    transform: 'skew(20deg)',
    border: '1px solid',
    marginLeft: '3px',
    background: `linear-gradient(90deg, ${props.color}, #3e3f2b)`,
    borderColor: '#3e3f2b',
  }}></div>;
}

export default function HeaderDeckPreview(props: { deck: Deck, loader: DataLoader, changeToDeck: () => void }) {
  const setImageMapLoaded = useState(false)[1];
  useEffect(() => {
    props.loader.getMapData('IDToLargeImageURI').then(() => {
      setImageMapLoaded(true);
    });
  }, []);

  let url = '';
  const idToLargeImageURI = props.loader.getMapDataSync('IDToLargeImageURI');
  if (idToLargeImageURI) {
    url = `url("${idToLargeImageURI[props.deck.keycard]}")`;
  }

  const fillParent: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  };
  const cardCount = props.deck.mainboard.length + props.deck.sideboard.length;
  return <div onMouseUp={() => {
    props.changeToDeck();
  }} style={{
    position: 'relative',
    width: '220px',
    height: '160px',
    border: '3px solid #303b4c',
    borderRadius: '6px',
    display: 'inline-block',
    color: 'white',
    verticalAlign: 'top',
    cursor: 'pointer',
    marginBottom: '10px',
    marginRight: '4px',
  }}>
    <div style={{
      ...fillParent,
      backgroundImage: url,
      backgroundPosition: '-24px -44px',
      backgroundSize: '269px 375px',
    }}></div>
    <div className="tbDeckGradiant" style={{
      ...fillParent,
    }}></div>
    {cardCount === 0 ? null :
    <div>
      <div style={{
        width: '100%',
        position: 'absolute',
        top: '3px',
        opacity: '0.5',
        backgroundColor: 'white',
        height: '20px',
      }}></div>
      <div style={{
        width: '100%',
        textAlign: 'right',
        position: 'relative',
        right: '5px',
        top: '4px',
      }}>
        <ColorBlock color="#e2ddbf" colorType={MTGCostType.White} deck={props.deck} loader={props.loader} />
        <ColorBlock color="#3d8acb" colorType={MTGCostType.Blue} deck={props.deck} loader={props.loader} />
        <ColorBlock color="#3a3b30" colorType={MTGCostType.Black} deck={props.deck} loader={props.loader} />
        <ColorBlock color="#d04035" colorType={MTGCostType.Red} deck={props.deck} loader={props.loader} />
        <ColorBlock color="#6dab6c" colorType={MTGCostType.Green} deck={props.deck} loader={props.loader} />
      </div>
      <div style={{
        width: '100%',
        position: 'absolute',
        top: '3px',
        paddingLeft: '10px',
        color: '#242424',
        fontSize: '18px',
        marginTop: '-2px',
      }}>{cardCount} Cards</div>
    </div>}
    <div className="tbDeckName" style={{
      display: 'block',
      width: 'calc(100% - 10px)',
      position: 'absolute',
      left: '5px',
      bottom: '5px',
      fontSize: '24px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      pointerEvents: 'none',
    }}>{props.deck.name}</div>
  </div>;
}
