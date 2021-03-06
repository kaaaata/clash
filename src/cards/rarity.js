export const rarityColors = {
  common: 'white',
  uncommon: 'green',
  rare: 'blue',
  legendary: 'red',

  special: 'yellow'
};

export const rarityScore = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3,
  special: 4
};

export const upgradeRarity = (rarity) => {
  if (rarity === 'common') {
    return 'uncommon';
  } else if (rarity === 'uncommon') {
    return 'rare';
  } else {
    return 'legendary';
  }
};
