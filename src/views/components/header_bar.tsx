import React from 'react';
import {DataLoader} from '../../data/data_loader';
import {Deck} from '../../data/deck';
import HeaderDeckPreview from './header_deck_preview';

export default function HeaderBar(props: {
  loader: DataLoader,
  decks: Deck[],
  changeDeck: (index: number) => void
  newDeck: () => void,
}) {
  return (
    <div className="header" style={{
      position: 'absolute',
      width: '100%',
    }}>
      <a href={window.location.href} className="active header-item">Frogtown</a>
      <div className="dropdown" style={{display: 'inline-block'}}>
        <div className="btn dropdown-toggle header-item" data-bs-toggle="dropdown" aria-expanded="false"
          style={{
            'marginTop': '-12px',
            'marginBottom': '0',
          }}>
          My Decks <span className="caret" style={{marginLeft: '5px'}}></span>
        </div>
        <div className="dropdown-menu">
          <div style={{
            width: '700px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            maxHeight: '800px',
            padding: '0 5px',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}>
            <div>
              {
                props.decks.map((deck, i) => {
                  return <HeaderDeckPreview key={i} deck={deck} loader={props.loader} changeToDeck={() => {
                    props.changeDeck(i);
                  }}/>;
                })
              }
              <HeaderDeckPreview key={'newdeck'} deck={{
                keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
                name: 'New Deck',
                mainboard: [],
                sideboard: [],
              }} loader={props.loader} changeToDeck={() => {
                props.newDeck();
              }}/>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
