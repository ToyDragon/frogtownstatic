import React, {useState} from 'react';
import {DataLoader} from '../../../data/data_loader';
import {MultiValue} from '../../../data/execute_filter';
import {MapData} from '../../../data/map_data';
import IconCheck from '../../bootstrap_icons/icon_check';

export default function FilterMapCategory(props: {
  map: keyof MapData,
  loader: DataLoader,
  visible: boolean,
  multiSelect: boolean,
  categories?: { value: string, display: React.ReactNode }[],
  bannedValues?: Record<string, boolean>,
  value: MultiValue,
  setValue: (value: MultiValue) => void,
  children?: React.ReactNode,
}) {
  const [mapValues, setMapValues] = useState<string[]>([]);
  if (mapValues.length === 0) {
    props.loader.getMapData(props.map).then((mapData: any) => {
      const seenValues: Record<any, boolean> = {};
      const allValues: string[] = [];
      for (const id in mapData) {
        let values = mapData[id];
        if (typeof values === 'string') {
          values = [values];
        }
        for (const value of values) {
          if (!value ||
            value === 'undefined' ||
            seenValues[value] ||
            (props.bannedValues && props.bannedValues[value])) {
            continue;
          }
          seenValues[value] = true;
          allValues.push(value);
        }
      }
      setMapValues(allValues);
    });
  }

  const map = props.loader.getMapDataSync(props.map);
  const toggleValue = (value: string) => {
    return () => {
      const newValue: MultiValue = {
        mode: props.value.mode,
        values: {},
        no_others: props.value.no_others,
      };

      // Copy values from old data forward.
      if (props.multiSelect) {
        for (const key in props.value.values) {
          newValue.values[key] = true;
        }
      } else {
        if (props.value.values[value]) {
          newValue.values[value] = true;
        }
      }

      // Toggle the specified key.
      if (newValue.values[value]) {
        delete newValue.values[value];
      } else {
        newValue.values[value] = true;
      }

      props.setValue(newValue);
    };
  };

  const setMode = (mode: 'any' | 'all') => {
    return () => {
      props.setValue({
        mode: mode,
        values: props.value.values,
        no_others: props.value.no_others,
      });
    };
  };

  return (
    <div className="input-group" style={{
      display: props.visible ? 'inline-block' : 'none',
      width: 'unset',
      marginLeft: '5px',
      marginBottom: '12px',
    }}>
      <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown"
        aria-expanded="false" disabled={mapValues.length === 0}>
        {props.children}
        {
          (() => {
            if (props.categories) {
              return props.categories.map((category) => {
                return props.value.values[category.value] ?
                  <span key={category.value} style={{fontSize: '12px', marginLeft: '4px', textTransform: 'capitalize'}}>
                    ({category.display})</span> :
                  null;
              });
            }

            if (map) {
              return mapValues.map((value: string) => {
                return props.value.values[value] ?
                  <span key={value} style={{fontSize: '12px', marginLeft: '4px', textTransform: 'capitalize'}}>
                    ({value})</span> :
                    null;
              });
            }

            return null;
          })()
        }
      </button>
      <ul className="dropdown-menu">
        {
          (() => {
            if (props.categories) {
              return props.categories.map((category) => {
                return <li key={category.value}><a className="dropdown-item" href="#"
                  onMouseUp={toggleValue(category.value)} style={{
                    textTransform: 'capitalize',
                  }}>{category.display} <IconCheck visible={!!props.value.values[category.value]} /></a></li>;
              });
            }

            if (map) {
              return mapValues.map((value: string) => {
                return <li key={value}><a className="dropdown-item" href="#" onMouseUp={toggleValue(value)} style={{
                  textTransform: 'capitalize',
                }}>{value} <IconCheck visible={!!props.value.values[value]} /></a></li>;
              });
            }

            return null;
          })()
        }
        {
          !props.multiSelect ? null : <>
            <li><hr className="dropdown-divider" /></li>
            <li key="mode_all"><a className="dropdown-item" href="#" onMouseUp={setMode('all')}>
              All Selected<IconCheck visible={props.value.mode === 'all'} /></a>
            </li>
            <li key="mode_any"><a className="dropdown-item" href="#" onMouseUp={setMode('any')}>
              Any Selected <IconCheck visible={props.value.mode === 'any'} /></a>
            </li>
            <li key="mode_others"><a className="dropdown-item" href="#" onMouseUp={() => {
              props.setValue({
                mode: props.value.mode,
                values: props.value.values,
                no_others: !props.value.no_others,
              });
            }}>No Others <IconCheck visible={props.value.no_others} /></a></li>
          </>
        }
      </ul>
    </div>
  );
}
