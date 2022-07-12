import React, {useId, useState} from 'react';
import {DataLoader} from '../../../data/data_loader';
import {CardIDMap, MapData} from '../../../data/map_data';

export default function FilterDatalist(props: {
  map: keyof MapData,
  otherRequiredMaps: (keyof MapData)[],
  loader: DataLoader,
  visible: boolean,
  value: string,
  setValue: (value: string) => void,
  children?: React.ReactNode,
}) {
  const [mapValues, setMapValues] = useState<{
    value: string,
    display: string,
  }[]>([]);
  if (mapValues.length === 0) {
    const mapPromises: Promise<any>[] = [];
    mapPromises.push(props.loader.getMapData(props.map));
    for (const map of props.otherRequiredMaps) {
      mapPromises.push(props.loader.getMapData(map));
    }
    Promise.all(mapPromises).then(() => {
      const mapData = props.loader.getMapDataSync(props.map);
      if (!mapData) {
        return;
      }
      const allValues: { value: string, display: string }[] = [];
      for (const id in mapData) {
        allValues.push({
          value: id,
          display: (mapData as CardIDMap<string>)[id],
        });
      }
      setMapValues(allValues);
    });
  }

  const id = useId();
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
        <datalist id={id}>
          {
            mapValues.map((val) => {
              return <option key={val.value} value={val.value}>{val.display}</option>;
            })
          }
        </datalist>
        <input type="text" list={id} className="form-control" disabled={mapValues.length === 0} onChange={(e) => {
          props.setValue(e.target.value);
        }} />
      </div>
    </div>
  );
}
