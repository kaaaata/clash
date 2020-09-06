import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import {
  YourDeck,
  YourDiscard,
  YourBanish,
  EnemyDeck,
  EnemyDiscard,
  EnemyBanish,
  YourHand,
  EnemyHand,
  Stack
} from './CardPile';
import { Portrait } from '../Portrait';
import { playFirstCardInRound } from '../../gameplay/playFirstCardInRound';
import { BattleRewards } from './BattleRewards';
import { CardPileModal } from './CardPileModal';
import { Button, FlexContainer, Text } from '../particles';
import { useState } from 'react';
import { Modal } from '../modals/Modal';

const testingLogs = [
  {
    "type": "play_card",
    "consoleLog": "you plays: Falchion",
    "player": "you",
    "card": "Falchion"
  },
  {
    "type": "receive_damage",
    "consoleLog": "enemy receives 4 damage",
    "player": "enemy",
    "value": 4
  },
  {
    "type": "discard_card",
    "consoleLog": "enemy discards Defense Potion",
    "player": "enemy",
    "dealsBanishingDamage": false,
    "card": "Defense Potion"
  },
  {
    "type": "trigger_discard_effect",
    "consoleLog": "enemy triggers discard effect of Defense Potion",
    "player": "enemy",
    "card": "Defense Potion"
  },
  {
    "type": "temporary_stat_gain",
    "consoleLog": "enemy receives +1 Defense until end of battle",
    "player": "enemy",
    "value": 1,
    "stat": "defense"
  },
  {
    "type": "discard_card",
    "consoleLog": "enemy discards Shield",
    "player": "enemy",
    "dealsBanishingDamage": false,
    "card": "Shield"
  },
  {
    "type": "discard_card",
    "consoleLog": "enemy discards Minor Healing Potion",
    "player": "enemy",
    "dealsBanishingDamage": false,
    "card": "Minor Healing Potion"
  },
  {
    "type": "trigger_discard_effect",
    "consoleLog": "enemy triggers discard effect of Minor Healing Potion",
    "player": "enemy",
    "card": "Minor Healing Potion"
  },
  {
    "type": "heal_value",
    "consoleLog": "enemy heals 1",
    "player": "enemy",
    "value": 1
  },
  {
    "type": "heal_card",
    "consoleLog": "enemy heals Shield",
    "player": "enemy",
    "card": "Shield"
  },
  {
    "type": "discard_card",
    "consoleLog": "enemy discards Sword",
    "player": "enemy",
    "dealsBanishingDamage": false,
    "card": "Sword"
  },
  {
    "type": "turn_begins",
    "consoleLog": "enemy's turn begins",
    "player": "enemy"
  },
  {
    "type": "play_card",
    "consoleLog": "enemy plays: Sword",
    "player": "enemy",
    "card": "Sword"
  },
  {
    "type": "receive_damage",
    "consoleLog": "you receives 3 damage",
    "player": "you",
    "value": 3
  },
  {
    "type": "discard_card",
    "consoleLog": "you discards Cutlass",
    "player": "you",
    "dealsBanishingDamage": false,
    "card": "Cutlass"
  },
  {
    "type": "discard_card",
    "consoleLog": "you discards Cutlass",
    "player": "you",
    "dealsBanishingDamage": false,
    "card": "Cutlass"
  },
  {
    "type": "discard_card",
    "consoleLog": "you discards Sword",
    "player": "you",
    "dealsBanishingDamage": false,
    "card": "Sword"
  },
  {
    "type": "turn_begins",
    "consoleLog": "you's turn begins",
    "player": "you"
  }
];

const battleLogButtonCss = css`
  position: absolute;
  top: 350px;
  left: 120px;
`;
const battleLogModalCss = css`
  
`;

const BattleLogItem = (props) => {
  let text = null;

  switch (props.type) {
    case 'shuffle_card_into_pile':
      text = `${props.player} shuffles ${props.card} into their ${props.pile}`;
      break;
    default:
      text = props.consoleLog;
      break;
  }

  return (
    <FlexContainer alignItems='center'>
      <Text type='small'>{text}</Text>
    </FlexContainer>
  );
};

export const BattleLog = () => {
  const { battleLogs, enemyName } = useSelector(state => ({
    battleLogs: testingLogs,
    enemyName: state.clashBattleStats.enemyName
    // battleLogs: state.clashBattleCards.battleLogs
  }), shallowEqual);

  const [isBattleLogModalOpen, setIsBattleLogModalOpen] = useState(true);

  return battleLogs.length ? (
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
            {battleLogs.map((log, index) => (
              <BattleLogItem
                key={index}
                {...log}
                player={log.player === 'you' ? 'Player' : enemyName}
              />
            ))}
          </div>
        </Modal>
      )}
    </React.Fragment>
  ) : null;
};
