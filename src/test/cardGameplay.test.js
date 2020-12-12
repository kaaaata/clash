import { blueprints } from '../cards/blueprints';
import { cards } from '../cards/cards';
import { CardIdsArray } from '../gameplay/CardIdsArray';
import { playCard } from '../gameplay/playCard';
import { createNewCard } from '../cards/createNewCard';

const state = {};
const defaultStatePiles = {
  you: {
    deck: CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i))),
    discard: CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i))),
    banish: CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i))),
    hand: CardIdsArray(Array(3).fill('Blank').map(i => createNewCard(i))),
  },
  enemy: {
    deck: CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i))),
    discard: CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i))),
    banish: CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i))),
    hand: CardIdsArray(Array(3).fill('Blank').map(i => createNewCard(i))),
  }
};

const simulatePlayCard = ({ cardName, cardId, player = 'you' }) => {
  const _cardId = cardName ? createNewCard(cardName) : cardId; 
  state[player].hand[0] = cardId;
  playCard(state, _cardId, player, { player, location: 'hand', index: 0 });
};

const resetState = () => {
  state.you = {
    name: 'You',
    deck: CardIdsArray(defaultStatePiles.you.deck),
    discard: CardIdsArray(defaultStatePiles.you.discard),
    banish: CardIdsArray(defaultStatePiles.you.banish),
    hand: CardIdsArray(defaultStatePiles.you.hand),
    shields: 0,
    statBonuses: { attack: 0, magic: 0, defense: 0 },
    stats: { attack: 0, magic: 0, defense: 0 }
  };
  state.enemy = {
    name: 'You',
    deck: CardIdsArray(defaultStatePiles.enemy.deck),
    discard: CardIdsArray(defaultStatePiles.enemy.discard),
    banish: CardIdsArray(defaultStatePiles.enemy.banish),
    hand: CardIdsArray(defaultStatePiles.enemy.hand),
    shields: 0,
    statBonuses: { attack: 0, magic: 0, defense: 0 },
    stats: { attack: 0, magic: 0, defense: 0 }
  };
  state.stack = CardIdsArray([]);
  state.winner = null;
  state.logs = [];
  state.renderActions = [];
};

beforeEach(resetState);

test('Damage and damage self works (Vampire)', () => {
  const card = blueprints.allCardsObject['Vampire'];
  simulatePlayCard({ cardName: 'Vampire' });
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.enemy.banish.length).toBe(10 + card.attack);
  expect(state.you.deck.length).toBe(10 - card.damageSelf);
  expect(state.you.banish.length).toBe(10 + card.damageSelf);
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 + 1);
});

test('Healing and heal enemy works (Shaman)', () => {
  const card = blueprints.allCardsObject['Shaman'];
  simulatePlayCard({ cardName: 'Shaman' });
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 - card.heal + 1);
  expect(state.you.deck.length).toBe(10 + card.heal);
  expect(state.enemy.deck.length).toBe(10 + card.healEnemy);
  expect(state.enemy.discard.length).toBe(10 - card.healEnemy);
});

test('Drain works (Water Slime)', () => {
  const card = blueprints.allCardsObject['Water Slime'];
  simulatePlayCard({ cardName: 'Water Slime' });
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 - card.attack + 1);
  expect(state.you.deck.length).toBe(10 + card.attack);

  resetState();

  state.enemy.shields = 1;
  simulatePlayCard({ cardName: 'Water Slime' });
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 - (card.attack - state.enemy.shields) + 1);
  expect(state.you.deck.length).toBe(10 + (card.attack - state.enemy.shields));

  resetState();

  const card1 = createNewCard({
    damageSelf: 3,
    isMockCard: true,
    drain: true,
  }, 'test_mock_card');
  simulatePlayCard({ cardId: card1 });
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(10);

  resetState();

  state.you.shields = 1;
  const card2 = createNewCard({
    damageSelf: 3,
    isMockCard: true,
    drain: true,
  }, 'test_mock_card');
  simulatePlayCard({ cardId: card2 });
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(10);
});

test('Shield works (Cutlass, Sword)', () => {
  const slash = blueprints.allCardsObject['Cutlass'];
  const strike = blueprints.allCardsObject['Sword'];
  simulatePlayCard({ cardName: 'Cutlass' });
  expect(state.you.shields).toBe(slash.defense);
  simulatePlayCard({ cardName: 'Sword', player: 'enemy' });
  expect(state.you.deck.length).toBe(10 - (strike.attack - slash.defense));
});

test('Banishing damage works (Orc Blade)', () => {
  const card = blueprints.allCardsObject['Orc Blade'];
  simulatePlayCard({ cardName: 'Orc Blade' });
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.enemy.discard.length).toBe(10);
  expect(state.enemy.banish.length).toBe(10 + card.attack);
});

test('Banishes on play works (Healing Potion)', () => {
  const card = blueprints.allCardsObject['Healing Potion'];
  simulatePlayCard({ cardName: 'Healing Potion' });
  expect(
    state.you.banish.getRandomCardIndexByFilter(i => cards[i.card].name === 'Healing Potion')
  ).not.toBe(-1);
  expect(state.you.discard.length).toBe(10 - card.onDiscard.heal);
});

test('Piercing damage aka "Pierces" works (Frost)', () => {
  state.enemy.shields = 10;
  
  const card = blueprints.allCardsObject['Frost'];
  simulatePlayCard({ cardName: 'Frost' });
  expect(state.enemy.deck.length).toBe(10 - card.attack);
});

test('Stat bonuses works (Attack Potion, Magic Potion, Defense Potion, Falchion)', () => {
  const attackPotion = createNewCard('Attack Potion');
  const magicPotion = createNewCard('Magic Potion');
  const defensePotion = createNewCard('Defense Potion');

  state.you.deck.push(attackPotion);
  state.you.deck.push(magicPotion);
  state.you.deck.push(defensePotion);
  simulatePlayCard({ cardName: 'Falchion', player: 'enemy' });
  expect(state.you.statBonuses.attack = 1);
  expect(state.you.statBonuses.magic = 1);
  expect(state.you.statBonuses.defense = 1);

  resetState();

  simulatePlayCard({ cardId: attackPotion });
  simulatePlayCard({ cardId: magicPotion });
  simulatePlayCard({ cardId: defensePotion });
  expect(state.you.statBonuses.attack = 1);
  expect(state.you.statBonuses.magic = 1);
  expect(state.you.statBonuses.defense = 1);
});

test('Attacks are buffed by strength, even when attack is 0 (Sword)', () => {
  state.you.statBonuses.attack = 1;
  const card1 = blueprints.allCardsObject['Sword'];
  simulatePlayCard({ cardName: 'Sword' });
  expect(state.enemy.deck.length).toBe(10 - (card1.attack + 1));

  resetState();

  state.you.statBonuses.attack = 1;
  const card2 = createNewCard({
    attack: 0,
    isMockCard: true,
    type: 'attack'
  }, 'test_mock_card');
  simulatePlayCard({ cardId: card2 });
  expect(state.enemy.deck.length).toBe(9);
});

test('Magics are buffed by magic, even when attack is 0 (Fire)', () => {
  state.you.statBonuses.magic = 1;
  const card1 = blueprints.allCardsObject['Frost'];
  simulatePlayCard({ cardName: 'Frost' });
  expect(state.enemy.deck.length).toBe(10 - (card1.attack + 1));

  resetState();

  state.you.statBonuses.magic = 1;
  const card2 = createNewCard({
    attack: 0,
    type: 'magic',
    isMockCard: true
  }, 'test_mock_card');
  simulatePlayCard({ cardId: card2 });
  expect(state.enemy.deck.length).toBe(9);
});

test('Shield is buffed by Defense, even when defense is 0 (Cutlass, Sword)', () => {
  state.you.statBonuses.defense = 1;
  const slash = blueprints.allCardsObject['Cutlass'];
  simulatePlayCard({ cardName: 'Cutlass' });
  expect(state.you.shields).toBe(slash.defense + 1);

  resetState();

  state.you.statBonuses.defense = 1;
  simulatePlayCard({ cardName: 'Sword' });
  expect(state.you.shields).toBe(1);
});

test('Allies are not buffed by stats (Swordsman)', () => {
  state.you.statBonuses.attack = 1;
  state.you.statBonuses.defense = 1;

  const card = blueprints.allCardsObject['Swordsman'];
  simulatePlayCard({ cardName: 'Swordsman' });
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.you.shields).toBe(card.defense);
});

test('Play copies of cards works (Hobgoblin)', () => {
  const hobgoblin = blueprints.allCardsObject['Hobgoblin'];
  const slice = blueprints.allCardsObject['Falchion'];  
  simulatePlayCard({ cardName: 'Hobgoblin' });
  expect(state.enemy.deck.length).toBe(10 - hobgoblin.attack - slice.attack);
  expect(state.you.discard.getRandomCardIndexByFilter(i => cards[i.card].name === 'Falchion'))
    .not.toBe(-1);
});

test('Shuffle card copies into pile works (Paladin, Candy Corn)', () => {
  simulatePlayCard({ cardName: 'Paladin' });
  simulatePlayCard({ cardName: 'Candy Corn' });
  expect(state.you.discard.getRandomCardIndexByFilter(i => cards[i.card].name === 'Candy Corn'))
    .not.toBe(-1);
  expect(state.you.deck.getRandomCardIndexByFilter(i => cards[i.card].name === 'Healing Blade'))
    .not.toBe(-1);
});

test('Discard effects work (Healing Potion, Falchion)', () => {
  state.you.deck = CardIdsArray(
    ['Sword', 'Sword', 'Healing Potion', 'Sword', 'Sword', 'Sword'].map(i => createNewCard(i))
  );
  state.you.discard = CardIdsArray([]);
  state.you.banish = CardIdsArray([]);

  const potion = blueprints.allCardsObject['Healing Potion'];
  simulatePlayCard({ cardName: 'Falchion', player: 'enemy' });

  expect(state.you.discard.length).toBe(1);
  expect(state.you.banish.length).toBe(1);
  expect(state.you.deck.length).toBe(potion.onDiscard.heal + 1);
});

test('Non-draw win conditions are working (Healing Potion, Falchion)', () => {
  state.you.deck = CardIdsArray(
    ['Sword', 'Healing Potion', 'Sword', 'Sword', 'Sword'].map(i => createNewCard(i))
  );
  simulatePlayCard({ cardName: 'Falchion', player: 'enemy' });
  expect(state.you.deck.length).toBe(3);
  expect(state.winner).toBe(null);

  resetState();

  state.you.deck = CardIdsArray(
    ['Sword', 'Sword', 'Sword'].map(i => createNewCard(i))
  );
  simulatePlayCard({ cardName: 'Falchion', player: 'enemy' });
  expect(state.winner).toBe('enemy');

  resetState();

  state.you.deck = CardIdsArray(
    ['Burn', 'Burn'].map(i => createNewCard(i))
  );
  simulatePlayCard({ cardName: 'Falchion', player: 'enemy' });
  expect(state.winner).toBe('enemy');

  resetState();

  state.enemy.deck = CardIdsArray(Array(5).fill('Burn').map(i => createNewCard(i)));
  const damageCard = createNewCard({
    attack: 10,
    isMockCard: true
  }, 'test_mock_card');
  simulatePlayCard({ cardId: damageCard });
  expect(state.enemy.deck.length).toBe(0);

  resetState();

  state.you.deck = CardIdsArray(Array(5).fill('Burn').map(i => createNewCard(i)));
  const damageSelfCard = createNewCard({
    damageSelf: 10,
    isMockCard: true
  }, 'test_mock_card');
  simulatePlayCard({ cardId: damageSelfCard });
  expect(state.you.deck.length).toBe(0);
});

test('Mock cards disappear after being played', () => {
  const card = createNewCard({
    attack: 1,
    isMockCard: true
  }, 'test_mock_card');
  simulatePlayCard({ cardId: card });
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(10);
  expect(state.you.banish.length).toBe(10);
  expect(state.enemy.discard.length).toBe(11);
  expect(state.enemy.deck.length).toBe(9);
  expect(state.enemy.banish.length).toBe(10);
});

test('CUSTOM CARD EFFECT (Brawler)', () => {
  simulatePlayCard({ cardName: 'Brawler' });
  expect(state.you.deck.filter(i => cards[i].type === 'attack').length).toBe(11);
  expect(state.you.deck.filter(i => cards[i].rarity === 'legendary').length).toBe(0);
});

test('CUSTOM CARD EFFECT (Recruiter, Mage)', () => {
  state.you.discard.push(createNewCard('Mage'));

  simulatePlayCard({ cardName: 'Recruiter' });
  expect(state.you.discard.getRandomCardIndexByFilter(i => cards[i.card].name === 'Mage'))
    .toBe(-1);
  expect(state.you.banish.getRandomCardIndexByFilter(i => cards[i.card].name === 'Mage'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Alchemist, Healing Potion)', () => {
  state.you.banish.push(createNewCard('Healing Potion'));

  simulatePlayCard({ cardName: 'Alchemist' });
  expect(state.you.banish.getRandomCardIndexByFilter(i => cards[i.card].name === 'Healing Potion'))
    .toBe(-1);
  expect(state.you.deck.getRandomCardIndexByFilter(i => cards[i.card].name === 'Healing Potion'))
    .not.toBe(-1);
});

// test('CUSTOM CARD EFFECT (Magic Scroll)', () => {
//   // it seems that this card is impossible to test
// });

test('CUSTOM CARD EFFECT (Golden Goblet)', () => {
  simulatePlayCard({ cardName: 'Golden Goblet' });
  expect(state.you.banish.length).toBe(6);
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(15);
});

test('CUSTOM CARD EFFECT (Viking Slime)', () => {
  simulatePlayCard({ cardName: 'Viking Slime' });
  expect(state.you.deck.length).toBe(13)
  expect(state.you.deck.filter(i => (
    ['common', 'uncommon'].includes(cards[i].rarity)
    && cards[i].type === 'attack'
  )).length)
    .toBe(state.you.deck.length);
});

test('CUSTOM CARD EFFECT (Tome of Spells)', () => {
  simulatePlayCard({ cardName: 'Tome of Spells' });
  expect(state.you.deck.length).toBe(14);
  expect(state.you.deck.filter(i => cards[i].type === 'magic').length)
    .toBe(4);
});

test('CUSTOM CARD EFFECT (Minotaur)', () => {
  state.you.discard = CardIdsArray(Array(10).fill('Cutlass').map(i => createNewCard(i)));
  simulatePlayCard({ cardName: 'Minotaur' });
  expect(state.you.banish.length).toBe(12);
  expect(state.you.discard.length).toBe(9);
  expect(state.you.shields).toBe(2);
  expect(state.enemy.deck.length).toBe(4);
});

test('CUSTOM CARD EFFECT (Lich)', () => {
  state.you.discard = CardIdsArray(Array(2).fill('Swordsman').map(i => createNewCard(i)));
  simulatePlayCard({ cardName: 'Lich' });
  expect(state.you.discard.length).toBe(1);
  expect(state.you.deck.length).toBe(12);
  expect(state.you.deck.filter(i => (
    cards[i].name === 'Swordsman'
    && cards[i].attack === 6
  )).length)
    .toBe(2);
});

test('CUSTOM CARD EFFECT (Flowy Lady)', () => {
  state.you.deck = CardIdsArray(['Blank'].map(i => createNewCard(i)));
  state.you.discard = CardIdsArray(['Blank'].map(i => createNewCard(i)));
  state.you.hand = CardIdsArray(['Blank', 'Blank', 'Blank'].map(i => createNewCard(i)));
  state.you.banish = CardIdsArray(['Blank'].map(i => createNewCard(i)));
  simulatePlayCard({ cardName: 'Flowy Lady' });
  ['deck', 'discard', 'hand', 'banish'].forEach(pile => {
    expect(state.you[pile].filter(i => (
      cards[i]
      && cards[i].name === 'Blank'
      && cards[i].attack === 3
      && cards[i].defense === 3
    )).length)
      .not.toBe(0);
  });

  resetState();

  state.you.deck = CardIdsArray(['Blank', 'Flowy Lady'].map(i => createNewCard(i)));
  state.you.discard = CardIdsArray(['Blank'].map(i => createNewCard(i)));
  state.you.hand = CardIdsArray(['Blank', 'Blank', 'Blank'].map(i => createNewCard(i)));
  state.you.banish = CardIdsArray(['Blank'].map(i => createNewCard(i)));
  const card = createNewCard({
    attack: 1,
    isMockCard: true
  }, 'test_mock_card');
  simulatePlayCard({ cardId: card, player: 'enemy' });
  ['deck', 'discard', 'hand', 'banish'].forEach(pile => {
    expect(state.you[pile].filter(i => (
      cards[i].name === 'Blank'
      && cards[i].attack === 3
      && cards[i].defense === 3
    )).length)
      .not.toBe(0);
  });
});

test('CUSTOM CARD EFFECT (The Devourer)', () => {
  state.enemy.deck = CardIdsArray(Array(10).fill('Blank').map(i => createNewCard(i)));
  simulatePlayCard({ cardName: 'The Devourer' });
  expect(state.enemy.deck.length).toBe(5);
  expect(state.you.discard.length).toBe(12);

  resetState();

  state.enemy.deck = CardIdsArray(['Healing Potion'].map(i => createNewCard(i)));
  simulatePlayCard({ cardName: 'The Devourer' });
  expect(state.enemy.deck.length).toBe(0);
  expect(state.you.discard.length).toBe(8);
  expect(state.you.banish.length).toBe(11);
});

test('CUSTOM CARD EFFECT (Candy Corn)', () => {
  const candyCorn = blueprints.allCardsObject['Candy Corn'];
  const card = createNewCard({
    ...candyCorn,
    attack: candyCorn.attack + 3
  });
  simulatePlayCard({ cardId: card });
  state.you.deck.filter(card => cards[card].name === 'Candy Corn').forEach((card) => {
    expect(cards[card].attack).toBe(candyCorn.attack + 3)
  });
});

test('CUSTOM CARD EFFECT (Assassin)', () => {
  simulatePlayCard({ cardName: 'Assassin' });
  expect(state.enemy.deck.length).toBe(6);
  expect(state.you.discard.length).toBe(13);
  expect(state.you.hand
    .filter(cardId => cardId && cards[cardId].attack === 1 && cards[cardId].defense === 1)
    .length
  ).toBe(2);
});

test('CUSTOM CARD EFFECT (Inquisitor)', () => {
  simulatePlayCard({ cardName: 'Inquisitor' });
  expect(state.you.hand
    .filter(cardId => cardId && cards[cardId].attack === 3 && cards[cardId].defense === 0)
    .length
  ).toBe(1);
});
