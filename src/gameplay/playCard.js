import { actionGenerators } from './actionGenerators';
import { cards } from '../cards/cards';
import { createCard } from '../cards/createCard';
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

// can't move triggerDiscardEffect into new file because it calls playCard (import loop)
const triggerDiscardEffect = (state, player) => {
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!
  const discardedCard = state[player].discard.getTopCard();
  logs.push(logTriggerDiscardEffect(
    `${player} triggers discard effect of ${discardedCard.name}`,
    player,
    discardedCard.name
  ));

  renderActions.push([
    actionGenerators.removeCard(state, player, 'discard', 'top'),
    actionGenerators.addCardToStack(state, discardedCard)
  ]);

  const mockCard = createCard({
    name: discardedCard.name,
    ...discardedCard.onDiscard,
    player,
    isMockCard: true
  });

  playCard(state, mockCard, player);

  renderActions.push([
    actionGenerators.removeTopCardFromStack(state),
    actionGenerators.addCard(
      state,
      discardedCard,
      player,
      discardedCard.banishesOnPlay ? 'banish' : 'discard',
      'top'
    )
  ]);
};

// a player loses if they receive damage while deck size is 0, or they cannot draw a card.
export const playCard = (state, card, player, location, index) => {
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!
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
      actionGenerators.addCardToStack(state, card),
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
      const removedCard = state[opponent].deck.getTopCard();
      if (!removedCard) {
        logs.push(logReceiveFatalDamage(
          `${opponent} received fatal damage!`,
          opponent
        ));
        state.winner = player;
        break;
      }
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(logDiscardCard(
        `${opponent} ${dealsBanishingDamage ? 'banishes' : 'discards'} ${removedCard.name}`,
        opponent,
        dealsBanishingDamage,
        removedCard.name
      ));
      const damageAction = [
        actionGenerators.removeCard(state, opponent, 'deck', 'top'),
        actionGenerators.addCard(state, removedCard, opponent, destination, 'top')
      ];
      if (i === 0) {
        // if damage is dealt, set the shields on the same tick as the first instance of damage.
        // otherwise, set shields independently of damage ticks (above)
        damageAction.push(actionGenerators.setShields(state, player, totalShields));
      }
      renderActions.push(damageAction);

      if (destination === 'discard' && removedCard.onDiscard) {
        if (state[opponent].deck.length || (
          removedCard.onDiscard.heal || removedCard.onDiscard.shuffleCardCopiesIntoYourPiles
        )) {
          triggerDiscardEffect(state, opponent);
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
      const healedCard = state[player].discard.getTopCard();
      logs.push(logHealCard(
        `${player} heals ${healedCard.name}`,
        player,
        healedCard.name
      ));
      renderActions.push([
        actionGenerators.removeCard(state, player, 'discard', 'top'),
        actionGenerators.addCard(state, healedCard, player, 'deck', 'random')
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

      const healedCard = state[opponent].discard.getTopCard();
      logs.push(logHealCard(
        `${opponent} heals ${healedCard.name}`,
        player,
        healedCard.name
      ));
      renderActions.push([
        actionGenerators.removeCard(state, opponent, 'discard', 'top'),
        actionGenerators.addCard(state, healedCard, opponent, 'deck', 'random')
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
      const removedCard = state[player].deck.getTopCard();
      if (!removedCard) {
        logs.push(logReceiveFatalDamage(
          `${player} received fatal damage!`,
          player
        ));
        state.winner = opponent;
        break;
      }
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(logDiscardCard(
        `${player} ${dealsBanishingDamage ? 'banishes' : 'discards'}: ${removedCard.name}`,
        player,
        dealsBanishingDamage,
        removedCard.name
      ));
      renderActions.push([
        actionGenerators.removeCard(state, player, 'deck', 'top'),
        actionGenerators.addCard(state, removedCard, player, destination, 'top')
      ]);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(state, player);
        if (state.winner) break;
      }
    }
  }

  if (!state.winner && customEffect) {
    customCardEffects[name](state, card, player);
  }

  if (!state.winner && shuffleCardCopiesIntoOpponentsPiles.length) {
    addCardCopiesIntoPiles(state, shuffleCardCopiesIntoOpponentsPiles, opponent);
  }

  if (!state.winner && shuffleCardCopiesIntoYourPiles.length) {
    addCardCopiesIntoPiles(state, shuffleCardCopiesIntoYourPiles, player);
  }

  if (!state.winner && playCopiesOfCards.length) {
    playCopiesOfCards.forEach(cardName => {
      logs.push(logPlayCopyOfCard(
        `${player} plays a copy of ${cardName}`,
        player,
        cardName
      ));
      playCard(state, cards[cardName], player);
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
      actionGenerators.addCard(state, card, player, banishesOnPlay ? 'banish' : 'discard', 'top')
    ]);
  }
};
