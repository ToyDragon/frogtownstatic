import { DataLoader } from '../../data/data_loader';

export default function getCardImageUrl(cardId: string, loader: DataLoader): string {
  let result = 'https://gatherer.wizards.com/assets/card_back.webp';
  let mid: number[] = [];
  const idToMultiverseIds = loader.getMapDataSync('IDToMultiverseIds');
  if (idToMultiverseIds) {
    mid = idToMultiverseIds[cardId];
    if (!mid) {
      const name = loader.getMapDataSync('IDToName')![cardId];
      for (const otherId of ((loader.getMapDataSync('NameToID') || {})[name] || [])) {
        const otherMid = idToMultiverseIds[otherId];
        if ((otherMid || []).length > 0) {
          mid = otherMid;
          break;
        }
      }
    }
  }
  const tokenIdToMultiverseIds = loader.getMapDataSync('TokenIDToMultiverseIds');
  if (!mid && tokenIdToMultiverseIds) {
    mid = tokenIdToMultiverseIds[cardId];
  }
  const backIdToMultiverseIds = loader.getMapDataSync('BackIDToMultiverseIds');
  if (!mid && backIdToMultiverseIds) {
    mid = backIdToMultiverseIds[cardId];
  }
  if (mid) {
    result = `https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${mid[0]}`;
  }
  return result;
}
