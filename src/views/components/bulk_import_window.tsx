import React, {ForwardedRef, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {DataLoader} from '../../data/data_loader';
import {rankStringMatch} from '../../data/execute_filter';

export type BulkImportWindowHandle = {
  open: () => void,
};

type BulkImportWindowProps = {
  loader: DataLoader,
  addCards: (cardIds: string[]) => void,
};

export function parseCards(loader: DataLoader, input: string): {ids: string[], errors: string[]} {
  const result: {ids: string[], errors: string[]} = {
    ids: [],
    errors: [],
  };
  const idToName = loader.getMapDataSync('IDToName')!;
  const idToSetCode = loader.getMapDataSync('IDToSetCode')!;

  const nameRegex = /([0-9]+)?x?\s*([^<>]*)\s*(?:<(.*)>)?\s*/;
  const idRegex = /([0-9]+)?x?\s*([0-9a-z]){36}\s*/;
  const uniqueErrors: Record<string, boolean> = {};

  const namesToMatch: {
    text: string,
    matchedId: string,
    matchedName: string,
    matchedNameRank: number,
    setCode: string,
    quantity: number,
  }[] = [];
  for (const line of input.split('\n')) {
    let matchResult = idRegex.exec(line);
    if (matchResult && matchResult[2]?.length) {
      if (idToName[matchResult[2]]) {
        const quantity = Number(matchResult[1]) || 1;
        for (let i = 0; i < quantity; i++) {
          result.ids.push(matchResult[2]);
        }
      } else {
        uniqueErrors[`ID "${matchResult[2]}" not found.`] = true;
      }
      continue;
    }

    matchResult = nameRegex.exec(line);
    if (matchResult && matchResult[2]?.length) {
      namesToMatch.push({
        text: matchResult[2].trim(),
        matchedId: '',
        matchedName: '',
        matchedNameRank: 0,
        quantity: Number(matchResult[1] || 1),
        setCode: matchResult[3] || '',
      });
      continue;
    }
  }

  for (const id in idToName) {
    const name = idToName[id];
    for (const info of namesToMatch) {
      if (info.setCode && idToSetCode[id] !== info.setCode) {
        continue;
      }
      const rank = rankStringMatch(name, info.text);
      if (rank > 0 && (info.matchedName === '' || info.matchedNameRank > rank)) {
        info.matchedId = id;
        info.matchedName = name;
        info.matchedNameRank = rank;
      }
    }
  }

  for (const info of namesToMatch) {
    if (!info.matchedName) {
      uniqueErrors[`Card "${info.text}" not found.`] = true;
      continue;
    }
    if (info.matchedNameRank > 2) {
      uniqueErrors[`Card "${info.text}" not found, maybe "${info.matchedName}"?`] = true;
      continue;
    }
    for (let i = 0; i < info.quantity; i++) {
      result.ids.push(info.matchedId);
    }
  }

  result.errors = Object.keys(uniqueErrors);
  return result;
}

const BulkImportWindow = forwardRef<BulkImportWindowHandle, BulkImportWindowProps>(function BulkImportWindow(
    props: BulkImportWindowProps,
    ref: ForwardedRef<BulkImportWindowHandle>,
) {
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      setInputValue('');
      setIsOpen(true);
      setTimeout(() => inputRef.current?.select(), 0);
    },
  }));

  if (!isOpen) {
    return null;
  }

  const submit: any = (submitFromKey: boolean) => {
    return (e?: React.KeyboardEvent<HTMLButtonElement>) => {
      if (typeof e !== 'undefined' &&
        typeof e.key !== 'undefined' &&
        (submitFromKey || (e.key !== ' ' && e.key !== 'Enter'))) {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
        setErrors([]);
        return;
      }

      const result = parseCards(props.loader, inputValue);
      if (result.errors.length > 0) {
        setErrors(result.errors);
        return;
      }
      if (result.ids.length === 0) {
        setErrors([`No cards entered.`]);
        return;
      }

      props.addCards(result.ids);
      setIsOpen(false);
    };
  };

  return <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: '#00000070',
    zIndex: '6',
  }} onMouseUp={() => {
    setIsOpen(false);
  }}>
    <div style={{
      width: '600px',
      height: '750px',
      position: 'absolute',
      left: 'calc(50% - 300px)',
      top: 'calc(50% - 375px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '16px',
    }} onMouseUp={(e) => e.stopPropagation()}>
      <div style={{
        fontSize: '24px',
      }}>Bulk Import</div>
      <div style={{
        fontSize: '16px',
        color: 'darkgray',
      }}>{'Enter cards by name like "Island", and optionally include count or setcode like "20 Island <pana>"'}</div>
      <textarea ref={inputRef} style={{
        fontSize: '18px',
        width: '100%',
        height: '475px',
        resize: 'none',
      }} value={inputValue} onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={submit(true)}></textarea>
      <div style={{marginTop: '12px'}}>
        <div style={{
          display: 'inline-block',
          color: 'red',
          fontWeight: 'bold',
          width: '380px',
          height: '120px',
          overflowY: 'auto',
        }}>{errors.map((a) => (<div key={a}>{a}</div>))}</div>
        <button className='btn btn-secondary'
          onMouseUp={() => setIsOpen(false)}>Cancel</button>
        <button style={{marginLeft: '32px'}} className='btn btn-primary' onMouseUp={submit(false)}
          onKeyDown={submit(false)}>Submit</button>
      </div>
    </div>
  </div>;
});

export default BulkImportWindow;
