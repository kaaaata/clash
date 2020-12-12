import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { playCard } from './playCard';
import { actionGenerators } from './actionGenerators';
import { logHealValue, logHealCard, logPlayCopyOfCard } from './battleLogGenerators';
import { blueprints } from '../cards/blueprints';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';
import shortid from 'shortid';
import { sample } from 'lodash';

export const customCardEffects = {
  'Brawler': (state, player) => {
    // Shuffle a copy of a random non-legendary attack into your deck.
    const attack = blueprints.attacks.getRandomCardByFilter(
      card => ['common', 'uncommon', 'rare'].includes(card.rarity) && !card.isToken
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
        playCard(state, cardId, player, { player, location: 'discard', index: attackIndex });
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
        playCard(state, cardId, player, { player, location: 'discard', index: attackIndex });
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
      playCard(state, cardId, player, { player, location: 'discard', index: allyIndex });
    }
  },
  'Alchemist': (state, player) => {
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
          { player, location: 'banish', index: banishCardIndex },
          false
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
      // intentionally allows tokens and special rarity cards, becuz cool
      blueprints.allCardsArray.getRandomCardByFilter(card => card.rarity !== 'legendary'),
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
    // Shuffle 3 random common or uncommon attack cards into your deck.
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
          && ['common', 'uncommon', 'rare'].includes(card.rarity)
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
        const oldCardId = state[player].discard[discardAllyIndex];
        const oldCard = cards[oldCardId];
        const newCardId = createNewCard({
          ...oldCard,
          attack: oldCard.attack + 2,
          defense: oldCard.defense + 2,
          battleMutatedProperties: {
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
  },
  'The Devourer': (state, player) => {
    // Play a random card from the enemy's deck. It gets +4/+4.
    const enemy = player === 'you' ? 'enemy' : 'you';
    const cardIndex = state[enemy].deck.getRandomCardIndex();
    if (cardIndex !== -1) {
      const card = cards[state[enemy].deck[cardIndex]];
      const isPotion = card.type === 'potion';
      const cardId = createNewCard(
        {
          ...card,
          attack: isPotion ? 0 : card.attack + 4,
          defense: isPotion ? 0 : card.defense + 4,
          battleMutatedProperties: isPotion ? card.battleMutatedProperties : {
            attack: true,
            defense: true
          }
        },
        `battle_${shortid.generate()}`
      );
      state.logs.push(logPlayCopyOfCard(
        `${player} plays ${cards[cardId]}(${cardId})`,
        player,
        cardId,
        "Enemy's deck"
      ));
      playCard(state, cardId, player, { player: enemy, location: 'deck', index: cardIndex });
    }
  },
  'Candy Corn': (state, player) => {
    // Shuffle 2 copies of this card into your deck.
    addCardCopiesIntoPiles(
      state,
      [
        {
          cardId: createNewCard(
            cards[state.stack[state.stack.length - 1]],
            `battle_${shortid.generate()}`
          ),
          pile: 'deck'
        },
        {
          cardId: createNewCard(
            cards[state.stack[state.stack.length - 1]],
            `battle_${shortid.generate()}`
          ),
          pile: 'deck'
        }
      ],
      player
    );
  },
  'Assassin': (state, player) => {
    // Give each card in your hand +1/+1.
    state[player].hand.forEach((cardId, index) => {
      if (cardId && cards[cardId].type !== 'potion') {
        const oldCard = cards[cardId];
        const newCardId = createNewCard({
          ...oldCard,
          attack: oldCard.attack + 1,
          defense: oldCard.defense + 1,
          battleMutatedProperties: {
            attack: true,
            defense: true
          }
        }, `battle_${shortid.generate()}`);
        state[player].hand[index] = newCardId;
        state.renderActions.push([actionGenerators.setCardPile(state, player, 'hand')]);
        state.renderActions.push([]);
      }
    });
  },
  'Inquisitor': (state, player) => {
    // Give a random attack card in your hand +3/+0.
    const cardIds = state[player].hand.filter(
      cardId => cards[cardId] && cards[cardId].type === 'attack'
    );
    const cardId = sample(cardIds);
    const index = state[player].hand.indexOf(cardId);

    if (!!cardId) {
      const oldCard = cards[cardId];
      const newCardId = createNewCard({
        ...oldCard,
        attack: oldCard.attack + 3,
        battleMutatedProperties: {
          attack: true,
          defense: oldCard.battleMutatedProperties.defense
        }
      }, `battle_${shortid.generate()}`);
      state[player].hand[index] = newCardId;
      state.renderActions.push([actionGenerators.setCardPile(state, player, 'hand')]);
      state.renderActions.push([]);
    }
  }
};
