import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { playCard } from './playCard';
import { actionGenerators } from './actionGenerators';
import { logHealValue, logHealCard, logPlayCopyOfCard } from './battleLogGenerators';
import { blueprints } from '../cards/blueprints';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';
import shortid from 'shortid';

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
      if (attackIndex !== -1) {
        const cardId = createNewCard({
          ...cards[state[player].discard[attackIndex]],
          banishesOnPlay: true
        }, `battle_${shortid.generate()}`);
        state.logs.push(logPlayCopyOfCard(
          `${player} plays ${cards[cardId]}(${cardId})`,
          player,
          cardId,
          "Player's discard"
        ));
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
      if (attackIndex !== -1) {
        const cardId = createNewCard({
          ...cards[state[player].discard[attackIndex]],
          banishesOnPlay: true
        }, `battle_${shortid.generate()}`);
        state.logs.push(logPlayCopyOfCard(
          `${player} plays ${cards[cardId]}(${cardId})`,
          player,
          cardId,
          "Player's discard"
        ));
        playCard(state, cardId, player, 'discard', attackIndex);
      }
    }
  },
  'Recruiter': (state, player) => {
    // Play a random ally from your discard pile, then banish it.
    const allyIndex = state[player].discard.getRandomCardIndexByFilter(
      i => cards[i.card].type === 'ally'
    );
    if (allyIndex !== -1) {
      const cardId = createNewCard({
        ...cards[state[player].discard[allyIndex]],
        banishesOnPlay: true
      }, `battle_${shortid.generate()}`);
      state.logs.push(logPlayCopyOfCard(
        `${player} plays ${cards[cardId]}(${cardId})`,
        player,
        cardId,
        "Player's discard"
      ));
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
      ),
      `battle_${shortid.generate()}`
    );
    state.logs.push(logPlayCopyOfCard(
      `${player} plays a copy of ${cards[randomCardId]}(${randomCardId})`,
      player,
      randomCardId
    ));
    playCard(state, randomCardId, player);
  },
  'Viking Slime': (state, player) => {
    // Shuffle 3 random common or uncommon cards into your deck.
    const copies = [1, 2, 3].map(i => ({
      cardName: blueprints.allCardsArray.getRandomCardByFilter(
        card => (
          !card.isToken
          && card.type === 'attack'
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
  },
  'Lich': (state, player) => {
    // Shuffle 2 random allies from your discard pile into your deck. They get +2/+2.
    for (let i = 0; i < 2; i++) {
      const discardAllyIndex = state[player].discard.getRandomCardIndexByFilter(
        i => cards[i.card].type === 'ally'
      );
      if (discardAllyIndex !== -1) {
        const oldCard = cards[state[player].discard[discardAllyIndex]];
        const newCardId = createNewCard({
          ...oldCard,
          attack: oldCard.attack + 2,
          defense: oldCard.defense + 2,
          battleMutatedProperties: {
            ...oldCard.battleMutatedProperties,
            attack: true,
            defense: true
          }
        }, `battle_${shortid.generate()}`);
        addCardCopiesIntoPiles(
          state,
          [{ cardId: newCardId, pile: 'deck' }],
          player,
          { player, location: 'discard', index: discardAllyIndex }
        );
      }
    }
  },
  'Flowy Lady': (state, player) => {
    // Give all Blanks in your deck, discard, hand, and banish +3/+3.
    ['deck', 'discard', 'hand', 'banish'].forEach(pile => {
      state[player][pile].forEach((cardId, index) => {
        // empty slots in "hand" are null, to preserve spacing
        if (cardId && cards[cardId].name === 'Blank') {
          const oldCard = cards[cardId];
          const newCardId = createNewCard({
            ...oldCard,
            attack: oldCard.attack + 3,
            defense: oldCard.defense + 3,
            battleMutatedProperties: {
              ...oldCard.battleMutatedProperties,
              attack: true,
              defense: true
            }
          }, `battle_${shortid.generate()}`);
          state[player][pile][index] = newCardId;
        }
      });
    });
    state.renderActions.push([
      actionGenerators.setCardPile(state, 'you', 'deck'),
      actionGenerators.setCardPile(state, 'you', 'discard'),
      actionGenerators.setCardPile(state, 'you', 'hand'),
      actionGenerators.setCardPile(state, 'you', 'banish')
    ]);
  }
};
