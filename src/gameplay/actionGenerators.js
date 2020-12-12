import { random, sample, shuffle } from 'lodash';
import shortid from 'shortid';
import { blueprints } from '../cards/blueprints';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';
import { store } from '../stores/store';
import { actionKeys } from './actionKeys';
import { playFirstCardInRound } from './playFirstCardInRound';

export const actionGenerators = {
  // these functions mutate state and return actions.
  // actionKey = redux action key
  // payload = redux action payload
  // to be executed in <Battle>
  setCardPile: (state, player, pile) => ({
    actionKey: actionKeys[player][pile],
    payload: state[player][pile].getCardIds()
  }),
  addCardToStack: (state, cardId) => {
    state.stack.addCardToTop(cardId);
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardIds()
    };
  },
  removeTopCardFromStack: (state) => {
    state.stack.removeTopCard();
    return {
      actionKey: 'setStack',
      payload: state.stack.getCardIds()
    };
  },
  addCard: (state, cardId, player, pile, index) => {
    // index = number|'top'|'random'
    if (pile === 'hand') {
      state[player][pile][index] = cardId;
    } else if (index === 'top') {
      state[player][pile].addCardToTop(cardId);
    } else if (index === 'random') {
      state[player][pile].addCardAtRandomIndex(cardId);
    }
    return {
      actionKey: actionKeys[player][pile],
      payload: state[player][pile].getCardIds()
    };
  },
  removeCard: (state, player, pile, index) => {
    // index = number|'top'
    if (!index && index !== 0) {
      return null;
    } else if (pile === 'hand') {
      state[player][pile][index] = null;
    } else if (index === 'top') {
      state[player][pile].removeTopCard();
    } else {
      state[player][pile].removeCardAtIndex(index);
    }
    return {
      actionKey: actionKeys[player][pile],
      payload: state[player][pile].getCardIds()
    };
  },
  setShields: (state, player, value) => {
    state[player].shields = value;
    return {
      actionKey: actionKeys[player].shields,
      payload: value
    };
  },
  setStats: (state, player, statBonuses) => {
    // statBonuses like { attack: 1, defense: 1 }
    Object.keys(statBonuses).forEach(stat => {
      state[player].statBonuses[stat] += statBonuses[stat];
    });
    return {
      actionKey: 'setStats',
      payload: {
        stats: { ...state[player].statBonuses },
        type: 'bonuses',
        player,
        operation: 'set'
      }
    };
  }
};

export const specialAbilityActionGenerators = {
  'Vampire': () => {
    const { enemyShields } = store.getState().clashBattleStats;
    let yourDiscard = [...store.getState().clashBattleCards.yourDiscard];
    let yourDeck = [...store.getState().clashBattleCards.yourDeck];
    const renderActions = [[{ actionKey: 'setEnemyShields', payload: 0 }]];
    for (let i = 0; i < enemyShields; i++) {
      const healedCardId = yourDiscard[yourDiscard.length - 1];
      if (healedCardId) {
        yourDiscard = yourDiscard.slice(0, yourDiscard.length - 1);
        yourDeck = [...yourDeck, healedCardId];
        renderActions.push([
          { actionKey: 'setYourDiscard', payload: yourDiscard },
          { actionKey: 'setYourDeck', payload: yourDeck }
        ]);
      }
    }
    return renderActions;
  },
  'Ice Whelp': () => {
    const { enemyDiscard } = store.getState().clashBattleCards;
    const cardId = enemyDiscard[enemyDiscard.length - 1];
    if (!cardId) {
      return [];
    }
    const renderActions = [
      [
        { actionKey: 'setEnemyDiscard', payload: enemyDiscard.slice(0, enemyDiscard.length - 1) },
        { actionKey: 'setStack', payload: [cardId] }
      ],
      [],
      [
        { actionKey: 'setStack', payload: [] },
        {
          actionKey: 'addCardsToCollection',
          payload: createNewCard({
            ...cards[cardId],
            battleMutatedProperties: { attack: false, defense: false }
          })
        }
      ]
    ];
    return renderActions;
  },
  'Assassin': () => playFirstCardInRound(null, true),
  'Elementalist': () => {
    const { yourHand } = store.getState().clashBattleCards;
    const { specialAbilityBars } = store.getState().clashBattleStats;
    const element = specialAbilityBars % 2 === 0 ? 'fire' : 'frost';
    const newHand = yourHand.map((cardId, index) => {
      if (cards[cardId].tags[element]) {
        const newCardId = createNewCard({
          ...cards[cardId],
          attack: cards[cardId].attack + 1,
          defense: cards[cardId].defense + 1,
          battleMutatedProperties: { attack: true, defense: true }
        }, `battle_${shortid.generate()}`);
        delete cards[cardId];
        return newCardId;
      } else {
        return cardId;
      }
    });
    const renderActions = [[{ actionKey: 'setYourHand', payload: newHand }]];
    return renderActions;
  },
  'Paladin': () => {
    let yourDiscard = [...store.getState().clashBattleCards.yourDiscard];
    let yourDeck = [...store.getState().clashBattleCards.yourDeck];
    const renderActions = [];
    for (let i = 0; i < 3; i++) {
      const cardId = yourDiscard[yourDiscard.length - 1];
      if (!cardId) {
        continue;
      }
      const newCardId = cards[cardId].type === 'potion' ? cardId : createNewCard({
        ...cards[cardId],
        attack: cards[cardId].attack + 1,
        defense: cards[cardId].defense + 1,
        battleMutatedProperties: { attack: true, defense: true }
      }, `battle_${shortid.generate()}`);
      yourDiscard = yourDiscard.slice(0, yourDiscard.length - 1);
      renderActions.push([
        { actionKey: 'setYourDiscard', payload: [...yourDiscard] },
        { actionKey: 'setStack', payload: [newCardId] }
      ]);
      renderActions.push([]);
      yourDeck = shuffle([...yourDeck, newCardId]);
      renderActions.push([
        { actionKey: 'setStack', payload: [] },
        { actionKey: 'setYourDeck', payload: [...yourDeck] }
      ]);
    }
    return renderActions;
  },
  'Alchemist': () => {
    const yourHand = [...store.getState().clashBattleCards.yourHand];
    const renderActions = [];
    for (let i = 0; i < 3; i++) {
      yourHand[i] = null;
      renderActions.push([{ actionKey: 'setYourHand', payload: [...yourHand] }])
    }
    for (let i = 0; i < 3; i++) {
      const randomPotion = createNewCard(
        blueprints.potions.getRandomCardByFilter(
          card => ['common', 'uncommon', 'rare'].includes(card.rarity) && !card.isToken
        ),
        `battle_${shortid.generate()}`
      );
      renderActions.push([{ actionKey: 'setStack', payload: [randomPotion] }]);
      renderActions.push([]);
      yourHand[i] = randomPotion;
      renderActions.push([
        { actionKey: 'setStack', payload: [] },
        { actionKey: 'setYourHand', payload: [...yourHand] }
      ]);
    }
    return renderActions;
  },
  'Inquisitor': () => {
    const { yourHand } = store.getState().clashBattleCards;
    const cardIndex = sample(yourHand
      .map((cardId, index) => cards[cardId].type === 'attack' ? index : null)
      .filter(cardId => [0, 1, 2].includes(cardId))
    );
    if (typeof cardIndex !== 'number') {
      return [];
    } else {
      const oldCard = cards[yourHand[cardIndex]];
      const newCardId = createNewCard({
        ...oldCard,
        attack: oldCard.attack + 2,
        battleMutatedProperties: {
          attack: true,
          defense: oldCard.battleMutatedProperties.defense
        }
      }, `battle_${shortid.generate()}`);
      yourHand[cardIndex] = newCardId;
      store.getState().clashBattleStats.yourShields = 6;
      return [
        [{ actionKey: 'setYourShields', payload: 6 }],
        [],
        ...playFirstCardInRound(cardIndex)
      ];
    }
  }
};
