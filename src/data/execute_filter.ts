import {DataLoader} from './data_loader';
import executeNumberRangeFilter from './execute_number_range_filter';

export interface MultiValue {
  values: Record<string, boolean>;
  mode: 'any' | 'all';
  no_others: boolean;
}

export interface FilterData {
  name: string;
  text: string;
  rarity: MultiValue;
  artist: string;
  color: MultiValue;
  color_identity: MultiValue;
  super_type: MultiValue;
  sub_type: string;
  type: MultiValue;
  legal_format: MultiValue;
  power: string;
  toughness: string;
  cmc: string;
  set: string;
  sort_by_release: boolean;
  show_duplicates: boolean;
  exact_name_match: boolean;
}

function cleanName(name: string): string {
  return name.replace(/[,_-]/g, '').toLowerCase();
}

export function rankStringMatch(potentialMatch: string, filterText: string): number {
  if (!potentialMatch) {
    return -1;
  }
  if (potentialMatch === filterText) {
    return 1;
  }
  potentialMatch = cleanName(potentialMatch);
  filterText = cleanName(filterText);
  if (potentialMatch === filterText) {
    return 2;
  }
  if (potentialMatch.indexOf(filterText) >= 0) {
    return 100 - filterText.length;
  }

  const subMatches = [
    0, // 1 char
    0, // 2 char
    0, // trigram
  ];
  for (let matchLen = 1; matchLen <= 3; matchLen++) {
    for (const word of filterText.split(' ')) {
      for (let i = 0; i < word.length + 1 - matchLen; i++) {
        const submatch = word.substring(i, i + matchLen);
        if (potentialMatch.indexOf(submatch) >= 0) {
          subMatches[matchLen-1]++;
        }
      }
    }
  }
  if (subMatches[0] + subMatches[1] + subMatches[2] > 0) {
    return 100000 - subMatches[2] * 100 - subMatches[1] * 10 - subMatches[0];
  }
  return -1;
}

function stringFilter(
    cardIds: string[],
    map: Record<string, string | string[]> | null,
    filterValue: string,
    skipSort: boolean,
): boolean {
  if (!filterValue || !map) {
    return false;
  }

  const idToRank: Record<string, number> = {};
  for (const id of cardIds) {
    let cardValue = map[id];
    if (!cardValue) {
      continue;
    }
    if (typeof cardValue !== 'string') {
      cardValue = cardValue.join(' ');
    }
    const rank = rankStringMatch(cardValue, filterValue);
    if (rank >= 0) {
      idToRank[id] = rank;
    }
  }

  for (let i = cardIds.length - 1; i >= 0; i--) {
    if (!idToRank[cardIds[i]]) {
      cardIds.splice(i, 1);
    }
  }

  if (!skipSort) {
    cardIds.sort((a, b) => idToRank[a] - idToRank[b]);
  }
  return true;
}

function exactStringFilter(
    cardIds: string[],
    map: Record<string, string> | Record<string, string[]> | null,
    filterValue: string,
): boolean {
  if (!map || !filterValue) {
    return false;
  }
  filterValue = cleanName(filterValue);
  for (let i = cardIds.length - 1; i >= 0; i--) {
    let matchFound = false;
    const cardVal = map[cardIds[i]];
    if (typeof cardVal === 'string') {
      matchFound = filterValue === cleanName(cardVal);
    } else if (cardVal) {
      for (const val of cardVal) {
        if (filterValue === cleanName(val)) {
          matchFound = true;
          break;
        }
      }
    }
    if (!matchFound) {
      cardIds.splice(i, 1);
    }
  }
  return true;
}

function substringFilter(
    cardIds: string[],
    map: Record<string, string> | Record<string, string[]> | null,
    filterValue: string,
    skipSort: boolean,
): boolean {
  if (!map || !filterValue) {
    return false;
  }
  const filterValueWords = filterValue.split(' ').map((val) => cleanName(val));
  const idToMatches: Record<string, number> = {};
  let highestMatchCount = 0;
  for (let i = cardIds.length - 1; i >= 0; i--) {
    let matches = 0;
    let cardVal = map[cardIds[i]];
    if (typeof cardVal === 'string') {
      cardVal = [cardVal];
    }
    if (cardVal) {
      for (const filterWord of filterValueWords) {
        for (const val of cardVal) {
          if (cleanName(val).indexOf(filterWord) >= 0) {
            matches++;

            // Only match on each filter word once. IE if the user enters 'war', don't
            // double count it for a 'dWARf WARrior'
            break;
          }
        }
      }
    }
    idToMatches[cardIds[i]] = matches;
    if (matches > highestMatchCount) {
      highestMatchCount = matches;
    }
  }

  if (!skipSort) {
    cardIds.sort((a, b) => idToMatches[b] - idToMatches[a]);
  }
  for (let i = cardIds.length - 1; i >= 0; i--) {
    if (idToMatches[cardIds[i]] < highestMatchCount) {
      cardIds.splice(i, 1);
    }
  }
  return true;
}

function categoryFilter(
    cardIds: string[],
    map: Record<string, string[] | string> | null,
    filterValue: MultiValue,
): boolean {
  if (!map) {
    return false;
  }

  let allowedCount = 0;
  const allowedValues: Record<string, boolean> = {};
  for (const value in filterValue.values) {
    if (filterValue.values[value]) {
      allowedValues[value] = true;
      allowedCount++;
    }
  }
  if (allowedCount === 0) {
    return false;
  }

  for (let i = cardIds.length - 1; i >= 0; --i) {
    if (!map[cardIds[i]]) {
      cardIds.splice(i, 1);
      continue;
    }
    let values = map[cardIds[i]];
    if (typeof values === 'string') {
      values = [values];
    }

    let matchesFound = 0;
    let mismatchesFound = 0;
    for (const value of values) {
      if (allowedValues[value]) {
        matchesFound++;
      } else {
        mismatchesFound++;
      }
    }

    if ((filterValue.mode === 'all' && matchesFound < allowedCount) ||
      (filterValue.mode === 'any' && matchesFound === 0) ||
      (filterValue.no_others && mismatchesFound > 0)) {
      cardIds.splice(i, 1);
    }
  }

  return true;
}

export default async function executeFilter(
    data: FilterData,
    loader: DataLoader,
): Promise<string[]> {
  const idToName = (await loader.getMapData('IDToName'))!;
  const seenName: Record<string, boolean> = {};
  const cardIds: string[] = [];
  for (const id in idToName) {
    if (!data.show_duplicates && seenName[idToName[id]]) {
      continue;
    }
    seenName[idToName[id]] = true;
    cardIds.push(id);
  }

  let anyFilterApplied = false;

  const tryApplyFilter = (result: boolean) => {
    anyFilterApplied = anyFilterApplied || result;
    return result;
  };

  let anySortableExecuted = false;
  /* eslint-disable max-len */
  if (!data.exact_name_match) {
    anySortableExecuted = anySortableExecuted || tryApplyFilter(stringFilter(cardIds, idToName!, data.name.trim(), anySortableExecuted));
  } else {
    anySortableExecuted = anySortableExecuted || tryApplyFilter(exactStringFilter(cardIds, idToName!, data.name.trim()));
  }
  anySortableExecuted = anySortableExecuted || tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToText'), data.text.trim(), anySortableExecuted));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToRarity'), data.rarity));
  anySortableExecuted = anySortableExecuted || tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToArtist'), data.artist.trim(), anySortableExecuted));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColor'), data.color));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColorIdentity'), data.color_identity));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToType'), data.type));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToSupertype'), data.super_type));
  anySortableExecuted = anySortableExecuted || tryApplyFilter(substringFilter(cardIds, loader.getMapDataSync('IDToSubtype'), data.sub_type.trim(), anySortableExecuted));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToLegalFormat'), data.legal_format));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToPower'), data.power.trim()));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToToughness'), data.toughness.trim()));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToCMC'), data.cmc.trim()));
  tryApplyFilter(exactStringFilter(cardIds, loader.getMapDataSync('IDToSetCode'), data.set.trim()));
  /* eslint-enable max-len */

  if (!anyFilterApplied) {
    return [];
  }

  if (!anySortableExecuted) {
    if (data.sort_by_release) {
      const idToSetCode = loader.getMapDataSync('IDToSetCode');
      const setCodeToRelease = loader.getMapDataSync('SetCodeToRelease');
      if (idToSetCode && setCodeToRelease) {
        cardIds.sort((a, b) => {
          const aRelease = new Date(setCodeToRelease[idToSetCode[a]]).getTime();
          const bRelease = new Date(setCodeToRelease[idToSetCode[b]]).getTime();
          return bRelease - aRelease;
        });
      }
    } else {
      cardIds.sort((a, b) => {
        return idToName[a].localeCompare(idToName[b]);
      });
    }
  }

  // Ensure a maximum of 200 cards is displayed.
  cardIds.splice(200, cardIds.length - 200);
  return cardIds;
}
