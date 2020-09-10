import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { playCard } from './playCard';
import { actionGenerators } from './actionGenerators';
import { logHealValue, logHealCard, logPlayCopyOfCard } from './battleLogGenerators';
import { blueprints } from '../cards/blueprints';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';

export const customCardEffects = {
  'Brawler': (state, player) => {
    // Shuffle a copy of a random non-legendary attack into your deck.
    const attack = blueprints.attacks.getRandomCardByFilter(
      card => card.rarity !== 'legendary'
    );
    addCardCopiesIntoPiles(state, [{ cardName: attack.name, pile: 'deck' }], player);
  },
  'Minotaur': (state, player) => {
    // Play 2 random attacks from your discard, then banish them.
    for (let i = 0; i < 2; i++) {
      const attackIndex = state[player].discard.getRandomCardIndexByFilter(
        i => cards[i.card].type === 'attack'
      );
      const cardId = createNewCard({
        ...cards[state[player].discard[attackIndex]],
        banishesOnPlay: true
      });
      if (attackIndex !== -1) {
        playCard(state, cardId, player, 'discard', attackIndex);
      }
    }
  },
  'Mage': (state, player) => {
    // Play 2 random magic attacks from your discard, then banish them.
    for (let i = 0; i < 2; i++) {
      const attackIndex = state[player].discard.getRandomCardIndexByFilter(
        i => cards[i.card].type === 'magic'
      );
      const cardId = createNewCard({
        ...cards[state[player].discard[attackIndex]],
        banishesOnPlay: true
      });
      if (attackIndex !== -1) {
        playCard(state, cardId, player, 'discard', attackIndex);
      }
    }
  },
  'Recruiter': (state, player) => {
    // Play a random ally from your discard pile, then banish it.
    const allyIndex = state[player].discard.getRandomCardIndexByFilter(
      i => cards[i.card].type === 'ally'
    );
    const cardId = createNewCard({
      ...cards[state[player].discard[allyIndex]],
      banishesOnPlay: true
    });
    if (allyIndex !== -1) {
      playCard(state, cardId, player, 'discard', allyIndex);
    }
  },
  'Apothecary': (state, player) => {
    // When played or discarded, shuffle a random potion from your banish into your deck.
    const potionIndex = state[player].banish.getRandomCardIndexByFilter(
      i => cards[i.card].type === 'potion' && !cards[i.card].isToken
    );
    if (potionIndex !== -1) {
      addCardCopiesIntoPiles(
        state,
        [{ cardId: state[player].banish[potionIndex], pile: 'deck' }],
        player,
        { player, location: 'banish', index: potionIndex }
      );
    }
  },
  'Golden Goblet': (state, player) => {
    // Shuffle 5 cards from your banish into your discard. Heal 5.
    for (let i = 0; i < 5; i++) {
      const banishCardIndex = state[player].banish.getRandomCardIndex();
      if (banishCardIndex !== -1) {
        addCardCopiesIntoPiles(
          state,
          [{ cardId: state[player].banish[banishCardIndex], pile: 'discard' }],
          player,
          { player, location: 'banish', index: banishCardIndex }
        );
      }
    }

    // COPIED AND PASTED HEAL CODE FROM playCard.js SO HEAL CAN HAPPEN AFTER CUSTOM EFFECT
    const totalHeal = Math.min(5, state[player].discard.length);
    state.logs.push(logHealValue(
      `${player} heals ${totalHeal}`,
      player,
      totalHeal
    ));
    for (let i = 0; i < totalHeal; i++) {
      const healedCardId = state[player].discard.getTopCard();
      state.logs.push(logHealCard(
        `${player} heals ${cards[healedCardId].name} (${healedCardId})`,
        player,
        healedCardId
      ));
      state.renderActions.push([
        actionGenerators.removeCard(state, player, 'discard', 'top'),
        actionGenerators.addCard(state, healedCardId, player, 'deck', 'random')
      ]);
    }
  },
  'Magic Scroll': (state, player) => {
    // Play a copy of a random non-legendary card.
    const randomCardId = createNewCard(
      blueprints.allCardsArray.getRandomCardByFilter(
        card => card.name !== 'Magic Scroll' && card.rarity !== 'legendary'
      )
    );
    state.logs.push(logPlayCopyOfCard(
      `${player} plays a copy of ${cards[randomCardId]}(${randomCardId})`,
      player,
      randomCardId
    ));
    playCard(state, randomCardId, player);
  },
  'Jello Slime': (state, player) => {
    // Shuffle 3 random common or uncommon cards into your deck.
    const copies = [1, 2, 3].map(i => ({
      cardName: blueprints.allCardsArray.getRandomCardByFilter(
        card => (
          !card.isToken
          && card.name !== 'Jello Slime'
          && ['common', 'uncommon'].includes(card.rarity)
        )
      ).name,
      pile: 'deck'
    }));
    addCardCopiesIntoPiles(state, copies, player);
  },
  'Tome of Spells': (state, player) => {
    // When played or discarded, shuffle 4 random non-legendary magic attacks into your deck.
    const copies = [1, 2, 3, 4].map(i => ({
      cardName: blueprints.allCardsArray.getRandomCardByFilter(
        card => (
          !card.isToken
          && card.type === 'magic'
          && card.rarity !== 'legendary'
        )
      ).name,
      pile: 'deck'
    }));
    addCardCopiesIntoPiles(state, copies, player);
  }
};
