import { monstersByTier } from '../components/clash/monsters/monsters';
import { cards } from '../components/clash/cards/cards';

test('all monsters are valid', () => {
  const errorMessages = [];

  const testIsMonsterValid = (monster, index) => {
    if (!monster) {
      return;
    }

    const { name, tier, image, stats, deck, type } = monster;

    if (!name) {
      errorMessages.push(`monster at index ${index} is missing name`);
    }
    if (!tier || typeof tier !== 'number') {
      errorMessages.push(`monster at index ${index} is missing tier`);
    }
    if (!image) {
      errorMessages.push(`monster at index ${index} is missing image`);
    }
    if (!stats) {
      errorMessages.push(`monster at index ${index} is missing stats`);
    } else {
      if (typeof stats.attack !== 'number') {
        errorMessages.push(`monster at index ${index} is missing attack stat`);
      }
      if (typeof stats.magic !== 'number') {
        errorMessages.push(`monster at index ${index} is missing magic stat`);
      }
      if (typeof stats.defense !== 'number') {
        errorMessages.push(`monster at index ${index} is missing defense stat`);
      }
    }
    if (!deck || !Array.isArray(deck)) {
      errorMessages.push(`monster at index ${index} is missing deck`);
    }
    if (!type || !['wave', 'event'].includes(type)) {
      errorMessages.push(`monster at index ${index} is missing type`);
    }
  };

  Object.values(monstersByTier).forEach(monsters => {
    monsters.forEach((monster, index) => {
      testIsMonsterValid(monster, index);
    });
  });

  errorMessages.forEach(error => {
    console.log(error);
  });

  expect(errorMessages.length).toBe(0);
});

test('all monster deck preset cards exist', () => {
  Object.values(monstersByTier).forEach(monsters => {
    monsters.forEach((monster, index) => {
      monster.deck.forEach(card => {
        const doesCardExist = cards.hasOwnProperty(card);
        if (!doesCardExist) {
          console.log('card does not exist:', card);
        }
        expect(doesCardExist).toBe(true);
      })
    });
  });
});
