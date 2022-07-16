import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import Debouncer from '../../data/debouncer';
import executeFilter, {FilterData} from '../../data/execute_filter';
import {MapData} from '../../data/map_data';
import IconCheck from '../bootstrap_icons/icon_check';
import IconFilter from '../bootstrap_icons/icon_filter';
import IconPageText from '../bootstrap_icons/icon_page_text';
import IconSearch from '../bootstrap_icons/icon_search';
import CardArea from './card_area';
import DisplayDropdown, {DisplayMode} from './display_dropdown';
import FilterDatalist from './filters/filter_datalist';
import FilterMapCategory from './filters/filter_map_category';
import FilterText from './filters/filter_text';
import ImageLoadTracker from './image_load_tracker';
import URLLoader from './url_loader';

function initFilterData(): FilterData {
  return {
    name: '',
    text: '',
    rarity: {mode: 'all', values: {}, no_others: false},
    artist: '',
    color: {mode: 'all', values: {}, no_others: false},
    color_identity: {mode: 'all', values: {}, no_others: true},
    super_type: {mode: 'any', values: {}, no_others: false},
    sub_type: '',
    type: {mode: 'any', values: {}, no_others: false},
    legal_format: {mode: 'any', values: {}, no_others: false},
    power: '',
    toughness: '',
    cmc: '',
    set: '',
    show_duplicates: false,
    sort_by_release: false,
    exact_name_match: false,
  };
}

function MiscFilterOption(props: {
  maps: (keyof MapData)[],
  loader: DataLoader,
  value: boolean,
  setValue: (value: boolean) => void,
  children?: React.ReactNode,
}) {
  const [disabled, setDisabled] = useState(true);
  if (disabled) {
    const mapPromises: Promise<unknown>[] = [];
    for (const map of props.maps) {
      mapPromises.push(props.loader.getMapData(map));
    }
    Promise.all(mapPromises).then(() => {
      setDisabled(false);
    });
  }
  return (
    <li style={{
      backgroundColor: disabled ? 'gray' : 'transparent',
    }}><a className="dropdown-item" href="#" onMouseUp={() => {
        if (!disabled) {
          props.setValue(!props.value);
        }
      }}>{props.children} <IconCheck visible={props.value} /></a></li>
  );
}

function initEnabledFilters(): Record<'misc' | keyof FilterData, boolean> {
  return {
    name: true,
    text: true,
    rarity: false,
    artist: false,
    color: false,
    color_identity: false,
    super_type: false,
    sub_type: false,
    type: false,
    legal_format: false,
    power: false,
    toughness: false,
    cmc: false,
    set: false,
    show_duplicates: false, // unused
    sort_by_release: false, // unused
    exact_name_match: false, // unused
    misc: false,
  };
}

const debouncer = new Debouncer(150, document);


export type SearchAreaHandle = {
  onSimilar: (id: string) => void,
};

type SearchAreaProps = {
  imageLoadTracker: ImageLoadTracker,
  loader: DataLoader,
  urlLoader: URLLoader,
  width: number,
  addCard: (id: string) => void,
  onSwap: (id: string) => void,
};

const SearchArea = forwardRef<SearchAreaHandle, SearchAreaProps>(function SearchArea(
    props: SearchAreaProps,
    ref: ForwardedRef<SearchAreaHandle>,
) {
  const [displayMode, setDisplayMode] = useState(DisplayMode.SingleGrid);
  const [filterData, setFilterData] = useState<FilterData>(initFilterData());
  const [enabledFilters, setEnabledFilters] =
    useState<Record<'misc' | keyof FilterData, boolean>>(initEnabledFilters());
  const [results, setResults] = useState<string[]>([]);

  const setFilterDataAndExecute = async (newFilterData: FilterData) => {
    setFilterData(newFilterData);
    if (await debouncer.waitAndShouldAct()) {
      setResults(await executeFilter(newFilterData, props.loader));
    }
  };

  const setFilterDataAndExecuteImmediately = async (newFilterData: FilterData) => {
    setFilterData(newFilterData);
    debouncer.forceAct();
    setResults(await executeFilter(newFilterData, props.loader));
  };

  // Helper that builds a function that sets the value in the filterData for a specific key, and keeps all other values
  // the same. If no other changes are made in the debounce period, it executes the filter and applies the results.
  const filterDataSetter = (key: keyof FilterData) => {
    return async (value: any) => {
      const newFilterData = {...filterData};
      (newFilterData[key] as unknown) = value;
      // Strings are typed on the keyboard character by character, so we use the debouncer to reduce jumpy-ness while
      // typing. That is not necessary when clicking dropdown items.
      if (typeof initFilterData()[key] === 'string') {
        setFilterDataAndExecute(newFilterData);
      } else {
        setFilterDataAndExecuteImmediately(newFilterData);
      }
    };
  };

  // Helper that creates a list item for toggling whther
  const createToggleFilterItem = (text: string, key: 'misc' | keyof FilterData) => {
    return (
      <li><a className="dropdown-item" href="#" onMouseUp={() => {
        const newEnabledFilters = {...enabledFilters};
        newEnabledFilters[key] = !newEnabledFilters[key];
        setEnabledFilters(newEnabledFilters);
        if (key !== 'misc') {
          filterDataSetter(key)(initFilterData()[key]);
        } else {
          filterDataSetter('sort_by_release')(initFilterData()['sort_by_release']);
          filterDataSetter('show_duplicates')(initFilterData()['show_duplicates']);
        }
      }}>
        {text} <IconCheck visible={enabledFilters[key]} /></a>
      </li>
    );
  };

  const onSimilar = async (cardId: string) => {
    const idToName = await props.loader.getMapData('IDToName');
    const newFilterData = initFilterData();
    newFilterData['name'] = idToName![cardId];
    newFilterData['show_duplicates'] = true;
    newFilterData['exact_name_match'] = true;
    setFilterDataAndExecute(newFilterData);

    const newEnabledFilters = {...enabledFilters};
    newEnabledFilters['misc'] = true;
    setEnabledFilters(newEnabledFilters);
  };

  useImperativeHandle(ref, () => ({
    onSimilar: (id: string) => {
      onSimilar(id);
    },
  }));

  let miscValueDisplay = [
    filterData.show_duplicates ? 'Show Duplicates' : '',
    filterData.sort_by_release ? 'Sort by Release' : '',
    filterData.exact_name_match ? 'Match Name Exactly' : '',
  ].filter((a) => !!a).join(', ');
  if (miscValueDisplay.length) {
    miscValueDisplay = ` (${miscValueDisplay})`;
  }

  return (
    <div style={{
      width: `${props.width}px`,
      height: 'calc(100% - 64px)',
      overflowY: 'scroll',
      marginTop: '64px',
      display: 'inline-block',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Create filters. */}
        <div style={{
          paddingTop: '12px',
          paddingLeft: '12px',
          width: '100%',
          backgroundColor: '#303b4c',
          flexGrow: '0',
        }}
        >
          <FilterText maps={['IDToName']} visible={true} loader={props.loader}
            value={filterData.name} setValue={filterDataSetter('name')}>
            <IconSearch />&nbsp;Name
          </FilterText>
          <FilterText maps={['IDToText']} loader={props.loader} visible={enabledFilters['text']}
            value={filterData.text} setValue={filterDataSetter('text')}>
            <IconPageText />&nbsp;Text
          </FilterText>
          <FilterMapCategory map={'IDToRarity'} loader={props.loader} visible={enabledFilters['rarity']}
            value={filterData.rarity} setValue={filterDataSetter('rarity')} multiSelect={false}
            bannedValues={{'bonus': true}}>
          Rarity
          </FilterMapCategory>
          <FilterDatalist map={'SetCodeToSetName'} otherRequiredMaps={['IDToSetCode']} loader={props.loader}
            visible={enabledFilters['set']} value={filterData.set} setValue={filterDataSetter('set')}>
          Set
          </FilterDatalist>
          <FilterText maps={['IDToArtist']} loader={props.loader} visible={enabledFilters['artist']}
            value={filterData.artist} setValue={filterDataSetter('artist')}>
            <IconPageText />&nbsp;Artist
          </FilterText>
          <FilterMapCategory map={'IDToColor'} loader={props.loader} visible={enabledFilters['color']}
            value={filterData.color} setValue={filterDataSetter('color')} multiSelect={true} categories={[
              {value: 'W', display: <><img src="icons/ManaW.jpg" style={{marginTop: '-5px'}} /> White</>},
              {value: 'U', display: <><img src="icons/ManaU.jpg" style={{marginTop: '-5px'}} /> Blue</>},
              {value: 'B', display: <><img src="icons/ManaB.jpg" style={{marginTop: '-5px'}} /> Black</>},
              {value: 'R', display: <><img src="icons/ManaR.jpg" style={{marginTop: '-5px'}} /> Red</>},
              {value: 'G', display: <><img src="icons/ManaG.jpg" style={{marginTop: '-5px'}} /> Green</>},
            ]}>
          Color
          </FilterMapCategory>
          <FilterMapCategory map={'IDToColorIdentity'} loader={props.loader} visible={enabledFilters['color_identity']}
            value={filterData.color_identity} setValue={filterDataSetter('color_identity')} multiSelect={true}
            categories={[
              {value: 'W', display: <><img src="icons/ManaW.jpg" style={{marginTop: '-5px'}} /> White</>},
              {value: 'U', display: <><img src="icons/ManaU.jpg" style={{marginTop: '-5px'}} /> Blue</>},
              {value: 'B', display: <><img src="icons/ManaB.jpg" style={{marginTop: '-5px'}} /> Black</>},
              {value: 'R', display: <><img src="icons/ManaR.jpg" style={{marginTop: '-5px'}} /> Red</>},
              {value: 'G', display: <><img src="icons/ManaG.jpg" style={{marginTop: '-5px'}} /> Green</>},
            ]}>
          Color Identity
          </FilterMapCategory>
          <FilterMapCategory map={'IDToSupertype'} loader={props.loader} visible={enabledFilters['super_type']}
            value={filterData.super_type} setValue={filterDataSetter('super_type')} multiSelect={false}>
          SuperType
          </FilterMapCategory>
          <FilterMapCategory map={'IDToType'} loader={props.loader} visible={enabledFilters['type']}
            value={filterData.type} setValue={filterDataSetter('type')} multiSelect={true}
            bannedValues={{
              'Eaturecray': true, 'Scariest': true, 'You': true, 'instant': true, 'Summon': true, 'Wolf': true,
              'Elemental': true, 'Dragon': true, 'Jaguar': true, 'Knights': true, 'Goblin': true,
            }}>
          Type
          </FilterMapCategory>
          <FilterText maps={['IDToSubtype']} loader={props.loader} visible={enabledFilters['sub_type']}
            value={filterData.sub_type} setValue={filterDataSetter('sub_type')}>
            <IconPageText />&nbsp;SubType
          </FilterText>
          <FilterText maps={['IDToPower']} loader={props.loader} visible={enabledFilters['power']}
            value={filterData.power} setValue={filterDataSetter('power')} placeholder="3-4" >
            <IconPageText />&nbsp;Power
          </FilterText>
          <FilterText maps={['IDToToughness']} loader={props.loader} visible={enabledFilters['toughness']}
            value={filterData.toughness} setValue={filterDataSetter('toughness')} placeholder="3-4" >
            <IconPageText />&nbsp;Toughness
          </FilterText>
          <FilterText maps={['IDToCMC']} loader={props.loader} visible={enabledFilters['cmc']}
            value={filterData.cmc} setValue={filterDataSetter('cmc')} placeholder="3-4" >
            <IconPageText />&nbsp;CMC
          </FilterText>
          <FilterMapCategory map={'IDToLegalFormat'} loader={props.loader} visible={enabledFilters['legal_format']}
            value={filterData.legal_format} setValue={filterDataSetter('legal_format')} multiSelect={false}
            bannedValues={{
              'duel': true, 'paupercommander': true, 'historicbrawl': true, 'gladiator': true, 'oldschool': true,
              'premodern': true, 'future': true,
            }}>
          Legallity
          </FilterMapCategory>
          {/* Misc filter. */}
          <div className="input-group" style={{
            display: enabledFilters['misc'] ? 'inline-block' : 'none',
            width: 'unset',
            marginLeft: '5px',
          }}>
            <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false">
              <div style={{display: 'inline-block'}}>Misc
                <span style={{fontSize: '12px'}}>{miscValueDisplay}</span></div>
            </button>
            <ul className="dropdown-menu">
              <MiscFilterOption loader={props.loader} maps={['IDToName']}
                value={filterData.show_duplicates} setValue={filterDataSetter('show_duplicates')}>
              Show Duplicates
              </MiscFilterOption>
              <MiscFilterOption loader={props.loader} maps={['IDToSetCode', 'SetCodeToRelease']}
                value={filterData.sort_by_release} setValue={filterDataSetter('sort_by_release')}>
              Sort By Release
              </MiscFilterOption>
              <MiscFilterOption loader={props.loader} maps={['IDToName']}
                value={filterData.exact_name_match} setValue={filterDataSetter('exact_name_match')}>
              Match Name Exactly
              </MiscFilterOption>
            </ul>
          </div>
          {/* Create dropdown to choose which filters are displayed. */}
          <div className="input-group" style={{
            display: 'inline-block',
            width: '105px',
            marginLeft: '5px',
          }}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
              aria-expanded="false"><IconFilter /> Filters </button>
            <ul className="dropdown-menu">
              {createToggleFilterItem('Text', 'text')}
              {createToggleFilterItem('Rarity', 'rarity')}
              {createToggleFilterItem('Set', 'set')}
              {createToggleFilterItem('Artist', 'artist')}
              {createToggleFilterItem('Color', 'color')}
              {createToggleFilterItem('Color Identity', 'color_identity')}
              {createToggleFilterItem('SuperType', 'super_type')}
              {createToggleFilterItem('Type', 'type')}
              {createToggleFilterItem('SubType', 'sub_type')}
              {createToggleFilterItem('Power', 'power')}
              {createToggleFilterItem('Toughness', 'toughness')}
              {createToggleFilterItem('CMC', 'cmc')}
              {createToggleFilterItem('Legality', 'legal_format')}
              {createToggleFilterItem('Misc', 'misc')}
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onMouseUp={() => {
                setEnabledFilters(initEnabledFilters());
                setFilterDataAndExecute(initFilterData());
              }}>Clear Filters</a></li>
              <li><a className="dropdown-item" href="#" onMouseUp={() => {
                const newEnabledFilters: any = {...enabledFilters};
                for (const key in newEnabledFilters) {
                  if (!newEnabledFilters[key]) {
                    newEnabledFilters[key] = true;
                  }
                }
                setEnabledFilters(newEnabledFilters);
              }}>Show All</a></li>
            </ul>
          </div>
          <DisplayDropdown loader={props.loader} value={displayMode} setValue={setDisplayMode}
            allowedModes={[
              DisplayMode.SingleGrid,
              DisplayMode.SmallList,
              DisplayMode.SmallDetails,
            ]}/>
        </div>
        <div style={{
          width: '100%',
          flexGrow: '1',
          overflowY: 'scroll',
        }}>
          {/* Create card area for the results. */}
          <CardArea imageLoadTracker={props.imageLoadTracker} cardIds={results} displayMode={displayMode}
            loader={props.loader} urlLoader={props.urlLoader} actionHandlers={{
              onAdd: (cardId: string) => {
                props.addCard(cardId);
              },
              onSimilar: onSimilar,
              onSwap: props.onSwap,
            }} />
        </div>
      </div>
    </div>
  );
});

export default SearchArea;
