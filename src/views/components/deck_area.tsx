import React, {useEffect, useRef, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import {Deck} from '../../data/deck';
import IconGear from '../bootstrap_icons/icon_gear';
import TableTopSimulator from '../exporter/tabletop_simulator';
import CardArea from './card_area';
import {countCards} from './card_group';
import DisplayDropdown, {DisplayMode} from './display_dropdown';
import GrouperDropdown, {Grouper} from './grouper_dropdown';
import ImageLoadTracker from './image_load_tracker';
import URLLoader from './url_loader';

export default function deckArea(props: {
    imageLoadTracker: ImageLoadTracker,
    loader: DataLoader,
    urlLoader: URLLoader,
    deck: Deck | null,
    addCard: (id: string, toSideboard: boolean) => void,
    removeCard: (id: string, toSideboard: boolean) => void,
    moveCard: (id: string, toSideboard: boolean) => void,
    onSimilar: (id: string) => void,
    onStar: (id: string) => void,
    onEditName: () => void,
    onBulkImport: () => void,
    onSettings: () => void,
    onDelete: () => void,
    onClone: () => void,
    onSwap: (id: string) => void,
}) {
  const [displayMode, setDisplayMode] = useState(DisplayMode.Grid);
  const [grouper, setGrouper] = useState<Grouper | null>(null);
  const [exportReady, setExportReady] = useState(false);
  const setImageMapLoaded = useState(false)[1];
  const tabletopSimManager = useRef(new TableTopSimulator(props.loader));
  useEffect(() => {
    props.loader.getMapData('IDToCropImageURI').then(() => {
      setImageMapLoaded(true);
    });
    tabletopSimManager.current.ready.then(() => {
      setExportReady(true);
    });
  }, []);

  let keycardImageUrl = '';
  const idToCropImageURI = props.loader.getMapDataSync('IDToCropImageURI');
  if (idToCropImageURI && props.deck?.keycard) {
    keycardImageUrl = `url("${idToCropImageURI[props.deck.keycard]}")`;
  }

  const downloadProps = (!props.deck || !exportReady) ? {href: '#'} : {
    href: 'data:text/json,' +
      encodeURIComponent(tabletopSimManager.current.exportDeck(
          props.deck.mainboard,
          props.deck.sideboard,
          props.deck.backgroundUrl)),
    download: `${props.deck.name}.json`,
  };

  const idToName = props.loader.getMapDataSync('IDToName');
  let tcgplayerLink = '';
  if (props.deck && idToName && props.deck.mainboard.length + props.deck.sideboard.length > 0) {
    const affiliateCode = 'frogtown';
    tcgplayerLink = `https://www.tcgplayer.com/massentry?productline=Magic&utm_campaign=${affiliateCode}&utm_medium=scryfall&utm_source=${affiliateCode}&c=` +
      encodeURIComponent(countCards(props.deck.mainboard.concat(props.deck.sideboard))
          .map((a) => `${a.count} ${idToName[a.id]}`).join('||'));
  }

  const cardCount = !props.deck ? 0 : props.deck.mainboard.length + props.deck.sideboard.length;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      flexGrow: '0',
    }}>
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '16px',
        width: '220px',
        height: '160px',
        backgroundSize: '100% 100%',
        backgroundImage: keycardImageUrl,
        borderRadius: '12px',
      }}></div>
      <div style={{
        width: '100%',
        height: '176px',
        backgroundColor: '#303b4c',
      }}></div>
      <div style={{
        position: 'absolute',
        fontSize: '44px',
        color: 'white',
        left: '267px',
        top: '92px',
      }}>
        {!props.deck ? '' : `${props.deck.name} (${cardCount} cards)`}
      </div>
      <div style={{
        overflowY: 'scroll',
        height: 'calc(100% - 176px)',
      }}>
        <div style={{
          fontSize: '44px',
          marginLeft: '25px',
          marginBottom: '-16px',
          visibility: (props.deck?.mainboard?.length || 0) === 0 ? 'hidden' : 'visible',
        }}>
          Mainboard
        </div>
        <CardArea imageLoadTracker={props.imageLoadTracker} cardIds={props.deck?.mainboard || []}
          displayMode={displayMode} loader={props.loader} urlLoader={props.urlLoader} grouper={grouper}
          actionHandlers={{
            onAdd: (cardId: string) => {
              props.addCard(cardId, false);
            },
            onRemove: (cardId: string) => {
              props.removeCard(cardId, false);
            },
            onSideboard: (cardId: string) => {
              props.moveCard(cardId, true);
            },
            onSwap: props.onSwap,
            onSimilar: props.onSimilar,
            onStar: props.onStar,
          }} />
        <div style={{
          fontSize: '44px',
          marginLeft: '25px',
          marginBottom: '-16px',
          visibility: (props.deck?.sideboard?.length || 0) === 0 ? 'hidden' : 'visible',
        }}>
          Sideboard
        </div>
        <CardArea imageLoadTracker={props.imageLoadTracker} cardIds={props.deck?.sideboard || []}
          displayMode={displayMode} loader={props.loader} urlLoader={props.urlLoader} grouper={grouper}
          actionHandlers={{
            onAdd: (cardId: string) => {
              props.addCard(cardId, true);
            },
            onRemove: (cardId: string) => {
              props.removeCard(cardId, true);
            },
            onSideboard: (cardId: string) => {
              props.moveCard(cardId, false);
            },
            onSwap: props.onSwap,
            onSimilar: props.onSimilar,
            onStar: props.onStar,
          }} />
      </div>
      <div style={{
        padding: '16px',
        paddingBottom: '0',
        paddingRight: '0',
        position: 'absolute',
        left: '245px',
        top: '32px',
      }}
      >
        <DisplayDropdown loader={props.loader} value={displayMode} setValue={setDisplayMode}
          allowedModes={[
            DisplayMode.Grid,
            DisplayMode.CompactGrid,
            DisplayMode.List,
            DisplayMode.Details,
            DisplayMode.Text,
            DisplayMode.TextIDs,
          ]}/>
        <GrouperDropdown loader={props.loader} value={grouper} setValue={setGrouper} />
        <div className="input-group" style={{
          display: 'inline-block',
          width: 'unset',
          marginLeft: '5px',
          marginBottom: '12px',
        }}>
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">Actions
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#"
              onMouseUp={(e) => e.button === 0 && props.onEditName()}>Edit Name</a></li>
            <li><a className="dropdown-item" href="#"
              onMouseUp={(e) => e.button === 0 && props.onBulkImport()}>Bulk Import</a></li>
            <li style={{position: 'relative', marginRight: '26px', width: '222px'}}>
              <a className={'dropdown-item ' + ((!exportReady || cardCount === 0) ? 'disabled' : '')}
                {...downloadProps}>Export to Tabletop Simulator</a>
              <a className="dropdown-item" style={{
                position: 'absolute',
                top: '0',
                right: '-26px',
                color: 'black',
                width: '26px',
                height: '32px',
                padding: '2px 5px 8px 5px',
              }} href="#" onMouseUp={(e) => e.button === 0 && props.onSettings()}><IconGear /></a></li>
            <li><a className={'dropdown-item ' + (tcgplayerLink === '' ? 'disabled' : '')}
              href={tcgplayerLink} target="_blank" rel="noreferrer">TCG Player</a></li>
            <li><a className="dropdown-item" href="#"
              onMouseUp={(e) => e.button === 0 && props.onClone()}>Clone Deck</a></li>
            <li><a className="dropdown-item" href="#"
              onMouseUp={(e) => e.button === 0 && props.onDelete()}>Delete Deck</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
