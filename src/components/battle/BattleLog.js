import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { Button, Spacer } from '../particles';
import { useState } from 'react';
import { Modal } from '../modals/Modal';
import { logRoundEnds, logTurnBegins } from '../../gameplay/battleLogGenerators';
import { BattleLogItem } from './BattleLogItem';
import { colors } from '../styles';

const battleLogButtonCss = css`
  position: absolute;
  top: 430px;
  left: 40px;
  width: 100px;
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
      )),
      logRoundEnds('end of round')
    ];

    return {
      battleLogs: logs,
      enemyName: state.clashBattleStats.enemyName
    };
  }, shallowEqual);

  const [isBattleLogModalOpen, setIsBattleLogModalOpen] = useState(false);

  return battleLogs.length > 1 ? (
    <React.Fragment>
      <Button
        onClick={() => setIsBattleLogModalOpen(true)}
        _css={battleLogButtonCss}
        centered
      >
        Recap
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
