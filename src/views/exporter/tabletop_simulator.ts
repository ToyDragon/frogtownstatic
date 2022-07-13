import {DataLoader} from '../../data/data_loader';
import * as TTSExport from './exporter';

export default class TableTopSimulator {
  private exporter!: TTSExport.Exporter;
  private dl!: DataLoader;

  public ready: Promise<void>;

  public constructor(dl: DataLoader) {
    this.exporter = new TTSExport.Exporter();
    this.dl = dl;
    let resolver!: () => void;
    this.ready = new Promise<void>((resolve) => {
      resolver = resolve;
    });
    Promise.all([
      dl.getMapData('IDToName'),
      dl.getMapData('IDToTokenStrings'),
      dl.getMapData('IDToLargeImageURI'),
      dl.getMapData('TokenIDToTokenString'),
      dl.getMapData('TokenIDToName'),
      dl.getMapData('TokenIDToLargeImageURI'),
      dl.getMapData('FrontIDToBackID'),
      dl.getMapData('BackIDToLargeImageURI'),
    ]).then(() => {
      setTimeout(resolver, 0);
    });
  }

  private getTokens(mainboardIds: string[], sideboardIds: string[]): string[] {
    const tokens = [];
    const uniquetokens: Record<string, boolean> = {};
    const allCandidates = mainboardIds.concat(sideboardIds);
    const IDToTokenStringMap = this.dl.getMapDataSync('IDToTokenStrings');
    if (!IDToTokenStringMap) {
      return [];
    }

    const TokenIDToTokenStringMap = this.dl.getMapDataSync('TokenIDToTokenString') as Record<string, string>;
    if (!TokenIDToTokenStringMap) {
      return [];
    }

    const TokenStringToTokenIDMap: Record<string, string> = {};
    for (const tokenId in TokenIDToTokenStringMap) {
      TokenStringToTokenIDMap[TokenIDToTokenStringMap[tokenId]] = tokenId;
    }

    for (const cardId of allCandidates) {
      const oneCardTokens = IDToTokenStringMap[cardId];
      if (oneCardTokens) {
        for (const tokenString of oneCardTokens) {
          const tokenId = TokenStringToTokenIDMap[tokenString];
          if (tokenId && !uniquetokens[tokenId]) {
            uniquetokens[tokenId] = true;
            tokens.push(tokenId);
          }
        }
      }
    }

    return tokens;
  }

  public exportDeck(mainboardIds: string[], sideboardIds: string[], backURL: string): string {
    const idToLargeImageURI = this.dl.getMapDataSync('IDToLargeImageURI')!;
    const tokenIDToLargeImageURI = this.dl.getMapDataSync('TokenIDToLargeImageURI')!;
    const backIDToLargeImageURI = this.dl.getMapDataSync('BackIDToLargeImageURI')!;
    const tokenCardIds = this.getTokens(mainboardIds, sideboardIds);
    const mainboard: TTSExport.Board = {
      cards: [],
      name: 'Mainboard',
    };
    const sideboard: TTSExport.Board = {
      cards: [],
      name: 'Sideboard',
    };
    const tokenboard: TTSExport.Board = {
      cards: [],
      name: 'Tokens',
      faceup: true,
    };
    const flippableboard: TTSExport.Board = {
      cards: [],
      name: 'Flippables',
      faceup: true,
    };

    const processOneCard = (cardId: string, board: TTSExport.Board) => {
      board.cards.push({
        cardId: cardId,
        name: this.getCardName(cardId),
      });
      const reverseCard = this.getBackCardId(cardId);
      if (reverseCard) {
        flippableboard.cards.push({
          cardId: cardId,
          backCardId: reverseCard,
          name: this.getCardName(cardId),
        });
      }
    };

    for (const id of mainboardIds) {
      processOneCard(id, mainboard);
    }
    for (const id of sideboardIds) {
      processOneCard(id, sideboard);
    }
    for (const id of tokenCardIds) {
      processOneCard(id, tokenboard);
    }

    const compiledDeck = this.exporter.export({
      boards: [mainboard, sideboard, tokenboard, flippableboard].filter((b) => {
        return b.cards.length > 0;
      }),
      backURL: backURL,
    }, (id) => {
      return idToLargeImageURI[id] ||
          tokenIDToLargeImageURI[id] ||
          backIDToLargeImageURI[id];
    });

    return JSON.stringify(compiledDeck);
  }

  private getCardName(cardId: string): string {
    const IDToNameMap = this.dl.getMapDataSync('IDToName');
    if (IDToNameMap && IDToNameMap[cardId]) {
      return IDToNameMap[cardId];
    }
    const TokenIDToNameMap = this.dl.getMapDataSync('TokenIDToName');
    if (TokenIDToNameMap && TokenIDToNameMap[cardId]) {
      return TokenIDToNameMap[cardId];
    }
    return '';
  }

  private getBackCardId(cardId: string): string {
    const FrontIDToBackIDMap = this.dl.getMapDataSync('FrontIDToBackID');
    if (FrontIDToBackIDMap && FrontIDToBackIDMap[cardId]) {
      return FrontIDToBackIDMap[cardId];
    }
    return '';
  }
}
