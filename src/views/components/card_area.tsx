import React, {useEffect, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import CardGroup from './card_group';
import {DisplayMode} from './display_dropdown';
import {Grouper} from './grouper_dropdown';
import ImageLoadTracker from './image_load_tracker';
import tryStartLazyBackgroundLoader from './lazy_background_loader';
import URLLoader from './url_loader';

export function groupModeSingleGrid(cardIds: string[]): string[][] {
  const groups: string[][] = [];
  for (const cardId of cardIds) {
    groups.push([cardId]);
  }
  return groups;
}

export function groupModeGrid(cardIds: string[], getName: (id: string) => string): string[][] {
  const groups: string[][] = [];
  const ids = cardIds.slice().sort((a, b) => {
    return getName(a).localeCompare(getName(b));
  });
  let group: string[] = [];
  let groupName = '';
  for (const cardId of ids) {
    const cardName = getName(cardId);
    if (cardName != groupName || group.length === 4) {
      if (group.length > 0) {
        groups.push(group);
      }
      group = [];
      groupName = cardName;
    }
    group.push(cardId);
  }
  if (group.length > 0) {
    groups.push(group);
  }
  return groups;
}

export function groupModeCompactGrid(cardIds: string[], getName: (id: string) => string): string[][] {
  const groups: string[][] = [];
  const ids = cardIds.slice().sort((a, b) => {
    return getName(a).localeCompare(getName(b));
  });
  let group: string[] = [];
  for (const cardId of ids) {
    if (group.length === 8) {
      groups.push(group);
      group = [];
    }
    group.push(cardId);
  }
  if (group.length > 0) {
    groups.push(group);
  }
  return groups;
}

function splitByGroups(loader: DataLoader, grouper: Grouper | null | undefined, cardIds: string[]) {
  const result: {
    allCardIds: string[],
    stacks: string[][],
    name: string,
  }[] = [];

  if (typeof grouper !== 'number') {
    result.push({
      name: '',
      stacks: [],
      allCardIds: cardIds.slice(),
    });
  } else {
    const cardsByValue: Record<string, string[]> = {};
    const idToCMC = loader.getMapDataSync('IDToCMC')!;
    const idToColor = loader.getMapDataSync('IDToColor')!;
    const idToType = loader.getMapDataSync('IDToType')!;
    for (const id of cardIds) {
      let val = '';
      if (grouper === Grouper.CMC) {
        val = idToCMC[id] + '';
      }
      if (grouper === Grouper.Color) {
        val = (idToColor[id] || []).map((symbol) => {
          if (symbol === 'W') return 'White';
          if (symbol === 'U') return 'Blue';
          if (symbol === 'B') return 'Black';
          if (symbol === 'R') return 'Red';
          if (symbol === 'G') return 'Green';
          if (symbol === 'C') return 'Colorless';
          return symbol;
        }).join(' ') || 'Colorless';
      }
      if (grouper === Grouper.Type) {
        val = (idToType[id] || []).join(' ');
      }

      cardsByValue[val] = cardsByValue[val] || [];
      cardsByValue[val].push(id);
    }

    for (const value in cardsByValue) {
      result.push({
        name: value,
        stacks: [],
        allCardIds: cardsByValue[value],
      });
    }
  }

  return result;
}

export default function CardArea(props: {
  cardIds: string[],
  incrementalLoad?: boolean,
  loader: DataLoader,
  urlLoader: URLLoader,
  displayMode: DisplayMode,
  grouper?: Grouper | null,
  imageLoadTracker: ImageLoadTracker,
  actionHandlers: {
    onAdd?: (cardId: string) => void,
    onRemove?: (cardId: string) => void,
    onSimilar?: (cardId: string) => void,
    onSideboard?: (cardId: string) => void,
    onMainboard?: (cardId: string) => void,
    onStar?: (cardId: string) => void,
    onSwap?: (cardId: string) => void,
  }
}) {
  const [cardCount, setCardCount] = useState(props.cardIds.length);
  const [cardLimit, setCardLimit] = useState(200);
  if (props.cardIds.length !== cardCount) {
    console.log('setting new len ', cardCount, props.cardIds.length);
    setCardCount(props.cardIds.length);
    setCardLimit(200);
  }

  tryStartLazyBackgroundLoader(props.imageLoadTracker);
  const setImageMapLoaded = useState(false)[1];
  useEffect(() => {
    props.loader.getMapData('IDToNormalImageURI').then(() => {
      setImageMapLoaded(true);
    });
  }, []);

  const setNameMapLoaded = useState(false)[1];
  useEffect(() => {
    props.loader.getMapData('IDToName').then(() => {
      setNameMapLoaded(true);
    });
  }, []);

  const nameMap = props.loader.getMapDataSync('IDToName');
  const getName = (cardId: string) => {
    if (nameMap && nameMap[cardId]) {
      return nameMap[cardId];
    }
    return cardId;
  };

  const shownCards = props.incrementalLoad ? props.cardIds.slice(0, cardLimit) : props.cardIds;

  const groups = splitByGroups(props.loader, props.grouper, shownCards);
  for (const group of groups) {
    if (props.displayMode === DisplayMode.SingleGrid) {
      group.stacks = groupModeSingleGrid(group.allCardIds);
    } else if (props.displayMode === DisplayMode.Grid) {
      group.stacks = groupModeGrid(group.allCardIds, getName);
    } else if (props.displayMode === DisplayMode.CompactGrid) {
      group.stacks = groupModeCompactGrid(group.allCardIds, getName);
    } else if (props.displayMode !== DisplayMode.SmallDetails && props.displayMode !== DisplayMode.SmallList) {
      // Don't sort by name in the search pane modes. Those are ordered by the filters in a meaningful way.
      group.stacks.push(group.allCardIds.slice().sort((a, b) => {
        return getName(a).localeCompare(getName(b));
      }));
    } else {
      group.stacks.push(group.allCardIds.slice());
    }
  }
  const countPerGroup: Record<string, number> = {};
  let runningCount = 0;
  return (
    <div style={{
      paddingTop: '16px',
      paddingLeft: '11px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth:
        (props.displayMode === DisplayMode.List || props.displayMode === DisplayMode.Details) ? '1000px' : '100%',
    }}>
      {
        groups.map((group) => {
          return [
            group.name ? <div key={`key ${group.name}`} style={{
              width: '100%',
              fontSize: '32px',
              paddingLeft: '24px',
            }}>{group.name} ({group.stacks.map((s) => s.length).reduce((a, b) => a + b)})</div> : null,
            group.stacks.map((stack) => {
              const groupName = group.name + ' ' + stack.join(',');
              countPerGroup[groupName] = countPerGroup[groupName] || 0;
              const result = <CardGroup key={groupName+'_'+(countPerGroup[groupName]++)} loader={props.loader}
                urlLoader={props.urlLoader} cardIds={stack} imageLoadTracker={props.imageLoadTracker}
                displayMode={props.displayMode} actionHandlers={props.actionHandlers} previousCount={runningCount} />;
              runningCount += stack.length;
              return result;
            })];
        })
      }
      {
        shownCards.length >= props.cardIds.length ? null :
          <div style={{
            paddingTop: '75px',
            paddingBottom: '75px',
            width: 'calc(100% - 32px)',
            position: 'relative',
          }}>
            <button className="btn btn-primary" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} onClick={(e)=>{
              if (e.button === 0) {
                setCardLimit(cardLimit + 200);
              }
            }}>Show More Cards</button>
          </div>
      }
    </div>
  );
}
