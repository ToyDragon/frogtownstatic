import React, {useState} from 'react';
import {DataLoader} from '../../../data/data_loader';
import {MapData} from '../../../data/map_data';

export default function FilterText(props: {
  maps: (keyof MapData)[],
  visible: boolean,
  loader: DataLoader,
  value: string,
  placeholder?: string,
  setValue: (value: string) => void,
  children?: React.ReactNode,
}) {
  const [disabled, setDisabled] = useState(true);
  if (disabled) {
    const mapPromises: Promise<any>[] = [];
    for (const map of props.maps) {
      mapPromises.push(props.loader.getMapData(map));
    }
    Promise.all(mapPromises).then(() => {
      setDisabled(false);
    });
  }
  return (
    <div style={{
      display: props.visible ? 'inline-block' : 'none',
      width: '250px',
      verticalAlign: 'top',
      marginBottom: '12px',
      fontSize: '16px',
      marginLeft: '5px',
    }}>
      <div className="input-group">
        <div className="input-group-text">{props.children}</div>
        <input type="text" className="form-control" value={props.value} disabled={disabled}
          placeholder={props.placeholder || ''} onChange={(e) => {
            props.setValue(e.target.value);
          }} />
      </div>
    </div>
  );
}
