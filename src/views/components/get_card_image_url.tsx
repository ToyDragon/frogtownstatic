import { DataLoader } from '../../data/data_loader';

export default function getCardImageUrl(cardId: string, loader: DataLoader): string {
  let result = 'https://gatherer.wizards.com/assets/card_back.webp';
  let mid: number | null = null;
  const idToMultiverseId = loader.getMapDataSync('IDToMultiverseId');
  if (idToMultiverseId) {
    mid = idToMultiverseId[cardId] || null;
    if (mid === null) {
      const name = loader.getMapDataSync('IDToName')![cardId];
      for (const otherId of ((loader.getMapDataSync('NameToID') || {})[name] || [])) {
        const otherMid = idToMultiverseId[otherId] || null;
        if (otherMid !== null) {
          mid = otherMid;
          break;
        }
      }
    }
  }
  const tokenIdToMultiverseIds = loader.getMapDataSync('TokenIDToMultiverseIds');
  if (mid === null && tokenIdToMultiverseIds && tokenIdToMultiverseIds[cardId]) {
    mid = tokenIdToMultiverseIds[cardId][0];
  }
  const backIdToMultiverseIds = loader.getMapDataSync('BackIDToMultiverseIds');
  if (mid === null && backIdToMultiverseIds && backIdToMultiverseIds[cardId]) {
    mid = backIdToMultiverseIds[cardId][0];
  }
  if (mid) {
    result = `https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${mid}`;
  }
  return result;
}
