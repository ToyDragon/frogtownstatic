import React, {useEffect, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import IconCheck from '../bootstrap_icons/icon_check';

/* eslint-disable no-unused-vars */
export enum DisplayMode {
  SingleGrid,
  Grid,
  CompactGrid,
  SmallList,
  List,
  SmallDetails,
  Details,
  Text,
  TextIDs,
};
/* eslint-enable no-unused-vars */

function displayModeName(displayMode: DisplayMode): string {
  if (displayMode === DisplayMode.Grid ||
    displayMode === DisplayMode.SingleGrid) {
    return 'Grid';
  }

  if (displayMode === DisplayMode.CompactGrid) {
    return 'Compact Grid';
  }

  if (displayMode === DisplayMode.SmallList ||
    displayMode === DisplayMode.List) {
    return 'List';
  }

  if (displayMode === DisplayMode.SmallDetails ||
    displayMode === DisplayMode.Details) {
    return 'Details';
  }

  if (displayMode === DisplayMode.Text) {
    return 'Text';
  }

  if (displayMode === DisplayMode.TextIDs) {
    return 'Text IDs';
  }

  return '';
}

export default function DisplayDropdown(props: {
  loader: DataLoader,
  allowedModes: DisplayMode[],
  value: DisplayMode,
  setValue: (value: DisplayMode) => void,
}) {
  const [listEnabled, setListEnabled] = useState(false);
  const [detailsEnabled, setDetailsEnabled] = useState(false);
  const [textEnabled, setTextEnabled] = useState(false);

  useEffect(() => {
    Promise.all([
      props.loader.getMapData('IDToName'),
      props.loader.getMapData('IDToText'),
      props.loader.getMapData('IDToSetCode'),
      props.loader.getMapData('IDToCost'),
      props.loader.getMapData('IDToPower'),
      props.loader.getMapData('IDToToughness'),
      props.loader.getMapData('IDToType'),
      props.loader.getMapData('IDToSupertype'),
      props.loader.getMapData('IDToSubtype'),
    ]).then(() => {
      setDetailsEnabled(true);
    });

    Promise.all([
      props.loader.getMapData('IDToName'),
      props.loader.getMapData('IDToSetCode'),
      props.loader.getMapData('IDToCost'),
      props.loader.getMapData('IDToPower'),
      props.loader.getMapData('IDToToughness'),
    ]).then(() => {
      setListEnabled(true);
    });

    Promise.all([
      props.loader.getMapData('IDToName'),
      props.loader.getMapData('IDToSetCode'),
    ]).then(() => {
      setTextEnabled(true);
    });
  }, []);

  const createModeItem = (mode: DisplayMode, enabled: boolean) => {
    if (props.allowedModes.indexOf(mode) < 0) {
      return null;
    }
    return (
      <li key={mode} style={{
        backgroundColor: enabled ? 'transparent' : 'lightgray',
      }}><a className="dropdown-item" href="#" onMouseUp={() => {
          if (enabled) {
            props.setValue(mode);
          }
        }}>{displayModeName(mode)} <IconCheck visible={props.value === mode} /></a></li>
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
        aria-expanded="false">Display Mode
        <span style={{fontSize: '12px', marginLeft: '4px'}}>({displayModeName(props.value)})</span>
      </button>
      <ul className="dropdown-menu">
        {createModeItem(DisplayMode.SingleGrid, true)}
        {createModeItem(DisplayMode.Grid, true)}
        {createModeItem(DisplayMode.CompactGrid, true)}
        {createModeItem(DisplayMode.List, listEnabled)}
        {createModeItem(DisplayMode.SmallList, listEnabled)}
        {createModeItem(DisplayMode.Details, detailsEnabled)}
        {createModeItem(DisplayMode.SmallDetails, detailsEnabled)}
        {createModeItem(DisplayMode.Text, textEnabled)}
        {createModeItem(DisplayMode.TextIDs, textEnabled)}
      </ul>
    </div>
  );
}
