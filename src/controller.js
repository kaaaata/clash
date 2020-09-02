// testing game variables

const isTestingEnabled = true;
// const isTestingEnabled = false;

export const controller = isTestingEnabled ? {
  gold: 100,
  energy: 10,
  day: 3,
  // yourHand: ['Sword', 'Sword', 'Sword'],
  // yourDeck: ['Sword', 'Sword', 'Sword'],
  // enemyHand: ['Sword', 'Sword', 'Sword'],
  // enemyDeck: ['Sword', 'Sword', 'Sword'],
  startingDeck: [
    'Healing Potion',
    'Fire',
    'Fire',
    'Mace',
    'Mace',
  
    'Cutlass',
    'Cutlass',
    'Sword',
    'Sword',
    'Sword',

    'Falchion',
    'Mace',
    'Minotaur',
    'Cutlass',
    'Fire',

    'Falchion',
    'Super Fire',
    'Cutlass',
    'Cutlass',
    'Fire',
  ]
} : {};
