import React, {useEffect} from 'react';
import {useState} from 'react';
import {DataLoader} from '../../data/data_loader';

export default function loadingWindow(props: {loader: DataLoader}) {
  const [isOpen, setIsOpen] = useState(false);

  const [isIDToRarityLoaded, setIDToRarityLoaded] = useState(false);
  const [isIDToColorLoaded, setIDToColorLoaded] = useState(false);
  const [isIDToColorIdentityLoaded, setIDToColorIdentityLoaded] = useState(false);
  const [isIDToSupertypeLoaded, setIDToSupertypeLoaded] = useState(false);
  const [isIDToTypeLoaded, setIDToTypeLoaded] = useState(false);
  const [isIDToSubtypeLoaded, setIDToSubtypeLoaded] = useState(false);
  const [isIDToPowerLoaded, setIDToPowerLoaded] = useState(false);
  const [isIDToToughnessLoaded, setIDToToughnessLoaded] = useState(false);
  const [isIDToCMCLoaded, setIDToCMCLoaded] = useState(false);
  const [isIDToLegalFormatLoaded, setIDToLegalFormatLoaded] = useState(false);
  const [isIDToSetCodeLoaded, setIDToSetCodeLoaded] = useState(false);
  const [isSetCodeToReleaseLoaded, setSetCodeToReleaseLoaded] = useState(false);
  const [isIDToTokenStringsLoaded, setIDToTokenStringsLoaded] = useState(false);
  const [isIDToLargeImageURILoaded, setIDToLargeImageURILoaded] = useState(false);
  const [isTokenIDToTokenStringLoaded, setTokenIDToTokenStringLoaded] = useState(false);
  const [isTokenIDToNameLoaded, setTokenIDToNameLoaded] = useState(false);
  const [isTokenIDToLargeImageURILoaded, setTokenIDToLargeImageURILoaded] = useState(false);
  const [isFrontIDToBackIDLoaded, setFrontIDToBackIDLoaded] = useState(false);
  const [isBackIDToLargeImageURILoaded, setBackIDToLargeImageURILoaded] = useState(false);
  const [isSetCodeToSetNameLoaded, setSetCodeToSetNameLoaded] = useState(false);
  const [isIDToCostLoaded, setIDToCostLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      props.loader.getMapData('IDToName'),
      props.loader.getMapData('IDToText'),
      props.loader.getMapData('IDToNormalImageURI'),
      props.loader.getMapData('IDToCropImageURI'),
    ]).then(() => {
      setIsOpen(true);
      const remainingPromises: Promise<void>[] = [];
      /* eslint-disable max-len */
      remainingPromises.push(props.loader.getMapData('IDToRarity').then(() => setIDToRarityLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToColor').then(() => setIDToColorLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToColorIdentity').then(() => setIDToColorIdentityLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToSupertype').then(() => setIDToSupertypeLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToType').then(() => setIDToTypeLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToSubtype').then(() => setIDToSubtypeLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToPower').then(() => setIDToPowerLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToToughness').then(() => setIDToToughnessLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToCMC').then(() => setIDToCMCLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToLegalFormat').then(() => setIDToLegalFormatLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToSetCode').then(() => setIDToSetCodeLoaded(true)));
      remainingPromises.push(props.loader.getMapData('SetCodeToRelease').then(() => setSetCodeToReleaseLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToTokenStrings').then(() => setIDToTokenStringsLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToLargeImageURI').then(() => setIDToLargeImageURILoaded(true)));
      remainingPromises.push(props.loader.getMapData('TokenIDToTokenString').then(() => setTokenIDToTokenStringLoaded(true)));
      remainingPromises.push(props.loader.getMapData('TokenIDToName').then(() => setTokenIDToNameLoaded(true)));
      remainingPromises.push(props.loader.getMapData('TokenIDToLargeImageURI').then(() => setTokenIDToLargeImageURILoaded(true)));
      remainingPromises.push(props.loader.getMapData('FrontIDToBackID').then(() => setFrontIDToBackIDLoaded(true)));
      remainingPromises.push(props.loader.getMapData('BackIDToLargeImageURI').then(() => setBackIDToLargeImageURILoaded(true)));
      remainingPromises.push(props.loader.getMapData('SetCodeToSetName').then(() => setSetCodeToSetNameLoaded(true)));
      remainingPromises.push(props.loader.getMapData('IDToCost').then(() => setIDToCostLoaded(true)));
      /* eslint-enable max-len */
      Promise.all(remainingPromises).then(() => {
        setIsOpen(false);
      });
    });
  }, []);

  if (!isOpen) {
    return <div>whatthef</div>;
  }

  function createLoadingIndicator(loaded: boolean, name: string) {
    if (loaded) {
      return null;
    }
    return <div style={{paddingLeft: '18px', fontSize: '18px'}}>{name}...</div>;
  }

  return <div data-whatthef='urmum' style={{
    width: '300px',
    position: 'absolute',
    right: '50px',
    bottom: '50px',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '3px solid #cdd6e4',
    padding: '18px',
    fontSize: '18px',
    opacity: '.5',
  }} onMouseUp={(e) => e.stopPropagation()}>
    <div style={{fontWeight: 'bold'}}>Loading data required for searching and exporting.</div>
    {createLoadingIndicator(isIDToRarityLoaded, 'IDToRarity')}
    {createLoadingIndicator(isIDToColorLoaded, 'IDToColor')}
    {createLoadingIndicator(isIDToColorIdentityLoaded, 'IDToColorIdentity')}
    {createLoadingIndicator(isIDToSupertypeLoaded, 'IDToSupertype')}
    {createLoadingIndicator(isIDToTypeLoaded, 'IDToType')}
    {createLoadingIndicator(isIDToSubtypeLoaded, 'IDToSubtype')}
    {createLoadingIndicator(isIDToPowerLoaded, 'IDToPower')}
    {createLoadingIndicator(isIDToToughnessLoaded, 'IDToToughness')}
    {createLoadingIndicator(isIDToCMCLoaded, 'IDToCMC')}
    {createLoadingIndicator(isIDToLegalFormatLoaded, 'IDToLegalFormat')}
    {createLoadingIndicator(isIDToSetCodeLoaded, 'IDToSetCode')}
    {createLoadingIndicator(isSetCodeToReleaseLoaded, 'SetCodeToRelease')}
    {createLoadingIndicator(isIDToTokenStringsLoaded, 'IDToTokenStrings')}
    {createLoadingIndicator(isIDToLargeImageURILoaded, 'IDToLargeImageURI')}
    {createLoadingIndicator(isTokenIDToTokenStringLoaded, 'TokenIDToTokenString')}
    {createLoadingIndicator(isTokenIDToNameLoaded, 'TokenIDToName')}
    {createLoadingIndicator(isTokenIDToLargeImageURILoaded, 'TokenIDToLargeImageURI')}
    {createLoadingIndicator(isFrontIDToBackIDLoaded, 'FrontIDToBackID')}
    {createLoadingIndicator(isBackIDToLargeImageURILoaded, 'BackIDToLargeImageURI')}
    {createLoadingIndicator(isSetCodeToSetNameLoaded, 'SetCodeToSetName')}
    {createLoadingIndicator(isIDToCostLoaded, 'IDToCost')}
  </div>;
}
