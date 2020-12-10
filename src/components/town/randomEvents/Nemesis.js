import React, { useState } from 'react';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { MonsterPreview } from '../../modals/MonsterPreview';
import { eventMonsters } from '../../../monsters/monsters';
import { colors } from '../../styles';
import { useSelector } from 'react-redux';

export const Nemesis = ({ closeModal }) => {
  const { yourImage  } = useSelector(state => ({
    yourImage: state.clashBattleStats.yourImage,
  }));

  const [page, setPage] = useState('default');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              You are confronted by...<span className='yellow'>yourself</span>?!
              <br /><br />
              "Who are you?" they say. "You must not stand in my way, I have to save my town from these <span className='violet'>monsters</span>."
              <br /><br />
              What is going on?
            </React.Fragment>
          }
          options={[
            {
              name: 'Fight',
              greenText: 'Fight enemy: Nemesis.',
              onClick: () => setPage('monster_preview')
            },
            {
              name: 'Run',
              onClick: () => setPage('leave')
            }
          ]}
        />
      );
      break;
    case 'leave':
      pageComponent = (
        <EventModalPage
          page={2}
          text='You flee the bizarre encounter.'
          options={[{
            name: 'Back to Town',
            onClick: closeModal
          }]}
        />
      );
      break;
    default:
      break;
  }

  return page === 'monster_preview' ? (
    <MonsterPreview
      title='Nemesis'
      monsterOverride={eventMonsters['Nemesis']}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Nemesis'
      image={yourImage}
      imageCss={`filter: drop-shadow(0 0 15px ${colors.red})`}
    >
      {pageComponent}
    </EventModal>
  );
};
