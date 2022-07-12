import {
  TTSDeck,
  TTSRootObjectState,
  standardTTSTransformForDeck,
  standardTTSTransformForCard,
} from './tts_deck';

export interface DeckDetails {
  boards: Board[];
  backURL: string;
}

export interface Board {
  name: string;
  cards: Card[];
  faceup?: boolean;
}

export interface Card {
  name: string;
  cardId: string;
  backCardId?: string;
}

export class Exporter {
  public constructor() {}

  private boardToState(
      backURL: string,
      board: Board,
      index: number,
      idToLargeImageURI: Record<string, string>,
  ): TTSRootObjectState {
    let state: TTSRootObjectState;
    if (board.cards.length === 1) {
      state = {
        Name: 'Card',
        CustomDeck: {},
        Transform: standardTTSTransformForDeck(),
      };
      state.Transform.posX += index * 2.2;
      if (board.faceup) {
        state.Transform.rotZ = 0;
      }

      let cardBackURL = backURL;
      if (board.cards[0].backCardId) {
        cardBackURL = idToLargeImageURI[board.cards[0].backCardId];
      }
      state.CustomDeck['1'] = {
        FaceURL: idToLargeImageURI[board.cards[0].cardId],
        BackURL: cardBackURL,
        NumHeight: 1,
        NumWidth: 1,
        BackIsHidden: true,
      };
      state.CardID = 100;
      state.Nickname = board.cards[0].name;
    } else {
      const cardIDToTTSCardID: { [cardId: string]: number } = {};
      state = {
        Name: 'DeckCustom',
        ContainedObjects: [],
        DeckIDs: [],
        CustomDeck: {},
        Transform: standardTTSTransformForDeck(),
      };
      state.Transform.posX += index * 2.2;
      if (board.faceup) {
        state.Transform.rotZ = 0;
      }

      let uniqueI = 0;
      for (let i = 0; i < board.cards.length; i++) {
        const cardId = board.cards[i].cardId;
        let ttsCardID = cardIDToTTSCardID[cardId];
        if (!cardIDToTTSCardID[cardId]) {
          uniqueI++;
          const deckID = uniqueI * 100;
          let cardBackURL = backURL;
          const backCardId = board.cards[i].backCardId;
          if (backCardId) {
            cardBackURL = idToLargeImageURI[backCardId];
          }
          state.CustomDeck[uniqueI.toString()] = {
            FaceURL: idToLargeImageURI[board.cards[i].cardId],
            BackURL: cardBackURL,
            NumHeight: 1,
            NumWidth: 1,
            BackIsHidden: true,
          };

          ttsCardID = deckID;
          cardIDToTTSCardID[cardId] = ttsCardID;
        }

        state.DeckIDs!.push(ttsCardID);
        state.ContainedObjects!.push({
          CardID: ttsCardID,
          Name: 'Card',
          Nickname: board.cards[i].name,
          Transform: standardTTSTransformForCard(),
        });
      }
    }

    return state;
  }

  public export(request: DeckDetails, idToLargeImageURI: Record<string, string>): TTSDeck {
    if (
      request.backURL === 'https://www.frogtown.me/Images/CardBack.jpg' ||
      request.backURL === 'https://www.frogtown.me/images/gatherer/CardBack.jpg'
    ) {
      const rootURL = window.location.href.split('/').slice(0, 3).join('/');
      request.backURL = rootURL + '/CardBack.jpg';
    }
    return {
      ObjectStates: request.boards.map((a, i) => {
        return this.boardToState(request.backURL, a, i, idToLargeImageURI);
      }),
    };
  }
}
