import { keyBy } from 'lodash';

// tier 1: waves 1, 2, 3
// tier 2: wave 4, 5, 6
// tier 3: wave 7, 8, 9

const monstersTier1 = [
  {
    name: 'Minotaur',
    image: 'minotaur',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Minotaur'],
    wave2AdditionalCards: ['Orc Blade'],
    eliteAdditionalCards: ['Orc Blade']
  },
  {
    name: 'Slime',
    image: 'basic_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [],
    wave2AdditionalCards: [],
    eliteAdditionalCards: []
  },
  {
    name: 'Fire Slime',
    image: 'fire_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Fire', 'Fire', 'Fire', 'Fire'],
    wave2AdditionalCards: ['Super Fire'],
    eliteAdditionalCards: ['Fire Spear']
  },
  {
    name: 'Tentacle Monster',
    image: 'tentacles',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Tentacles', 'Tentacles', 'Tentacles'],
    wave2AdditionalCards: ['Mimic'],
    eliteAdditionalCards: ['Candy Corn']
  }
];

const monstersTier2 = [
  {
    name: 'Viking Slime',
    image: 'slime_potion',
    stats: { attack: 0, magic: 0, defense: 1 },
    deck: ['Viking Slime', 'Shield', 'Shield', 'Healing Potion'],
    wave2AdditionalCards: ['Longsword'],
    eliteAdditionalCards: ['Falchion']
  },
  {
    name: 'Demonic Slime',
    image: 'demonic_slime',
    stats: { attack: 0, magic: 1, defense: 0 },
    deck: ['Mage', 'Candy Corn', 'Candy Corn', 'Magic Scroll', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles'],
    wave2AdditionalCards: ['Super Frost'],
    eliteAdditionalCards: ['Healing Potion']
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    stats: { attack: 1, magic: 0, defense: 0 },
    deck: ['Hobgoblin', 'Falchion', 'Falchion', 'Falchion'],
    wave2AdditionalCards: ['Lotus'],
    eliteAdditionalCards: ['Orc Blade']
  }
];

const monstersTier3 = [
  {
    name: 'Mimic',
    image: 'mimic',
    stats: { attack: 0, magic: 1, defense: 1 },
    deck: ['Dragon Blade', 'Greataxe', 'Attack Potion', 'Magic Scroll', 'Magic Scroll', 'Magic Scroll', 'Super Frost', 'Super Frost', 'Super Frost'],
    wave2AdditionalCards: ['Magic Scroll'],
    eliteAdditionalCards: ['Super Frost']
  }
];

const _eventMonsters = [
  {
    name: 'Treasure Slime',
    image: 'treasure_slime_monster',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Viking Slime']
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    stats: { attack: 1, magic: 1, defense: 1 },
    deck: ['Catherine the Great', 'Shield', 'Longsword', 'Healing Blade', 'Paladin']
  },
  {
    name: 'Dragon',
    image: 'fire_dragon',
    stats: { attack: 2, magic: 2, defense: 2 },
    deck: ['Fire Dragon', 'Fire Spear', 'Fire', 'Super Fire']
  }
];

for (let i = 0; i < monstersTier1.length; i++) {
  monstersTier1[i].tier = 1;
  monstersTier1[i].type = 'wave';
  monstersTier1[i].isElite = false;
}
for (let i = 0; i < monstersTier2.length; i++) {
  monstersTier2[i].tier = 2;
  monstersTier2[i].type = 'wave';
  monstersTier2[i].isElite = false;
}
for (let i = 0; i < monstersTier3.length; i++) {
  monstersTier3[i].tier = 3;
  monstersTier3[i].type = 'wave';
  monstersTier3[i].isElite = false;
}
for (let i = 0; i < _eventMonsters.length; i++) {
  _eventMonsters[i].tier = 1;
  _eventMonsters[i].type = 'event';
  _eventMonsters[i].isElite = false;
}

export const monstersByTier = {
  1: monstersTier1,
  2: monstersTier2,
  3: monstersTier3
};

export const eventMonsters = keyBy(_eventMonsters, 'name');
