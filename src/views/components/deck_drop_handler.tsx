import React, {useEffect, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import Debouncer from '../../data/debouncer';
import {Deck} from '../../data/deck';
import {TTSDeck} from '../exporter/tts_deck';


export default function DeckDropHandler(
    props: {
      addDeck: (deck: Deck) => void,
      loader: DataLoader,
    },
) {
  const [showingIndicator, setShowingIndicator] = useState(false);

  useEffect(() => {
    const debouncer = new Debouncer(200, document);
    document.body.addEventListener('dragover', async () => {
      document.body.classList.add('dragging');
      if (await debouncer.waitAndShouldAct()) {
        document.body.classList.remove('dragging');
      }
    });

    const styleEle = document.createElement('style');
    styleEle.innerHTML = `
      .dragtarget {
        pointer-events: none;
      }
      body.dragging .dragtarget {
        pointer-events: all;
      }`,
    document.body.append(styleEle);
  }, []);

  return <div className="dragtarget" style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '9999',
    top: '0',
    left: '0',
  }}
  onDrop={(e) => {
    setShowingIndicator(false);
    e.preventDefault();

    const idToLargeImageURI = props.loader.getMapDataSync('IDToLargeImageURI');
    if (!idToLargeImageURI) {
      return;
    }
    const filesToRead: File[] = [];
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          if (file && file.name.endsWith('.json')) {
            filesToRead.push(file);
          }
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        if (file && file.name.endsWith('.json')) {
          filesToRead.push(file);
        }
      }
    }

    const fileReadPromises: Promise<{name: string, contents: string}>[] = [];
    for (const file of filesToRead) {
      fileReadPromises.push(new Promise<{name: string, contents: string}>((resolve) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = () => {
          resolve({
            name: file.name.replace(/\.json$/, ''),
            contents: (reader.result?.toString() || ''),
          });
        };
      }));
    }

    const idRegex = /([a-z0-9-]{36})/;
    Promise.all(fileReadPromises).then((fileDatas) => {
      for (const fileData of fileDatas) {
        console.log('Parsing ' + fileData.name);
        try {
          const parsedDeck: TTSDeck = JSON.parse(fileData.contents);
          const mainboard: string[] = [];
          const sideboard: string[] = [];
          for (const stack of parsedDeck.ObjectStates) {
            const localIdToCount: Record<number, number> = {};
            if (stack.ContainedObjects) {
              for (const card of stack.ContainedObjects) {
                if (card.CardID % 100 !== 0) {
                  throw new Error(`Invalid card id ${card.CardID}`);
                }
                const localId = Math.floor(card.CardID/100);
                localIdToCount[localId] = (localIdToCount[localId] || 0) + 1;
              }
            } else if (stack.CardID) {
              if (stack.CardID % 100 !== 0) {
                throw new Error(`Invalid card id ${stack.CardID}`);
              }
              const localId = Math.floor(stack.CardID/100);
              localIdToCount[localId] = (localIdToCount[localId] || 0) + 1;
            }

            const localIdToId: Record<number, string> = {};
            if (stack.CustomDeck) {
              for (const localId in stack.CustomDeck) {
                if (stack.CustomDeck[localId]) {
                  const parseResult = idRegex.exec(stack.CustomDeck[localId].FaceURL);
                  const id = (parseResult && parseResult[1]) || '';
                  if (!id) {
                    throw new Error(`Couldn't parse id from url ${stack.CustomDeck[localId].FaceURL}`);
                  }
                  if (!idToLargeImageURI[id]) {
                    // Ignore tokens and double faced cards.
                    continue;
                  }
                  localIdToId[Number(localId)] = id;
                }
              }
            }

            const boardToAddTo = mainboard.length === 0 ? mainboard : sideboard;
            for (const localId in localIdToCount) {
              if (!localIdToId[localId]) {
                // ID won't be present for tokens or double faced cards.
                continue;
              }
              const newCards = new Array(localIdToCount[localId]).fill(localIdToId[localId]);
              boardToAddTo.splice(boardToAddTo.length, 0, ...newCards);
            }
          }

          console.log(mainboard);
          console.log(sideboard);
          if (mainboard.length > 0) {
            props.addDeck({
              keycard: mainboard[0],
              mainboard,
              sideboard,
              name: fileData.name || 'new deck',
            });
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }}
  onDragOver={(e) => e.preventDefault()}
  onDragEnter={() => setShowingIndicator(true)}
  onDragEnd={() => setShowingIndicator(false)}
  onDragExit={() => setShowingIndicator(false)}
  onDragLeave={() => setShowingIndicator(false)}>
    {!showingIndicator ? null :
      <div style={{
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000aa',
      }}>
        <div style={{
          pointerEvents: 'none',
          width: '1000px',
          height: '300px',
          position: 'absolute',
          top: 'calc(50% - 150px)',
          left: 'calc(50% - 500px)',
          color: 'white',
          backgroundColor: '#000000aa',
          borderRadius: '18px',
          fontSize: '64px',
        }}>
          <div style={{textAlign: 'center', marginTop: '64px'}}>DROP .JSON FILES ANYWHERE</div>
          <div style={{textAlign: 'center'}}>TO IMPORT EXISTING DECKS</div>
        </div>
      </div>
    }
  </div>;
}
