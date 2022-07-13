import React, { useEffect } from 'react';
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
    props.loader.getMapData('IDToLargeImageURI').then(() => setImagesLoaded(true));
    props.loader.getMapData('IDToCropImageURI').then(() => setCropsLoaded(true));

    Promise.all([
      props.loader.getMapData('IDToName'),
      props.loader.getMapData('IDToText'),
      props.loader.getMapData('IDToLargeImageURI'),
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
      width: '400px',
      height: '200px',
      position: 'absolute',
      left: 'calc(50% - 200px)',
      top: 'calc(50% - 100px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '18px',
      fontSize: '18px',
    }} onMouseUp={(e) => e.stopPropagation()}>
      <div style={{fontSize: '24px'}}>Loading</div>
      <div style={{paddingLeft: '18px'}}>name data... {nameLoaded ? <IconCheck /> : <></>}</div>
      <div style={{paddingLeft: '18px'}}>text data... {textLoaded ? <IconCheck /> : <></>}</div>
      <div style={{paddingLeft: '18px'}}>image data... {imagesLoaded ? <IconCheck /> : <></>}</div>
      <div style={{paddingLeft: '18px'}}>crop data... {cropsLoaded ? <IconCheck /> : <></>}</div>
    </div>
  </div>;
}
