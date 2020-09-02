import React, { useState } from 'react';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { MonsterPreview } from '../../modals/MonsterPreview';
import { eventMonsters } from '../../monsters/monsters';

export const CatherineTheGreat = ({ closeModal }) => {
  const [page, setPage] = useState('default');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              You are confronted by a lightly armored fighter, who looks like she just got done fighting someone! There is <span className='red'>blood</span> splattered over her armor.
              <br /><br />
              "I am <span className='yellow'>Catherine the Great!</span> I challenge you to a duel!"
            </React.Fragment>
          }
          options={[
            {
              name: 'Accept',
              greenText: 'Fight enemy: Catherine the Great.',
              onClick: () => setPage('monster_preview')
            },
            {
              name: 'Decline',
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
          text='You decline the challenge, and run for your life!'
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

  return page === 'monster_preview' ? (
    <MonsterPreview
      title='You accept the challenge!'
      monsterOverride={eventMonsters['Catherine the Great']}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Catherine the Great'
      image='cat_the_great_event'
    >
      {pageComponent}
    </EventModal>
  );
};
