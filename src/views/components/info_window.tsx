import React, {ForwardedRef, forwardRef, useImperativeHandle, useState} from 'react';

export type InfoWindowHandle = {
  open: (legacyPublicId: string, legacyBetaPublicId: string) => void,
};

export type InfoWindowProps = {
  onReexport: (publicId: string) => unknown,
};

const InfoWindow = forwardRef<InfoWindowHandle, InfoWindowProps>(function InfoWindow(
    props: InfoWindowProps,
    ref: ForwardedRef<InfoWindowHandle>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [legacyPublicId, setLegacyPublicId] = useState('');
  const [legacyBetaPublicId, setLegacyBetaPublicId] = useState('');

  useImperativeHandle(ref, () => ({
    open: (legacyPublicId: string, legacyBetaPublicId: string) => {
      setIsOpen(true);
      console.log('Opening with ids ' + legacyPublicId, legacyBetaPublicId);
      setLegacyPublicId(legacyPublicId);
      setLegacyBetaPublicId(legacyBetaPublicId);
    },
  }));

  if (!isOpen) {
    return null;
  }

  const discordLogo = <a href="https://discord.gg/Yv8kY2m"><img src="icons/Discord-Logo+Wordmark-Color64.png" style={{width: '117px'}}></img></a>;
  const githubLogo = <a href="https://github.com/ToyDragon/frogtownstatic"><img src="icons/GitHub_Logo64.png" style={{width: '64px', marginLeft: '-4px'}}></img></a>;


  return <div style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: '#00000070',
    zIndex: '6',
  }} onMouseUp={(e) => {
    if (e.button === 0) {
      setIsOpen(false);
    }
  }}>
    <div style={{
      width: '600px',
      height: '600px',
      position: 'absolute',
      left: 'calc(50% - 300px)',
      top: 'calc(50% - 300px)',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '3px solid #cdd6e4',
      padding: '16px',
    }} onMouseUp={(e) => e.stopPropagation()}>
      <div style={{
        fontSize: '24px',
      }}>Frogtown</div>
      <div style={{marginTop: '12px'}}></div>
      <div>All of your decks are stored locally here in your browser, so if you cleared your browser&apos;s cache that
        may have caused your decks to disappear. If you exported your decks as JSON files you can drop/drop them
        onto the page.</div>
      <div style={{marginTop: '12px'}}></div>
      <div>If you are having issues or would like to suggest changes, join the Discord channel and let us know.
        If you&apos;re a developer and want to contribute to the site, check out our GitHub repository.</div>
      <div style={{marginTop: '12px'}}></div>
      <div>{discordLogo}</div>
      <div>{githubLogo}</div>
      <div style={{marginTop: '12px'}}></div>
      <div>
        {
          (legacyPublicId || legacyBetaPublicId) &&
              <div>
                If you&apos;re missing decks from the old version of frogtown, here you can attempt to import the
                decks again.
              </div>
        }
        <div>
          {!legacyPublicId ? null : <button className="btn btn-primary" onMouseUp={(e)=> {
            if (e.button === 0) {
              props.onReexport(legacyPublicId);
            }
          }}>Try Import WWW Decks</button>}
          {!legacyBetaPublicId ? null : <button className="btn btn-primary" style={{marginLeft: '8px'}}
            onMouseUp={(e)=> {
              if (e.button === 0) {
                props.onReexport(legacyBetaPublicId);
              }
            }}>Try Import Beta Decks</button>}
        </div>
      </div>
      <div style={{fontSize: '12px', color: '#555555', position: 'absolute', bottom: '37px', padding: '12px'}}>
        Portions of Frogtown are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy.
        The literal and graphical information presented on this site about Magic: The Gathering, including card images,
        the mana symbols, and Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc.
        Frogtown is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.
      </div>
      <div style={{position: 'absolute', right: '12px', bottom: '12px'}}>
        <button className='btn btn-secondary'
          onMouseUp={(e) => {
            if (e.button === 0) {
              setIsOpen(false);
            }
          }} onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false);
            }
          }}>Close</button>
      </div>
    </div>
  </div>;
});

export default InfoWindow;
