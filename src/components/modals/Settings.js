import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
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
  const [isBattleSpeedModalActive, setIsBattleSpeedModalActive] = useState(false);
  const [battleSpeed, setBattleSpeed] = useState(
    window.localStorage.getItem('clashsetting_battle_speed') || 'Normal'
  );

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
            centered
          >
            Concede Battle
          </Button>

          <Spacer height={20} />
          
          {inDevelopment && (
            <Button
              type='mini'
              onClick={() => setIsAllCardsModalActive(true)}
              centered
            >
              View All Cards
            </Button>
          )}

          <Spacer height={20} />

          <Button
            type='mini'
            isDisabled={scene === 'battle'}
            onClick={() => setIsBattleSpeedModalActive(true)}
            centered
          >
            Change Battle Speed
          </Button>

          <Spacer height={20} />

          <Button
            type='mini'
            onClick={closeModal}
            centered
          >
            Back
          </Button>
        </FlexContainer>
      </Modal>
      
      {isAllCardsModalActive && inDevelopment && (
        <CardViewModal
          title='All Cards'
          cardNames={blueprints.allCardsArray.map(card => card.name)}
          closeModal={() => setIsAllCardsModalActive(false)}
        />
      )}

      {isBattleSpeedModalActive && (
        <Modal
          title='Battle Speed'
          shouldCloseOnClick={false}
          shouldShowCloseButton
          closeModal={() => {
            setIsBattleSpeedModalActive(false);
            closeModal();
          }}
        >
          <FlexContainer
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            _css={css`height: 100%;`}
          >
            {['Slow', 'Normal', 'Fast'].map(i => (
              <React.Fragment key={i}>
                <Button
                  type='mini'
                  onClick={() => {
                    window.localStorage.setItem('clashsetting_battle_speed', i);
                    setBattleSpeed(i);
                  }}
                  centered
                >
                  {i}{i === battleSpeed ? ' (selected)' : ''}
                </Button>
                <Spacer height={20} />
              </React.Fragment>
            ))}
          </FlexContainer>
        </Modal>
      )}
    </React.Fragment>
  );
};
