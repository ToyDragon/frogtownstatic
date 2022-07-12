import React from 'react';

export default function CardActions(props: {
  cardId: string,
  top: boolean,
  onAdd?: (cardId: string) => void,
  onRemove?: (cardId: string) => void,
  onSimilar?: (cardId: string) => void,
  onSideboard?: (cardId: string) => void,
  onMainboard?: (cardId: string) => void,
  onStar?: (cardId: string) => void,
}) {
  let count = 0;
  const position = (): React.CSSProperties => {
    const result: React.CSSProperties = {
      width: '32px',
      height: '32px',
      position: 'absolute',
      zIndex: '3',
      right: (count++ * 32) + 'px',
      backgroundColor: '#1e1e33',
    };
    if (props.top) {
      result['top'] = '0';
    } else {
      result['bottom'] = '0';
    }
    return result;
  };
  return <>
    {!props.onAdd ? null :
      <div className="action" title="Add copy of card to deck" style={{
        backgroundImage: `url("icons/add card32.png")`,
        ...position(),
      }} onMouseUp={() => props.onAdd!(props.cardId)}><a href="#"></a></div>
    }
    {!props.onRemove ? null :
      <div className="action" title="Remove card from deck" style={{
        backgroundImage: `url("icons/remove card32.png")`,
        ...position(),
      }} onMouseUp={() => props.onRemove!(props.cardId)}><a href="#"></a></div>
    }
    {!props.onSimilar ? null :
      <div className="action" title="Find other printings of this card"
        style={{
          backgroundImage: `url("icons/misc card32.png")`,
          ...position(),
        }} onMouseUp={() => props.onSimilar!(props.cardId)}><a href="#"></a></div>
    }
    {!props.onSideboard ? null :
      <div className="action" title="Move card to sideboard" style={{
        backgroundImage: `url("icons/transfer card32.png")`,
        ...position(),
      }} onMouseUp={() => props.onSideboard!(props.cardId)}><a href="#"></a></div>
    }
    {!props.onMainboard ? null :
      <div className="action" title="Move card to sideboard" style={{
        backgroundImage: `url("icons/transfer card32.png")`,
        ...position(),
      }} onMouseUp={() => props.onMainboard!(props.cardId)}><a href="#"></a></div>
    }
    {!props.onStar ? null :
      <div className="action" title="Mark as the key card to this deck" style={{
        backgroundImage: `url("icons/star card32.png")`,
        ...position(),
      }} onMouseUp={() => props.onStar!(props.cardId)}><a href="#"></a></div>
    }
  </>;
}
