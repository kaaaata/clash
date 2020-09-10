import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Spacer, Button, FlexContainer } from '../particles';
import { CardViewModal } from './CardViewModal';
import { blueprints } from '../../cards/blueprints';

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
      <Modal halfModal title='Settings' transparent={false}>
        <FlexContainer
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          _css='height: 100%;'
        >
          <Button 
            type='mini'
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
              type='mini'
              onClick={() => setIsAllCardsModalActive(true)}
            >
              View All Cards
            </Button>
          )}

          <Spacer height={20} />

          <Button type='mini' onClick={closeModal}>Back</Button>
        </FlexContainer>
      </Modal>
      
      {isAllCardsModalActive && inDevelopment && (
        <CardViewModal
          title='All Cards'
          cardNames={blueprints.allCardsArray.map(card => card.name)}
          closeModal={() => setIsAllCardsModalActive(false)}
        />
      )}
    </React.Fragment>
  );
};
