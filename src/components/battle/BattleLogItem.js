import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Text } from '../particles';
import { CardNameWithTooltip } from '../card/CardNameWithTooltip';

const pileColorClassNames = {
  deck: '',
  discard: 'red',
  banish: 'greyDark'
};

const battleLogItemCss = css`
  height: 30px;
`;

export const BattleLogItem = (props) => {
  let text = null;

  switch (props.type) {
    case 'shuffle_card_into_pile':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} shuffles <CardNameWithTooltip cardId={props.cardId} /> into their <span className={pileColorClassNames[props.pile]}>{props.pile}</span>
        </React.Fragment>
      );
      break;
    case 'heal_value':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} <span className='green'>heals {props.value}</span>
        </React.Fragment>
      );
      break;
    case 'heal_card':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} heals <CardNameWithTooltip cardId={props.cardId} />
        </React.Fragment>
      );
      break;
    case 'play_copy_of_card':
      text = props.originPile ? (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} plays <CardNameWithTooltip cardId={props.cardId} /> from {props.originPile}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} plays a <span className='yellow'>copy</span> of <CardNameWithTooltip cardId={props.cardId} />
        </React.Fragment>
      );
      break;
    case 'gain_shields':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} gains <span className='blue'>{props.value} shield{props.value === 1 ? '' : 's'}</span>
        </React.Fragment>
      );
      break;
    case 'receive_damage':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} receieves <span className='red'>{props.value} damage</span>
        </React.Fragment>
      );
      break;
    case 'receive_fatal_damage':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} has receieved <span className='red'>fatal damage!</span>
        </React.Fragment>
      );
      break;
    case 'discard_card': {
      const discardsOrBanishes = props.dealsBanishingDamage ? (
        <span className='greyDark'>banishes</span>
      ) : (
        <span className='red'>discards</span>
      );
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} {discardsOrBanishes} <CardNameWithTooltip cardId={props.cardId} />
        </React.Fragment>
      );
      break;
    }
    case 'trigger_discard_effect':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} triggers <span className='yellow'>discard effect</span> of <CardNameWithTooltip cardId={props.cardId} />
        </React.Fragment>
      );
      break;
    case 'temporary_stat_gain':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} gains <span className='yellow'>+{props.value} {props.stat}</span> for the rest of the battle
        </React.Fragment>
      );
      break;
    case 'play_card':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} plays <CardNameWithTooltip cardId={props.cardId} />
        </React.Fragment>
      );
      break;
    case 'player_wins':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}. {props.player} wins!</span>
        </React.Fragment>
      );
      break;
    case 'turn_begins':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}. {props.player}'s turn begins</span>
        </React.Fragment>
      );
      break;
    case 'cant_draw_card':
      text = (
        <React.Fragment>
          <span className='yellow'>{props.index}.</span> {props.player} is unable to draw a card!
        </React.Fragment>
      );
      break;
    case 'round_ends':
      text = (
        <React.Fragment>
          <span className='yellow'>End of round.</span>
        </React.Fragment>
      );
      break;
    default:
      text = JSON.stringify(props);
      break;
  }

  return (
    <FlexContainer alignItems='center' _css={battleLogItemCss}>
      <Text type='small'>{text}</Text>
    </FlexContainer>
  );
};
