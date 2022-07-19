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
): Record<string, number> | null {
  if (!filterValue || !map) {
    return null;
  }

  const exactTokens: string[] = [];
  const exactRegex = /"([^"]+)"/;
  let filterValueWithNoExacts = filterValue;
  while (true) {
    const match = exactRegex.exec(filterValueWithNoExacts);
    if (!match) {
      break;
    }

    filterValueWithNoExacts = filterValueWithNoExacts.replace(`"${match[1]}"`, '');
    exactTokens.push(match[1].toLowerCase());
  }

  if (exactTokens.length) {
    console.log(exactTokens);
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

    const lowerCardValue = cardValue.toLowerCase();
    for (const exactToken of exactTokens) {
      if (lowerCardValue.indexOf(exactToken) === -1) {
        idToRank[id] = -1;
        break;
      } else {
        console.log(id, lowerCardValue, exactToken, lowerCardValue.indexOf(exactToken));
      }
    }
    if (idToRank[id] === -1) {
      continue;
    }

    const rank = rankStringMatch(cardValue, filterValue);
    if (rank >= 0) {
      idToRank[id] = rank;
    }
  }

  return idToRank;
}

function exactStringFilter(
    cardIds: string[],
    map: Record<string, string> | Record<string, string[]> | null,
    filterValue: string,
): Record<string, number> | null {
  if (!map || !filterValue) {
    return null;
  }
  const ranking: Record<string, number> = {};
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
    ranking[cardIds[i]] = matchFound ? 1 : -1;
  }
  return ranking;
}

function substringFilter(
    cardIds: string[],
    map: Record<string, string> | Record<string, string[]> | null,
    filterValue: string,
): Record<string, number> | null {
  if (!map || !filterValue) {
    return null;
  }
  const filterValueWords = filterValue.split(' ').map((val) => cleanName(val));
  const idToScore: Record<string, number> = {};
  let highestScore = 0;
  for (let i = cardIds.length - 1; i >= 0; i--) {
    let score = 0;
    let cardVal = map[cardIds[i]];
    if (typeof cardVal === 'string') {
      cardVal = [cardVal];
    }
    if (cardVal) {
      for (const filterWord of filterValueWords) {
        for (const val of cardVal) {
          const cleanVal = cleanName(val);

          // Only match on each filter word once. IE if the user enters 'war', don't
          // double count it for a 'dWARf WARrior'
          if (cleanVal.split(' ').indexOf(filterWord)) {
            score += 10;
            break;
          }
          if (cleanVal.indexOf(filterWord) >= 0) {
            score++;
            break;
          }
        }
      }
    }
    if (score) {
      idToScore[cardIds[i]] = score;
      if (score > highestScore) {
        highestScore = score;
      }
    }
  }

  const rank: Record<string, number> = {};
  for (const id in idToScore) {
    rank[id] = 1 + highestScore - idToScore[id];
  }
  return rank;
}

function categoryFilter(
    cardIds: string[],
    map: Record<string, string[] | string> | null,
    filterValue: MultiValue,
): Record<string, number> | null {
  if (!map) {
    return null;
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
    return null;
  }

  const ranking: Record<string, number> = {};
  for (let i = cardIds.length - 1; i >= 0; --i) {
    const id = cardIds[i];
    if (!map[id]) {
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

    if (!filterValue.no_others || mismatchesFound === 0) {
      if ((filterValue.mode === 'all' && matchesFound >= allowedCount) ||
          (filterValue.mode === 'any' && matchesFound > 0)) {
        ranking[id] = 1;
      }
    }
  }

  return ranking;
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
  let anySortApplied = false;
  const cumulativeScores: Record<string, number> = {};
  const tryApplyFilter = (ranking: Record<string, number> | null) => {
    if (!ranking) {
      return;
    }

    anyFilterApplied = true;
    for (let i = cardIds.length - 1; i >= 0; i--) {
      if (!ranking[cardIds[i]] || ranking[cardIds[i]] <= 0) {
        cardIds.splice(i, 1);
      }
    }

    const sortedIds = cardIds.slice(0, cardIds.length)
        .filter((a) => ranking[a] > 0)
        .sort((a, b) => ranking[a] - ranking[b]);

    // Meta Ranking prevents low cardinality results from bopping unlucky cards. For example,
    // if 10000 cards match a filter for "type is creature", don't penalize the unlucky 9900 of them
    // that weren't in the first 100 cards.
    const rankToMetaRanking: Record<number, number> = {};
    const metaRankCount: Record<number, number> = {};
    let currentMetaRank = 0;
    for (let i = 0; i < sortedIds.length; i++) {
      if (!rankToMetaRanking[ranking[sortedIds[i]]]) {
        rankToMetaRanking[ranking[sortedIds[i]]] = ++currentMetaRank;
        metaRankCount[currentMetaRank] = 1;
      } else {
        metaRankCount[currentMetaRank]++;
      }
    }

    // Find the first metarank not overlapping with the 100 best fit cards.
    let maxIncludedMetaRank = currentMetaRank + 1;
    let runningTotal = 0;
    for (let i = 1; i <= currentMetaRank; i++) {
      if (runningTotal >= 100) {
        maxIncludedMetaRank = i;
        break;
      }
      runningTotal += metaRankCount[i];
    }

    // Binary filters don't give meaningful sorting, so they need secondary sorting later.
    if (currentMetaRank > 2) {
      anySortApplied = true;
    }

    for (let i = 0; i < sortedIds.length; i++) {
      const metaRank = rankToMetaRanking[ranking[sortedIds[i]]];
      // Score is a number from 0 to 100. 0 for the lowest meta rank, 100 for the highest included metarank.
      const score = 1 + 99 * Math.min(metaRank - 1, maxIncludedMetaRank - 1) / Math.max(maxIncludedMetaRank - 1, 1);
      cumulativeScores[sortedIds[i]] = (cumulativeScores[sortedIds[i]] || 1) * score;
    }
  };

  /* eslint-disable max-len */
  if (!data.exact_name_match) {
    tryApplyFilter(stringFilter(cardIds, idToName!, data.name.trim()));
  } else {
    tryApplyFilter(exactStringFilter(cardIds, idToName!, data.name.trim()));
  }
  tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToText'), data.text.trim()));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToRarity'), data.rarity));
  tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToArtist'), data.artist.trim()));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColor'), data.color));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColorIdentity'), data.color_identity));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToType'), data.type));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToSupertype'), data.super_type));
  tryApplyFilter(substringFilter(cardIds, loader.getMapDataSync('IDToSubtype'), data.sub_type.trim()));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToLegalFormat'), data.legal_format));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToPower'), data.power.trim()));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToToughness'), data.toughness.trim()));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToCMC'), data.cmc.trim()));
  tryApplyFilter(exactStringFilter(cardIds, loader.getMapDataSync('IDToSetCode'), data.set.trim()));
  /* eslint-enable max-len */

  if (!anyFilterApplied) {
    return [];
  }

  if (anySortApplied) {
    cardIds.sort((a, b) => cumulativeScores[a] - cumulativeScores[b]);
  } else {
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
        const aNoArenaPrefix = idToName[a].replace(/^A-/, '');
        const bNoArenaPrefix = idToName[b].replace(/^A-/, '');
        return aNoArenaPrefix.localeCompare(bNoArenaPrefix);
      });
    }
  }

  return cardIds;
}
