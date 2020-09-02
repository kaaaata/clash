export const rarityColors = {
  common: 'sand',
  uncommon: 'green',
  rare: 'blue',
  legendary: 'red'
};

export const rarityScore = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3
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
