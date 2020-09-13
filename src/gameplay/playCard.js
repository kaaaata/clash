import { actionGenerators } from './actionGenerators';
import { customCardEffects } from './customCardEffects';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import {
  logHealValue,
  logHealCard,
  logPlayCopyOfCard,
  logGainShields,
  logReceiveDamage,
  logReceiveFatalDamage,
  logDiscardCard,
  logTriggerDiscardEffect,
  logTemporaryStatGain
} from './battleLogGenerators';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';
import shortid from 'shortid';

// can't move triggerDiscardEffect into new file because it calls playCard (import loop)
const triggerDiscardEffect = (state, cardId, player) => {
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!
  logs.push(logTriggerDiscardEffect(
    `${player} triggers discard effect of ${cards[cardId].name} (${cardId})`,
    player,
    cardId
  ));

  renderActions.push([
    actionGenerators.removeCard(state, player, 'discard', 'top'),
    actionGenerators.addCardToStack(state, cardId)
  ]);

  const card = cards[cardId];

  const mockCardId = createNewCard({
    name: card.name,
    ...card.onDiscard,
    isMockCard: true
  }, 'mock_card');
  playCard(state, mockCardId, player);

  renderActions.push([
    actionGenerators.removeTopCardFromStack(state),
    actionGenerators.addCard(
      state,
      cardId,
      player,
      card.banishesOnPlay ? 'banish' : 'discard',
      'top'
    )
  ]);
};

// a player loses if they receive damage while deck size is 0, or they cannot draw a card.
export const playCard = (state, cardId, player, location, index) => {
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!

  const card = cards[cardId];

  if (card.triggerDiscardOnPlay && card.onDiscard) {
    const mockCardId = createNewCard({
      name: card.name,
      ...card.onDiscard,
      isMockCard: true
    }, 'mock_card');
    playCard(state, mockCardId, player);
  }

  const {
    name,
    attack,
    defense,
    heal,
    healEnemy,
    damageSelf,
    dealsBanishingDamage,
    banishesOnPlay,
    pierces,
    type,
    isMockCard,
    customEffect,
    playCopiesOfCards,
    shuffleCardCopiesIntoOpponentsPiles,
    shuffleCardCopiesIntoYourPiles,
    statBonuses
  } = card;

  const opponent = player === 'you' ? 'enemy' : 'you';

  if (state.winner) {
    return;
  }

  if (!state.winner && !isMockCard) {
    renderActions.push([
      actionGenerators.addCardToStack(state, cardId),
      location && actionGenerators.removeCard(state, player, location, index)
    ].filter(Boolean));
  }

  if (!state.winner) {
    renderActions.push([]);
  }

  if (!state.winner && typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      totalDamageDealt += state[player].statBonuses[type];
      totalDamageDealt += state[player].stats[type];
    }
    if (!pierces) {
      totalDamageDealt = Math.max(totalDamageDealt - state[opponent].shields, 0);
    }

    let totalShields = state[player].shields + defense;
    if (defense) {
      if (['attack', 'magic'].includes(type)) {
        totalShields += state[player].statBonuses.defense;
        totalShields += state[player].stats.defense;
      }
      if (!state.winner) {
        logs.push(logGainShields(
          `${player} gains ${totalShields} shields`,
          player,
          totalShields
        ));
      }
      if (totalDamageDealt === 0) {
        // if no damage is dealt, set shields independently of damage ticks.
        // otherwise, set the shields on the same tick as the first instance of damage. (below)
        renderActions.push([actionGenerators.setShields(state, player, totalShields)]);
      }
    }

    if (attack) {
      logs.push(logReceiveDamage(
        `${opponent} receives ${totalDamageDealt} damage`,
        opponent,
        totalDamageDealt
      ));
    }

    for (let i = 0; i < totalDamageDealt; i++) {
      const removedCardId = state[opponent].deck.getTopCard();
      if (!removedCardId) {
        logs.push(logReceiveFatalDamage(
          `${opponent} received fatal damage!`,
          opponent
        ));
        state.winner = player;
        break;
      }
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(logDiscardCard(
        `${opponent} ${dealsBanishingDamage ? 'banishes' : 'discards'} ${cards[removedCardId].name} (${removedCardId})`,
        opponent,
        dealsBanishingDamage,
        removedCardId
      ));
      const damageAction = [
        actionGenerators.removeCard(state, opponent, 'deck', 'top'),
        actionGenerators.addCard(state, removedCardId, opponent, destination, 'top')
      ];
      if (i === 0) {
        // if damage is dealt, set the shields on the same tick as the first instance of damage.
        // otherwise, set shields independently of damage ticks (above)
        damageAction.push(actionGenerators.setShields(state, player, totalShields));
      }
      renderActions.push(damageAction);

      if (destination === 'discard' && cards[removedCardId].onDiscard) {
        if (state[opponent].deck.length || (
          cards[removedCardId].onDiscard.heal || cards[removedCardId].onDiscard.shuffleCardCopiesIntoYourPiles
        )) {
          triggerDiscardEffect(state, removedCardId, opponent);
          if (state.winner) break;
        }
      }
    }
  }
  
  if (!state.winner && heal) {
    const totalHeal = Math.min(heal, state[player].discard.length);
    logs.push(logHealValue(
      `${player} heals ${totalHeal}`,
      player,
      totalHeal
    ));

    for (let i = 0; i < totalHeal; i++) {
      const healedCardId = state[player].discard.getTopCard();
      logs.push(logHealCard(
        `${player} heals ${cards[healedCardId].name} (${healedCardId})`,
        player,
        healedCardId
      ));
      renderActions.push([
        actionGenerators.removeCard(state, player, 'discard', 'top'),
        actionGenerators.addCard(state, healedCardId, player, 'deck', 'random')
      ]);
    }
  }

  if (!state.winner && healEnemy) {
    const totalHeal = Math.min(healEnemy, state[player].discard.length);
    logs.push(logHealValue(
      `${opponent} heals ${totalHeal}`,
      opponent,
      totalHeal
    ));

    for (let i = 0; i < totalHeal; i++) {
      if (!state[opponent].discard.length) {
        break;
      }

      const healedCardId = state[opponent].discard.getTopCard();
      logs.push(logHealCard(
        `${opponent} heals ${cards[healedCardId].name} (${healedCardId})`,
        player,
        healedCardId
      ));
      renderActions.push([
        actionGenerators.removeCard(state, opponent, 'discard', 'top'),
        actionGenerators.addCard(state, healedCardId, opponent, 'deck', 'random')
      ]);
    }
  }

  if (!state.winner && damageSelf) {
    const totalSelfDamage = Math.min(damageSelf, state[player].deck.length);
    logs.push(logReceiveDamage(
      `${player} receives ${totalSelfDamage} damage`,
      player,
      totalSelfDamage
    ));

    for (let i = 0; i < totalSelfDamage; i++) {
      const removedCardId = state[player].deck.getTopCard();
      if (!removedCardId) {
        logs.push(logReceiveFatalDamage(
          `${player} received fatal damage!`,
          player
        ));
        state.winner = opponent;
        break;
      }
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(logDiscardCard(
        `${player} ${dealsBanishingDamage ? 'banishes' : 'discards'}: ${cards[removedCardId].name} (${removedCardId})`,
        player,
        dealsBanishingDamage,
        removedCardId
      ));
      renderActions.push([
        actionGenerators.removeCard(state, player, 'deck', 'top'),
        actionGenerators.addCard(state, removedCardId, player, destination, 'top')
      ]);

      if (destination === 'discard' && cards[removedCardId].onDiscard) {
        triggerDiscardEffect(state, removedCardId, player);
        if (state.winner) break;
      }
    }
  }

  if (!state.winner && customEffect) {
    customCardEffects[name](state, player);
  }

  if (!state.winner && shuffleCardCopiesIntoOpponentsPiles.length) {
    addCardCopiesIntoPiles(state, shuffleCardCopiesIntoOpponentsPiles, opponent);
  }

  if (!state.winner && shuffleCardCopiesIntoYourPiles.length) {
    addCardCopiesIntoPiles(state, shuffleCardCopiesIntoYourPiles, player);
  }

  if (!state.winner && playCopiesOfCards.length) {
    playCopiesOfCards.forEach(cardName => {
      const cardId = createNewCard(cardName, `battle_${shortid.generate()}`);
      logs.push(logPlayCopyOfCard(
        `${player} plays a copy of ${cardName} (${cardId})`,
        player,
        cardId
      ));
      playCard(state, cardId, player);
    });
  }

  if (!state.winner && statBonuses) {
    Object.keys(statBonuses).forEach(stat => {
      const amount = statBonuses[stat];
      logs.push(logTemporaryStatGain(
        `${player} receives +${amount} ${stat[0].toUpperCase()}${stat.slice(1)} until end of battle`,
        player,
        amount,
        stat
      ));
    });
    renderActions.push([actionGenerators.setStats(state, player, statBonuses)]);
  }

  if (state.stack.length && !isMockCard) {
    renderActions.push([
      actionGenerators.removeTopCardFromStack(state),
      actionGenerators.addCard(state, cardId, player, banishesOnPlay ? 'banish' : 'discard', 'top')
    ]);
  }
};
