import { cards } from '../components/clash/cards/cards';
import { createCard } from '../components/clash/cards/createCard';
import { CardsArray } from '../components/clash/gameplay/CardsArray';
import { playCard } from '../components/clash/gameplay/playCard';

const state = {};

const simulatePlayCard = (card, player = 'you') => {
  state[player].hand[0] = cards[card];
  playCard(state, card, player, 'hand', 0);
};

const resetState = () => {
  state.you = {
    name: 'You',
    deck: CardsArray(Array(10).fill('Sword')),
    discard: CardsArray(Array(10).fill('Sword')),
    banish: CardsArray(Array(10).fill('Sword')),
    hand: CardsArray(Array(3).fill('Sword')),
    shields: 0,
    statBonuses: { attack: 0, magic: 0, defense: 0 },
    stats: { attack: 0, magic: 0, defense: 0 }
  };
  state.enemy = {
    name: 'You',
    deck: CardsArray(Array(10).fill('Sword')),
    discard: CardsArray(Array(10).fill('Sword')),
    banish: CardsArray(Array(10).fill('Sword')),
    hand: CardsArray(Array(3).fill('Sword')),
    shields: 0,
    statBonuses: { attack: 0, magic: 0, defense: 0 },
    stats: { attack: 0, magic: 0, defense: 0 }
  };
  state.stack = CardsArray([]);
  state.winner = null;
  state.logs = [];
  state.renderActions = [];
};

beforeEach(resetState);

test('Damage and damage self works (Vampire)', () => {
  const card = cards['Vampire'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.enemy.banish.length).toBe(10 + card.attack);
  expect(state.you.deck.length).toBe(10 - card.damageSelf);
  expect(state.you.banish.length).toBe(10 + card.damageSelf);
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 + 1);
});

test('Healing and heal enemy works (Mermaid)', () => {
  const card = cards['Mermaid'];
  simulatePlayCard(card);
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 - card.heal + 1);
  expect(state.you.deck.length).toBe(10 + card.heal);
  expect(state.enemy.deck.length).toBe(10 + card.healEnemy);
  expect(state.enemy.discard.length).toBe(10 - card.healEnemy);
});

test('Shield works (Cutlass, Sword)', () => {
  const slash = cards['Cutlass'];
  const strike = cards['Sword'];
  simulatePlayCard(slash);
  expect(state.you.shields).toBe(slash.defense);
  simulatePlayCard(strike, 'enemy');
  expect(state.you.deck.length).toBe(10 - (strike.attack - slash.defense));
});

test('Banishing damage works (Orc Blade)', () => {
  const card = cards['Orc Blade'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.enemy.discard.length).toBe(10);
  expect(state.enemy.banish.length).toBe(10 + card.attack);
});

test('Banishes on play works (Healing Potion)', () => {
  const card = cards['Healing Potion'];
  simulatePlayCard(card);
  expect(state.you.banish.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .not.toBe(-1);
  expect(state.you.discard.length).toBe(10 - card.heal);
});

test('Piercing damage aka "Pierces" works (Fire)', () => {
  state.enemy.shields = 10;
  
  const card = cards['Fire'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
});

test('Stat bonuses works (Attack Potion, Magic Potion, Defense Potion, Falchion)', () => {
  const attackPotion = cards['Attack Potion'];
  const magicPotion = cards['Magic Potion'];
  const defensePotion = cards['Defense Potion'];
  state.you.deck.push(attackPotion);
  state.you.deck.push(magicPotion);
  state.you.deck.push(defensePotion);
  simulatePlayCard(cards['Falchion'], 'enemy');
  expect(state.you.statBonuses.attack = 1);
  expect(state.you.statBonuses.magic = 1);
  expect(state.you.statBonuses.defense = 1);

  resetState();

  simulatePlayCard(attackPotion);
  simulatePlayCard(magicPotion);
  simulatePlayCard(defensePotion);
  expect(state.you.statBonuses.attack = 1);
  expect(state.you.statBonuses.magic = 1);
  expect(state.you.statBonuses.defense = 1);
});

test('Attacks are buffed by Attack, except when attack is 0 (Sword)', () => {
  state.you.statBonuses.attack = 1;

  const card1 = cards['Sword'];
  simulatePlayCard(card1);
  expect(state.enemy.deck.length).toBe(10 - (card1.attack + 1));

  resetState();

  const card2 = createCard({
    attack: 0,
    isMockCard: true
  });
  simulatePlayCard(card2);
  expect(state.enemy.deck.length).toBe(10);
});

test('Magics are buffed by Magic, except when attack is 0 (Fire)', () => {
  state.you.statBonuses.magic = 1;

  const card1 = cards['Fire'];
  simulatePlayCard(card1);
  expect(state.enemy.deck.length).toBe(10 - (card1.attack + 1));

  resetState();

  const card2 = createCard({
    attack: 0,
    type: 'magic',
    isMockCard: true
  });
  simulatePlayCard(card2);
  expect(state.enemy.deck.length).toBe(10);
});

test('Shield is buffed by Defense, expect when defense is 0 (Cutlass, Sword)', () => {
  state.you.statBonuses.defense = 1;

  const slash = cards['Cutlass'];
  simulatePlayCard(slash);
  expect(state.you.shields).toBe(slash.defense + 1);

  resetState();

  const strike = cards['Sword'];
  simulatePlayCard(strike);
  expect(state.you.shields).toBe(0);
});

test('Allies are not buffed by stats (Swordsman)', () => {
  state.you.statBonuses.attack = 1;
  state.you.statBonuses.defense = 1;

  const card = cards['Swordsman'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.you.shields).toBe(card.defense);
});

test('Play copies of cards works (Hobgoblin)', () => {
  const hobgoblin = cards['Hobgoblin'];
  const slice = cards['Falchion'];
  simulatePlayCard(hobgoblin);
  expect(state.enemy.deck.length).toBe(10 - hobgoblin.attack - slice.attack);
  expect(state.you.discard.getRandomCardIndexByFilter(card => card.name === 'Falchion'))
    .not.toBe(-1);
});

test('Shuffle card copies into pile works (Goblin, Candy Corn)', () => {
  const goblin = cards['Goblin'];
  const candyCorn = cards['Candy Corn'];
  simulatePlayCard(goblin);
  simulatePlayCard(candyCorn);
  expect(state.you.discard.getRandomCardIndexByFilter(card => card.name === 'Candy Corn'))
    .not.toBe(-1);
  expect(
    state.enemy.deck.getRandomCardIndexByFilter(card => card.name === 'Bomb') !== -1
    || state.enemy.banish.getRandomCardIndexByFilter(card => card.name === 'Bomb') !== -1
  ).toBe(true);
});

test('Discard effects work (Healing Potion, Falchion)', () => {
  state.you.deck = CardsArray(['Sword', 'Healing Potion', 'Sword', 'Sword', 'Sword']);
  state.you.discard = CardsArray([]);
  state.you.banish = CardsArray([]);

  const slice = cards['Falchion'];
  const potion = cards['Healing Potion'];
  simulatePlayCard(slice, 'enemy');
  expect(state.you.discard.length).toBe(0);
  expect(state.you.banish.length).toBe(1);
  expect(state.you.deck.length).toBe(potion.onDiscard.heal + 1);
});

test('Non-draw win conditions are working (Healing Potion, Falchion)', () => {
  state.you.deck = CardsArray(['Healing Potion', 'Sword', 'Sword', 'Sword']);
  const slice = cards['Falchion'];
  simulatePlayCard(slice, 'enemy');
  expect(state.you.deck.length).toBe(3);
  expect(state.winner).toBe(null);

  resetState();

  state.you.deck = CardsArray(['Sword', 'Sword', 'Sword']);
  simulatePlayCard(slice, 'enemy');
  expect(state.winner).toBe('enemy');

  resetState();

  state.you.deck = CardsArray(['Burn', 'Burn']);
  simulatePlayCard(slice, 'enemy');
  expect(state.winner).toBe('enemy');

  resetState();

  state.enemy.deck = CardsArray(Array(5).fill('Bomb'));
  const damageCard = createCard({
    attack: 10,
    isMockCard: true
  });
  simulatePlayCard(damageCard);
  expect(state.enemy.deck.length).toBe(0);

  resetState();

  state.you.deck = CardsArray(Array(5).fill('Bomb'));
  const damageSelfCard = createCard({
    damageSelf: 10,
    isMockCard: true
  });
  simulatePlayCard(damageSelfCard);
  expect(state.you.deck.length).toBe(0);
});

test('Mock cards disappear after being played', () => {
  const card = createCard({
    attack: 1,
    isMockCard: true
  });
  simulatePlayCard(card);
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(10);
  expect(state.you.banish.length).toBe(10);
  expect(state.enemy.discard.length).toBe(11);
  expect(state.enemy.deck.length).toBe(9);
  expect(state.enemy.banish.length).toBe(10);
});

test('Potions can deal damage using the attack property (Explosive Potion)', () => {
  const potion = cards['Explosive Potion'];
  simulatePlayCard(potion);
  expect(state.enemy.deck.length).toBe(10 - potion.attack);
});

test('CUSTOM CARD EFFECT (Brawler)', () => {
  const brawler = cards['Brawler'];
  simulatePlayCard(brawler);
  expect(state.you.deck.filter(i => i.type === 'attack').length).toBe(11);
  expect(state.you.deck.filter(i => i.rarity === 'legendary').length).toBe(0);
});

test('CUSTOM CARD EFFECT (Recruiter, Mage)', () => {
  state.you.discard.push(cards['Mage']);

  const card = cards['Recruiter'];
  simulatePlayCard(card);
  expect(state.you.discard.getRandomCardIndexByFilter(card => card.name === 'Mage'))
    .toBe(-1);
  expect(state.you.banish.getRandomCardIndexByFilter(card => card.name === 'Mage'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Cleric, Healing Potion)', () => {
  state.you.banish.push(cards['Healing Potion']);

  const card = cards['Cleric'];
  simulatePlayCard(card);
  expect(state.you.banish.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .toBe(-1);
  expect(state.you.deck.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .not.toBe(-1);
});

// test('CUSTOM CARD EFFECT (Magic Scroll)', () => {
//   // it seems that this card is impossible to test
// });

test('CUSTOM CARD EFFECT (Golden Goblet)', () => {
  const card = cards['Golden Goblet'];
  simulatePlayCard(card);
  expect(state.you.banish.length).toBe(6);
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(15);
});

test('CUSTOM CARD EFFECT (Edible Slime)', () => {
  const card = cards['Edible Slime'];
  simulatePlayCard(card);
  expect(state.you.deck.length).toBe(13)
  expect(state.you.deck.filter(i => ['common', 'uncommon'].includes(i.rarity)).length)
    .toBe(state.you.deck.length);
});

test('CUSTOM CARD EFFECT (Tome of Spells)', () => {
  const card = cards['Tome of Spells'];
  simulatePlayCard(card);
  expect(state.you.deck.length).toBe(14);
  expect(state.you.deck.filter(i => i.type === 'magic').length)
    .toBe(4);
});

test('CUSTOM CARD EFFECT (Minotaur)', () => {
  const card = cards['Minotaur'];
  state.you.discard = CardsArray(Array(10).fill('Cutlass'));
  simulatePlayCard(card);
  expect(state.you.banish.length).toBe(12);
  expect(state.you.discard.length).toBe(9);
  expect(state.you.shields).toBe(2);
  expect(state.enemy.deck.length).toBe(6);
});
