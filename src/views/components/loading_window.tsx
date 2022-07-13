import React, {useEffect} from 'react';
import {useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import IconCheck from '../bootstrap_icons/icon_check';

export default function loadingWindow(props: {loader: DataLoader}) {
  const [isOpen, setIsOpen] = useState(true);
  const [nameLoaded, setNameLoaded] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [cropsLoaded, setCropsLoaded] = useState(false);

  useEffect(() => {
    props.loader.getMapData('IDToName').then(() => setNameLoaded(true));
    props.loader.getMapData('IDToText').then(() => setTextLoaded(true));
    props.loader.getMapData('IDToNormalImageURI').then(() => setImagesLoaded(true));
    props.loader.getMapData('IDToCropImageURI').then(() => setCropsLoaded(true));

    Promise.all([
      props.loader.getMapData('IDToName'),
      props.loader.getMapData('IDToText'),
      props.loader.getMapData('IDToNormalImageURI'),
      props.loader.getMapData('IDToCropImageURI'),
    ]).then(() => {
      setIsOpen(false);
    });
  }, []);

  if (!isOpen) {
    return null;
  }

  return <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: '#00000070',
    zIndex: '6',
  }}>
    <div style={{
      width: '550px',
      height: '170px',
      position: 'absolute',
      left: 'calc(50% - 275px)',
      top: 'calc(50% - 85px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '18px',
      fontSize: '18px',
    }} onMouseUp={(e) => e.stopPropagation()}>
      <div style={{fontWeight: 'bold'}}>Loading data required for displaying your existing decks.</div>
      <div style={{paddingLeft: '12px'}}>Loading name data... {nameLoaded ? <IconCheck /> : <></>}</div>
      <div style={{paddingLeft: '12px'}}>Loading text data... {textLoaded ? <IconCheck /> : <></>}</div>
      <div style={{paddingLeft: '12px'}}>Loading image data... {imagesLoaded ? <IconCheck /> : <></>}</div>
      <div style={{paddingLeft: '12px'}}>Loading crop data... {cropsLoaded ? <IconCheck /> : <></>}</div>
    </div>
  </div>;
}
