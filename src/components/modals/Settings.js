import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Spacer, Button } from '../particles';
import { CardViewModal } from './CardViewModal';
import { cardsArray } from '../../cards/cards';

const inDevelopment = process.env.NODE_ENV !== 'production';

export const Settings = ({ closeModal }) => {
  const { scene, enemyName } = useSelector(state => ({
    scene: state.clashScene.scene,
    enemyName: state.clashBattleStats.enemyName
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isAllCardsModalActive, setIsAllCardsModalActive] = useState(false);

  return (
    <React.Fragment>
      <Modal halfModal transparent={false}>
        <Spacer height={100} />
        <Button 
          mini
          isDisabled={scene !== 'battle'}
          onClick={() => {
            dispatch(actions.setWinner(enemyName));
            closeModal();
          }}
        >
          Concede Battle
        </Button>
        <Spacer height={20} />
        {inDevelopment && (
          <Button
            mini
            onClick={() => setIsAllCardsModalActive(true)}
          >
            View All Cards
          </Button>
        )}
      </Modal>
      
      {isAllCardsModalActive && inDevelopment && (
        <CardViewModal
          title='All Cards'
          cards={cardsArray.map(card => card.name)}
          closeModal={() => setIsAllCardsModalActive(false)}
        />
      )}
    </React.Fragment>
  );
};
