import React, {useEffect, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import IconCheck from '../bootstrap_icons/icon_check';

/* eslint-disable no-unused-vars */
export enum Grouper {
  Color,
  Type,
  CMC,
};
/* eslint-enable no-unused-vars */

export default function GrouperDropdown(props: {
  loader: DataLoader,
  value: Grouper | null,
  setValue: (value: Grouper | null) => void,
}) {
  const [colorEnabled, setColorEnabled] = useState(false);
  const [typeEnabled, setTypeEnabled] = useState(false);
  const [cmcEnabled, setCMCEnabled] = useState(false);

  useEffect(() => {
    props.loader.getMapData('IDToColor').then(() => {
      setColorEnabled(true);
    });
    props.loader.getMapData('IDToType').then(() => {
      setTypeEnabled(true);
    });
    props.loader.getMapData('IDToCMC').then(() => {
      setCMCEnabled(true);
    });
  }, []);

  const createGrouperItem =
    (grouper: Grouper, enabled: boolean) => {
      return (
        <li key={grouper} style={{
          backgroundColor: enabled ? 'transparent' : 'lightgray',
        }}><a className="dropdown-item" href="#" onMouseUp={() => {
            if (enabled) {
              if (props.value === grouper) {
                props.setValue(null);
              } else {
                props.setValue(grouper);
              }
            }
          }}>{Grouper[grouper]} <IconCheck visible={props.value === grouper} /></a></li>
      );
    };

  return (
    <div className="input-group" style={{
      display: 'inline-block',
      width: 'unset',
      marginLeft: '5px',
      marginBottom: '12px',
    }}>
      <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
        aria-expanded="false">Grouper
        <span style={{fontSize: '12px', marginLeft: '4px'}}>
          ({typeof props.value === 'number' ? Grouper[props.value] : 'none'})</span>
      </button>
      <ul className="dropdown-menu">
        {createGrouperItem(Grouper.Color, colorEnabled)}
        {createGrouperItem(Grouper.Type, typeEnabled)}
        {createGrouperItem(Grouper.CMC, cmcEnabled)}
      </ul>
    </div>
  );
}
