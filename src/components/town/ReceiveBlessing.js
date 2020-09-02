import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';

export const ReceiveBlessing = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');
  const [flavorText, setFlavorText] = useState('');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={(
            <React.Fragment>
              You've defeated a <span className='yellow'>boss monster!</span> The cat gods descend from cat heaven to bestow an almighty <span className='blue'>blessing</span> upon your head!
            </React.Fragment>
          )}
          options={[
            {
              name: 'Blessing of Strength',
              greenText: 'Gain +1 attack permanently.',
              onClick: () => {
                setFlavorText('stronger');
                setPage('received_blessing');
                dispatch(actions.addTownFeedText('Received blessing: +1 attack'));
                dispatch(actions.setStats({
                  stats: { attack: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
              }
            },
            {
              name: 'Blessing of Wisdom',
              greenText: 'Gain +1 magic permanently.',
              onClick: () => {
                setFlavorText('wiser');
                setPage('received_blessing');
                dispatch(actions.addTownFeedText('Received blessing: +1 magic'));
                dispatch(actions.setStats({
                  stats: { magic: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
              }
            },
            {
              name: 'Blessing of Protection',
              greenText: 'Gain +1 defense permanently.',
              onClick: () => {
                setFlavorText('tougher');
                setPage('received_blessing');
                dispatch(actions.addTownFeedText('Received blessing: +1 defense'));
                dispatch(actions.setStats({
                  stats: { defense: 1 },
                  type: 'stats',
                  player: 'you',
                  operation: 'adjust'
                }));
              }
            },
            {
              name: 'Blessing of Wall Street',
              greenText: 'Receive 300 gold.',
              onClick: () => {
                setFlavorText('richer');
                dispatch(actions.addTownFeedText('Gold rains from the sky!'));
                setPage('received_blessing');
                dispatch(actions.addTownFeedText('Received blessing: 300 gold'));
                dispatch(actions.adjustPlayerGold(300));
              }
            }
          ]}
        />
      );
      break;
    case 'received_blessing':
      pageComponent = (
        <EventModalPage
          text={flavorText === 'Gold rains from the sky!' ? (
            <React.Fragment>
              <span className='yellow'>Gold</span> rains from the sky!
            </React.Fragment>
          ) : (
            <React.Fragment>
              You feel a little <span className='yellow'>{flavorText}</span>.
            </React.Fragment>
          )}
          options={[{
            name: 'Continue',
            onClick: closeModal
          }]}
        />
      );
      break;
    default:
      break;
  }

  return (
    <EventModal
      title='Congratulations! You have received a blessing.'
      image='blessing'
    >
      {pageComponent}
    </EventModal>
  );
};
