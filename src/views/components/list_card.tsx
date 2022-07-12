import React, {useState, useEffect} from 'react';
import {DataLoader} from '../../data/data_loader';
import CardActions from './card_actions';
import makeManaIcon from './make_mana_icon';
import URLLoader from './url_loader';

export default function ListCard(props: { cardId: string, count: number, loader: DataLoader, urlLoader: URLLoader,
  index: number, actionHandlers: {
    onAdd?: (cardId: string) => void,
    onRemove?: (cardId: string) => void,
    onSimilar?: (cardId: string) => void,
    onSideboard?: (cardId: string) => void,
    onMainboard?: (cardId: string) => void,
    onStar?: (cardId: string) => void,
  }
}) {
  const [svgText, setSvgText] = useState<string>('');
  const idToSetCode = props.loader.getMapDataSync('IDToSetCode')!;
  if (idToSetCode[props.cardId]) {
    useEffect(() => {
      props.urlLoader.load(`https://s3.us-west-2.amazonaws.com/frogtown.apricot.setsvgs/${idToSetCode[props.cardId]}.svg`).then(setSvgText);
    }, []);
  }
  const types: string[] = [];
  types.splice(0, 0, ...(props.loader.getMapDataSync('IDToSubtype')![props.cardId] || []));
  if (types.length > 0) {
    types.splice(0, 0, '-');
  }
  types.splice(0, 0, ...(props.loader.getMapDataSync('IDToType')![props.cardId] || []));
  types.splice(0, 0, ...(props.loader.getMapDataSync('IDToSupertype')![props.cardId] || []));

  const rarity = props.loader.getMapDataSync('IDToRarity')![props.cardId];
  let rarityColor = 'black';
  if (rarity === 'uncommon') {
    rarityColor = '#a8b0b6';
  }
  if (rarity === 'rare') {
    rarityColor = '#dfcc80';
  }
  if (rarity === 'mythic') {
    rarityColor = '#e24d23';
  }

  return (
    <div className='actionContainer' data-hovercardid={props.cardId} style={{
      width: 'calc(100% - 8px)',
      maxWidth: '750px',
      height: '42px',
      position: 'relative',
      backgroundColor: props.index%2 === 1 ? '#303b4c' : '#4d5869',
      color: 'white',
      borderTopLeftRadius: props.index === 0 ? '8px' : '',
      borderTopRightRadius: props.index === 0 ? '8px' : '',
    }}>
      <div style={{
        display: 'inline-block',
        width: '42px',
        height: '34px',
        verticalAlign: 'bottom',
        fill: rarityColor,
        marginTop: '4px',
        marginLeft: '2px',
      }} title={idToSetCode[props.cardId] || ''} dangerouslySetInnerHTML={{
        __html: svgText.replace(/\n/g, '').replace(/^{.*$/, '')
            .replace('<svg ', '<svg style="width:100%; height:100%;" '),
      }}></div>
      <div style={{
        display: 'inline-block',
        width: '33px',
        textAlign: 'center',
        verticalAlign: 'bottom',
      }}>{
        typeof props.loader.getMapDataSync('IDToPower')![props.cardId] !== 'undefined' ?
          (props.loader.getMapDataSync('IDToPower')![props.cardId] +
            '/' + props.loader.getMapDataSync('IDToToughness')![props.cardId]) : null
        }
      </div>
      <div style={{
        display: 'inline-block',
        width: '249px',
        verticalAlign: 'bottom',
      }} title={props.loader.getMapDataSync('IDToName')![props.cardId]}>
        <div style={{
          width: '250px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}>{props.count}x {props.loader.getMapDataSync('IDToName')![props.cardId]}</div>
      </div>
      <div style={{
        display: 'inline-block',
        width: '100px',
        verticalAlign: 'bottom',
        textAlign: 'right',
        paddingRight: '4px',
      }} title={props.loader.getMapDataSync('IDToCost')![props.cardId]} dangerouslySetInnerHTML={{
        __html: (props.loader.getMapDataSync('IDToCost')![props.cardId] || '')
            .replace(/{([0-9/A-Z]+)}/g, makeManaIcon('Mana$1')).replace(/([A-Z])\/([A-Z]).jpg/g, '$1$2.jpg'),
      }}></div>
      <div style={{
        display: 'inline-block',
        width: '165px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        verticalAlign: 'bottom',
      }} title={types.join(' ')}>{types.join(' ')}</div>
      <CardActions top={false} cardId={props.cardId} {...props.actionHandlers} />
    </div>
  );
}
