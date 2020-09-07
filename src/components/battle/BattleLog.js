import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { Button, Spacer } from '../particles';
import { useState } from 'react';
import { Modal } from '../modals/Modal';
import { logTurnBegins } from '../../gameplay/battleLogGenerators';
import { BattleLogItem } from './BattleLogItem';
import { colors } from '../styles';

// const testingLogs = [
//   {
//     type: 'shuffle_card_into_pile',
//     player: 'you',
//     card: 'Gladius',
//     pile: 'discard'
//   },
//   {
//     type: 'heal_value',
//     player: 'you',
//     value: 3
//   },
//   {
//     type: 'heal_card',
//     player: 'you',
//     card: 'Gladius'
//   },
//   {
//     type: 'play_copy_of_card',
//     player: 'you',
//     card: 'Gladius'
//   },
//   {
//     type: 'gain_shields',
//     player: 'you',
//     value: 3
//   },
//   {
//     type: 'receive_damage',
//     player: 'you',
//     value: 3
//   },
//   {
//     type: 'receive_fatal_damage',
//     player: 'you'
//   },
//   {
//     type: 'discard_card',
//     player: 'you',
//     dealsBanishingDamage: true,
//     card: 'Gladius'
//   },
//   {
//     type: 'discard_card',
//     player: 'you',
//     dealsBanishingDamage: false,
//     card: 'Gladius'
//   },
//   {
//     type: 'trigger_discard_effect',
//     player: 'you',
//     card: 'Gladius'
//   },
//   {
//     type: 'temporary_stat_gain',
//     player: 'you',
//     value: 1,
//     stat: 'attack'
//   },
//   {
//     type: 'play_card',
//     player: 'you',
//     card: 'Gladius'
//   },
//   {
//     type: 'player_wins',
//     player: 'you'
//   },
//   {
//     type: 'turn_begins',
//     player: 'you'
//   },
//   {
//     type: 'cant_draw_card',
//     player: 'you'
//   },
//   // 
//   {
//     type: 'shuffle_card_into_pile',
//     player: 'enemy',
//     card: 'Gladius',
//     pile: 'banish'
//   },
//   {
//     type: 'heal_value',
//     player: 'enemy',
//     value: 3
//   },
//   {
//     type: 'heal_card',
//     player: 'enemy',
//     card: 'Gladius'
//   },
//   {
//     type: 'play_copy_of_card',
//     player: 'enemy',
//     card: 'Gladius'
//   },
//   {
//     type: 'gain_shields',
//     player: 'enemy',
//     value: 3
//   },
//   {
//     type: 'receive_damage',
//     player: 'enemy',
//     value: 3
//   },
//   {
//     type: 'receive_fatal_damage',
//     player: 'enemy'
//   },
//   {
//     type: 'discard_card',
//     player: 'enemy',
//     dealsBanishingDamage: true,
//     card: 'Gladius'
//   },
//   {
//     type: 'discard_card',
//     player: 'enemy',
//     dealsBanishingDamage: false,
//     card: 'Gladius'
//   },
//   {
//     type: 'trigger_discard_effect',
//     player: 'enemy',
//     card: 'Gladius'
//   },
//   {
//     type: 'temporary_stat_gain',
//     player: 'enemy',
//     value: 1,
//     stat: 'attack'
//   },
//   {
//     type: 'play_card',
//     player: 'enemy',
//     card: 'Gladius'
//   },
//   {
//     type: 'player_wins',
//     player: 'enemy'
//   },
//   {
//     type: 'turn_begins',
//     player: 'enemy'
//   },
//   {
//     type: 'cant_draw_card',
//     player: 'enemy'
//   }
// ];

const battleLogButtonCss = css`
  position: absolute;
  top: 350px;
  left: 120px;
`;
const battleLogModalCss = css`
  overflow: scroll;
  border-bottom: 5px solid ${colors.yellow};
  height: 450px;
  width: 1000px;

  .text_container {
    width: fit-content;
    margin: auto;
  }
`;

export const BattleLog = () => {
  const { battleLogs, enemyName } = useSelector(state => {
    // move "your turn starts" to the beginning
    const logs = [
      logTurnBegins("you's turn begins", 'you'),
      ...state.clashBattleCards.battleLogs.filter(i => (
        !(i.type === 'turn_begins' && i.player === 'you')
      ))
    ];
    // testingLogs

    return {
      battleLogs: logs,
      enemyName: state.clashBattleStats.enemyName
    };
  }, shallowEqual);

  // console.log('battle logs rerendering', { battleLogs, enemyName });

  const [isBattleLogModalOpen, setIsBattleLogModalOpen] = useState(false);

  return battleLogs.length > 1 ? (
    <React.Fragment>
      <Button
        mini
        onClick={() => setIsBattleLogModalOpen(true)}
        _css={battleLogButtonCss}
      >
        Last Turn's Recap
      </Button>

      {isBattleLogModalOpen && (
        <Modal
          title="Last Turn's Recap"
          closeModal={() => setIsBattleLogModalOpen(false)}
          shouldCloseOnClick={false}
          shouldShowCloseButton={true}
        >
          <div css={battleLogModalCss}>
            <div className='text_container'>
              {battleLogs.map((log, index) => (
                <BattleLogItem
                  key={index}
                  index={index + 1}
                  {...log}
                  player={log.player === 'you' ? 'Player' : enemyName}
                />
              ))}
              <Spacer height={200} />
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  ) : null;
};
