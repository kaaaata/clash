import { keyBy } from 'lodash';

// consult genMonsterDeck.js for monster deck sizes
// tier 1: waves 1, 2, 3
// tier 2: wave 4, 5, 6
// tier 3: wave 7, 8, 9

const monstersTier1 = [
  {
    name: 'Minotaur',
    image: 'minotaur',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Minotaur', 'Falchion', 'Falchion', 'Longsword', 'Lotus'],
    wave2AdditionalCards: ['Orc Blade', 'Orc Blade'],
    eliteAdditionalCards: ['Orc Blade', 'Orc Blade']
  },
  {
    name: 'Basic Slime',
    image: 'basic_slime',
    stats: { attack: 0, magic: 0, defense: 1 },
    deck: ['Shield', 'Shield', 'Shield', 'Shield'],
    wave2AdditionalCards: ['Shield', 'Shield'],
    eliteAdditionalCards: ['Shield', 'Shield']
  },
  {
    name: 'Fire Slime',
    image: 'fire_slime',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Fire', 'Fire', 'Fire', 'Fire', 'Fire', 'Fire', 'Fire'],
    wave2AdditionalCards: ['Super Fire', 'Fire'],
    eliteAdditionalCards: ['Fire Spear', 'Super Fire', 'Fire']
  },
  {
    name: 'Tentacle Monster',
    image: 'tentacles',
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: ['Mimic', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles'],
    wave2AdditionalCards: ['Mimic', 'Candy Corn'],
    eliteAdditionalCards: ['Mimic', 'Candy Corn']
  }
];

const monstersTier2 = [
  {
    name: 'Viking Slime',
    image: 'slime_potion',
    stats: { attack: 1, magic: 0, defense: 1 },
    deck: ['Viking Slime', 'Viking Slime', 'Viking Slime', 'Shield', 'Shield', 'Falchion', 'Falchion', 'Lotus', 'Lotus', 'Longsword', 'Longsword'],
    wave2AdditionalCards: ['Viking Slime', 'Falchion'],
    eliteAdditionalCards: ['Viking Slime', 'Longsword']
  },
  {
    name: 'Demonic Slime',
    image: 'demonic_slime',
    stats: { attack: 0, magic: 1, defense: 1 },
    deck: ['Mage', 'Mage', 'Candy Corn', 'Candy Corn', 'Magic Scroll', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles', 'Tentacles', 'Healing Potion', 'Greataxe', 'Mimic', 'Fire Spear'],
    wave2AdditionalCards: ['Super Frost', 'Super Fire', 'Greataxe'],
    eliteAdditionalCards: ['Super Frost', 'Healing Potion', 'Greataxe']
  },
  {
    name: 'Hobgoblin',
    image: 'hobgoblin',
    stats: { attack: 2, magic: 0, defense: 0 },
    deck: ['Hobgoblin', 'Hobgoblin', 'Falchion', 'Falchion', 'Falchion', 'Orc Blade', 'Orc Blade', 'Orc Blade', 'Lotus', 'Lotus'],
    wave2AdditionalCards: ['Lotus', 'Longsword', 'Orc Blade', 'Hobgoblin', 'Minotaur'],
    eliteAdditionalCards: ['Hobgoblin', 'Orc Blade', 'Longsword', 'Minotaur']
  },
  {
    name: 'Evil Slime',
    image: 'evil_slime',
    stats: { attack: 0, magic: 0, defense: 2 },
    deck: ['Evil Slime', 'Evil Slime', 'Evil Slime', 'Evil Slime', 'Minotaur', 'Greataxe', 'Greataxe', 'Shield', 'Shield', 'Shield', 'Shield', 'Shield', 'Shield', 'Shield'],
    wave2AdditionalCards: ['Orc Blade', 'Orc Blade', 'Evil Slime', 'Greataxe'],
    eliteAdditionalCards: ['Evil Slime', 'Orc Blade', 'Orc Blade', 'Minotaur', 'Greataxe'],
  }
];

const monstersTier3 = [
  {
    name: 'Mimic',
    image: 'mimic',
    stats: { attack: 1, magic: 1, defense: 1 },
    deck: ['Dragon Blade', 'Greataxe', 'Attack Potion', 'Magic Potion', 'Defense Potion', 'Magic Scroll', 'Magic Scroll', 'Magic Scroll', 'Super Frost', 'Super Frost', 'Super Frost', 'Mage', 'Mage', 'Mimic', 'Mimic', 'Mimic', 'Mimic', 'Mimic', 'Gladius'],
    wave2AdditionalCards: ['Magic Scroll', 'Mage', 'Healing Potion', 'Mimic'],
    eliteAdditionalCards: ['Super Frost', 'Mage', 'Healing Potion', 'Mimic', 'Gladius']
  },
  {
    name: 'Water Slime',
    image: 'water_slime',
    stats: { attack: 0, magic: 3, defense: 0 },
    deck: [
      'Water Slime',
      'Water Slime',
      'Water Slime',
      'Healing Blade',
      'Super Frost',
      'Shaman',
      'Ice Whelp',

      'Healing Potion',

      'Magic Potion',
      'Ice Blade',
      'Frost',
      'Frost',
      'Frost',

      'Frost',
      'Frost',
      'Healing Potion',
      'Magic Scroll',
      'Magic Scroll',
      'Alchemist',
      'Candy Corn'
    ],
    wave2AdditionalCards: ['Frost', 'Frost', 'Super Frost'],
    eliteAdditionalCards: ['Water Slime', 'Alchemist', 'Super Frost']
  },
  {
    name: 'Fighter Kobold',
    image: 'purple_kobold',
    stats: { attack: 3, magic: 0, defense: 3 },
    deck: [],
    wave2AdditionalCards: [],
    eliteAdditionalCards: []
  },
  {
    name: 'Scheming Kobold',
    image: 'red_kobold',
    stats: { attack: 2, magic: 2, defense: 2 },
    deck: Array(45).fill('Magic Scroll'),
    wave2AdditionalCards: Array(5).fill('Magic Scroll'),
    eliteAdditionalCards: Array(5).fill('Magic Scroll')
  }
];

const _eventMonsters = [
  {
    name: 'Treasure Slime',
    image: 'treasure_slime_monster',
    stats: { attack: 1, magic: 1, defense: 1 },
    deck: ['Viking Slime']
  },
  {
    name: 'Catherine the Great',
    image: 'catherine_the_great',
    stats: { attack: 2, magic: 2, defense: 2 },
    deck: [
      'Catherine the Great',
      'Healing Blade', 'Healing Blade',
      'Orc Blade', 'Orc Blade',
      'Shield', 'Shield',
      'Super Frost', 'Super Frost',
      'Frost', 'Frost',
      'Greataxe',
      'Longsword'
    ]
  },
  {
    name: 'Nemesis',
    image: null,
    stats: { attack: 0, magic: 0, defense: 0 },
    deck: [],
    autofill: false
  },
  {
    name: 'The Evil Dragon',
    image: 'fire_dragon',
    stats: { attack: 2, magic: 2, defense: 2 },
    deck: [
      'The Evil Dragon Jr.', 'The Evil Dragon Jr.', 'The Evil Dragon Jr.',
      'Fire Spear', 'Fire Spear', 'Fire Spear', 'Fire Spear',
      'Fire', 'Fire', 'Fire', 'Fire', 'Fire', 'Fire', 'Fire', 'Fire',
      'Super Fire', 'Super Fire', 'Super Fire', 'Super Fire',
      'Dragon Blade', 'Dragon Blade', 'Dragon Blade',
      'Shield', 'Shield', 'Shield', 'Shield',
      'Golden Goblet',
      'Greataxe', 'Greataxe',
      'Gladius', 'Gladius', 'Gladius',
      'Vampire Blade', 'Vampire Blade',
      'Lotus', 'Lotus', 'Lotus',
      'Falchion', 'Falchion',
      'Healing Potion', 'Healing Potion',
      'Tome of Spells'
    ]
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

export const allMonsters = [
  ...monstersByTier[1],
  ...monstersByTier[2],
  ...monstersByTier[3],
  ..._eventMonsters
];
