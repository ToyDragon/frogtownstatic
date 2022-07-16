import HeaderBar from './components/header_bar';
import React, {useEffect, useRef, useState} from 'react';
import {createNewDeck, Deck} from '../data/deck';
import SearchArea from './components/search_area';
import DeckArea from './components/deck_area';
import ImageLoadTracker from './components/image_load_tracker';
import URLLoader from './components/url_loader';
import HoverCardHandler from './components/hovercard_handler';
import EditNameWindow, {EditNameWindowHandle} from './components/edit_name_window';
import BulkImportWindow, {BulkImportWindowHandle} from './components/bulk_import_window';
import SettingsWindow, {SettingsWindowHandle} from './components/settings_window';
import SecondaryLoadWindow from './components/secondary_load_window';
import LoadingWindow from './components/loading_window';
import {DataLoader} from '../data/data_loader';
import ConfirmDeleteWindow, {ConfirmDeleteWindowHandle} from './components/confirm_delete_window';
import DeckDropHandler from './components/deck_drop_handler';
import InfoWindow, {InfoWindowHandle} from './components/info_window';
import SwapPrintingsWindow, {SwapPrintingsWindowHandle} from './components/swap_printings_window';
import loadLegacyDecksInitial, {loadLegacyDecksForPublicId} from './legacy_deck_loader';

function copyDecks(decks: Deck[]): Deck[] {
  const newDecks: Deck[] = [];
  for (const deck of decks) {
    newDecks.push({
      name: deck.name,
      keycard: deck.keycard,
      mainboard: deck.mainboard.slice(),
      sideboard: deck.sideboard.slice(),
      backgroundUrl: deck.backgroundUrl || 'https://i.imgur.com/Hg8CwwU.jpeg',
    });
  }
  return newDecks;
}

function uniques(vals: string[]): string[] {
  const obj: Record<string, boolean> = {};
  for (const val of vals) {
    obj[val] = true;
  }
  return Object.keys(obj);
}

export default function indexPage(props: {
  loader: DataLoader,
  urlLoader: URLLoader,
  imageLoadTracker: ImageLoadTracker,
}) {
  // Call getMapData with the maps required to display the page, to ensure they always start loading first.
  const priorityMaps = [
    props.loader.getMapData('IDToName'),
    props.loader.getMapData('IDToText'),
    props.loader.getMapData('IDToNormalImageURI'),
    props.loader.getMapData('IDToCropImageURI'),
  ];
  props.loader.holdUntil(Promise.all(priorityMaps));

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
  const confirmDeleteWindowRef = useRef<ConfirmDeleteWindowHandle>(null);
  const infoWindowRef = useRef<InfoWindowHandle>(null);
  const swapPrintingsWindowRef = useRef<SwapPrintingsWindowHandle>(null);
  const [legacyPublicId, setLegacyPublicId] = useState('');
  const [legacyBetaPublicId, setLegacyBetaPublicId] = useState('');

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

    loadLegacyDecksInitial(copyDecks(decks),
        setLegacyPublicId,
        setLegacyBetaPublicId,
        window.location.search,
        document.cookie,
        props.urlLoader,
        {
          getItem: localStorage.getItem,
          setItem: localStorage.setItem,
        }).then((newDecks) => {
      if (newDecks && JSON.stringify(newDecks) !== JSON.stringify(decks)) {
        setDecks(newDecks);
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

  const setBackgroundUrl = (newUrl: string) => {
    const newDecks = copyDecks(decks);
    newDecks[deckIndex].backgroundUrl = newUrl;
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

  const swapCard = (fromId: string, toId: string) => {
    const newDecks = copyDecks(decks);
    console.log('Swap from ', fromId, toId);
    newDecks[deckIndex].mainboard = newDecks[deckIndex].mainboard.map((id) => (id === fromId ? toId : id));
    newDecks[deckIndex].sideboard = newDecks[deckIndex].sideboard.map((id) => (id === fromId ? toId : id));
    setDecks(newDecks);
  };

  const deleteConfirmed = () => {
    const newDecks = copyDecks(decks);
    newDecks.splice(deckIndex, 1);
    if (newDecks.length === 0) {
      newDecks.push(createNewDeck(1));
      setDeckIndex(0);
    } else if (deckIndex >= newDecks.length) {
      setDeckIndex(newDecks.length - 1);
    }
    setDecks(newDecks);
  };

  const deck = decks[deckIndex];
  return <>
    <HeaderBar loader={props.loader} decks={decks} changeDeck={(i: number) => {
      setDeckIndex(i);
    }} newDeck={addDeck} onInfo={() => infoWindowRef.current!.open(legacyPublicId, legacyBetaPublicId)} />
    <SearchArea loader={props.loader} urlLoader={props.urlLoader} addCard={(cardId: string) => {
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
        backUrl={deck.backgroundUrl}
        onEditName={() => editNameWindowRef.current?.open(deck.name)}
        onBulkImport={() => bulkImportWindowRef.current?.open()}
        onSettings={() => {
          const existingUrls = decks.map((d) => d.backgroundUrl).filter((url) => !!url);
          existingUrls.splice(0, 0, 'https://i.imgur.com/Hg8CwwU.jpeg');
          return settingsWindowRef.current?.open(uniques(existingUrls), deck.backgroundUrl);
        }}
        onDelete={() => confirmDeleteWindowRef.current?.open(deck.name)}
        urlLoader={props.urlLoader} removeCard={removeCard} moveCard={moveCard} onSimilar={(cardId: string) => {
          if (swapPrintingsWindowRef.current) {
            swapPrintingsWindowRef.current.open(cardId);
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
    <ConfirmDeleteWindow deleteConfirmed={deleteConfirmed} ref={confirmDeleteWindowRef} />
    <InfoWindow ref={infoWindowRef} onReexport={async (publicId: string) => {
      const newDecks = await loadLegacyDecksForPublicId(publicId, copyDecks(decks), props.urlLoader);
      if (newDecks && JSON.stringify(newDecks) !== JSON.stringify(decks)) {
        setDecks(newDecks);
      }
    }} />
    <SecondaryLoadWindow loader={props.loader} />
    <SwapPrintingsWindow ref={swapPrintingsWindowRef} addCard={(id) => addCard(id, false)} loader={props.loader}
      imageLoadTracker={props.imageLoadTracker} urlLoader={props.urlLoader} swapCard={swapCard} />
    <DeckDropHandler loader={props.loader} addDeck={(deck: Deck) => {
      for (let i = 0; i < decks.length; i++) {
        const existingDeck = decks[i];
        if (deck.mainboard.sort().join(',') === existingDeck.mainboard.sort().join(',') &&
          deck.sideboard.sort().join(',') === existingDeck.sideboard.sort().join(',')) {
          setDeckIndex(i);
          console.log('Selected existing ' + i);
          return;
        }
      }

      const newDecks = copyDecks(decks);
      newDecks.push(deck);
      setDecks(newDecks);
      setDeckIndex(newDecks.length - 1);
    }} />
  </>;
}
