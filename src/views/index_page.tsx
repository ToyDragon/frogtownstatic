import HeaderBar from './components/header_bar';
import React, {useEffect, useRef, useState} from 'react';
import {Deck} from '../data/deck';
import SearchArea, {SearchAreaHandle} from './components/search_area';
import DeckArea from './components/deck_area';
import ImageLoadTracker from './components/image_load_tracker';
import URLLoader from './components/url_loader';
import HoverCardHandler from './components/hovercard_handler';
import EditNameWindow, {EditNameWindowHandle} from './components/edit_name_window';
import BulkImportWindow, {BulkImportWindowHandle} from './components/bulk_import_window';
import SettingsWindow, {SettingsWindowHandle} from './components/settings_window';
import LoadingWindow from './components/loading_window';
import {DataLoader} from '../data/data_loader';

function createNewDeck(num: number) {
  return {
    keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
    name: `Deck #${num}`,
    mainboard: [],
    sideboard: [],
  };
}

function copyDecks(decks: Deck[]): Deck[] {
  const newDecks: Deck[] = [];
  for (const deck of decks) {
    newDecks.push({
      name: deck.name,
      keycard: deck.keycard,
      mainboard: deck.mainboard.slice(),
      sideboard: deck.sideboard.slice(),
    });
  }
  return newDecks;
}

export default function indexPage(props: {
  loader: DataLoader,
  urlLoader: URLLoader,
  imageLoadTracker: ImageLoadTracker,
}) {
  const searchRef = useRef<SearchAreaHandle>(null);
  const [backgroundUrl, setBackgroundUrl] = useState(localStorage.getItem('background_url') || 'https://i.imgur.com/Hg8CwwU.jpeg');
  const [deckIndex, setDeckIndex] = useState<number>(Number(localStorage.getItem('deck_index') || '0'));
  const [decks, setDecks] = useState<Deck[]>(
      new Array(Number(localStorage.getItem('deck_count') || '1'))
          .fill(null).map((_, i) => {
            let deck = null;
            try {
              deck = JSON.parse(localStorage.getItem(`deck_${i}`) || 'null');
            } catch {}
            if (!deck) {
              deck = createNewDeck(i+1);
            }
            return deck;
          }),
  );
  const [searchWidth, setSearchWidth] = useState(550);
  const editNameWindowRef = useRef<EditNameWindowHandle>(null);
  const bulkImportWindowRef = useRef<BulkImportWindowHandle>(null);
  const settingsWindowRef = useRef<SettingsWindowHandle>(null);

  useEffect(() => {
    for (let i = 0; i < decks.length; i++) {
      localStorage.setItem(`deck_${i}`, JSON.stringify(decks[i]));
    }
    localStorage.setItem(`deck_count`, decks.length.toString());
  }, [decks]);

  useEffect(() => {
    localStorage.setItem(`deck_index`, deckIndex.toString());
  }, [deckIndex]);

  useEffect(() => {
    localStorage.setItem(`background_url`, backgroundUrl);
  }, [backgroundUrl]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    let dragging = false;
    let dragStartX = -1;
    let lastSearchWidth = searchWidth;
    body.addEventListener('mousedown', (e) => {
      for (const ele of document.elementsFromPoint(e.pageX, e.pageY)) {
        if (ele.id === 'searchDragBar') {
          dragging = true;
          dragStartX = e.pageX;
          e.preventDefault();
          return true;
        }
      }
      return false;
    });
    body.addEventListener('mouseup', () => {
      dragging = false;
    });
    body.addEventListener('mousemove', (e) => {
      if (dragging) {
        const xDiff = e.pageX - dragStartX;
        if (lastSearchWidth + xDiff >= 550 && lastSearchWidth + xDiff <= 1000) {
          dragStartX = e.pageX;
          lastSearchWidth += xDiff;
          setSearchWidth(lastSearchWidth);
        }
      }
    });
  }, []);

  const addCard = (cardId: string, toSideboard: boolean) => {
    const newDecks = copyDecks(decks);
    if (toSideboard) {
      newDecks[deckIndex].sideboard.push(cardId);
    } else {
      newDecks[deckIndex].mainboard.push(cardId);
    }
    setDecks(newDecks);
  };
  const addCards = (ids: string[]) => {
    const newDecks = copyDecks(decks);
    for (const cardId of ids) {
      newDecks[deckIndex].mainboard.push(cardId);
    }
    setDecks(newDecks);
  };
  const removeCard = (cardId: string, toSideboard: boolean) => {
    const newDecks = copyDecks(decks);
    if (toSideboard) {
      for (let i = 0; i < newDecks[deckIndex].sideboard.length; i++) {
        if (newDecks[deckIndex].sideboard[i] === cardId) {
          newDecks[deckIndex].sideboard.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < newDecks[deckIndex].mainboard.length; i++) {
        if (newDecks[deckIndex].mainboard[i] === cardId) {
          newDecks[deckIndex].mainboard.splice(i, 1);
          break;
        }
      }
    }
    setDecks(newDecks);
  };
  const moveCard = (cardId: string, toSideboard: boolean) => {
    const newDecks = copyDecks(decks);
    if (toSideboard) {
      for (let i = 0; i < newDecks[deckIndex].mainboard.length; i++) {
        if (newDecks[deckIndex].mainboard[i] === cardId) {
          newDecks[deckIndex].mainboard.splice(i, 1);
          break;
        }
      }
      newDecks[deckIndex].sideboard.push(cardId);
    } else {
      for (let i = 0; i < newDecks[deckIndex].sideboard.length; i++) {
        if (newDecks[deckIndex].sideboard[i] === cardId) {
          newDecks[deckIndex].sideboard.splice(i, 1);
          break;
        }
      }
      newDecks[deckIndex].mainboard.push(cardId);
    }
    setDecks(newDecks);
  };

  const onStar = (cardId: string) => {
    const newDecks = copyDecks(decks);
    newDecks[deckIndex].keycard = cardId;
    setDecks(newDecks);
  };

  const addDeck = () => {
    const newDecks = copyDecks(decks);
    newDecks.push(createNewDeck(newDecks.length + 1));
    setDecks(newDecks);
    setDeckIndex(newDecks.length - 1);
  };

  const deck = decks[deckIndex];
  return <>
    <HeaderBar loader={props.loader} decks={decks} changeDeck={(i: number) => {
      setDeckIndex(i);
    }} newDeck={addDeck} />
    <SearchArea ref={searchRef} loader={props.loader} urlLoader={props.urlLoader} addCard={(cardId: string) => {
      addCard(cardId, false);
    }} imageLoadTracker={props.imageLoadTracker} width={searchWidth} />
    <div id='searchDragBar' style={{
      position: 'fixed',
      left: `${searchWidth}px`,
      top: 'calc(50% - 32px)',
      width: '16px',
      height: '64px',
      backgroundColor: '#303b4c',
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
      cursor: 'col-resize',
    }}>
      <div style={{
        display: 'block',
        width: '2px',
        height: '54px',
        backgroundColor: 'lightgray',
        position: 'absolute',
        left: '6px',
        top: '5px',
      }}></div>
    </div>
    <div style={{
      display: 'inline-block',
      width: `calc(100% - ${searchWidth}px)`,
      height: '100%',
    }}>
      <DeckArea imageLoadTracker={props.imageLoadTracker} mainboardCards={deck.mainboard} keycard={deck.keycard}
        name={deck.name} sideboardCards={deck.sideboard} loader={props.loader} addCard={addCard} onStar={onStar}
        backUrl={backgroundUrl}
        onEditName={() => editNameWindowRef.current?.open(deck.name)}
        onBulkImport={() => bulkImportWindowRef.current?.open()}
        onSettings={() => settingsWindowRef.current?.open(backgroundUrl)}
        urlLoader={props.urlLoader} removeCard={removeCard} moveCard={moveCard} onSimilar={(cardId: string) => {
          if (searchRef.current) {
            searchRef.current.onSimilar(cardId);
          }
        }} />
    </div>
    <EditNameWindow ref={editNameWindowRef} nameChanged={(newName: string) => {
      const newDecks = copyDecks(decks);
      newDecks[deckIndex].name = newName;
      setDecks(newDecks);
    }} />
    <BulkImportWindow ref={bulkImportWindowRef} loader={props.loader} addCards={addCards} />
    <SettingsWindow ref={settingsWindowRef} loader={props.loader} setBackgroundUrl={setBackgroundUrl} />
    <HoverCardHandler loader={props.loader} />
    <LoadingWindow loader={props.loader} />
  </>;
}
