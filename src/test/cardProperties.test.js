import { blueprints } from '../cards/blueprints';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';

test('all cards are valid', () => {
  const errorMessages = [];

  const testIsCardValid = (card, index) => {
    if (!card) {
      return;
    }

    const { name, isMockCard } = card;

    if (!isMockCard) {
      if (!name) {
        errorMessages.push(`card at index ${index} is missing name`);
      }
      if (!card.image) {
        errorMessages.push(`${name} is missing image`);
      }
      if (!['common', 'uncommon', 'rare', 'legendary'].includes(card.rarity)) {
        errorMessages.push(`${name} has invalid rarity ${card.rarity}`);
      }
      if (!['attack', 'magic', 'potion', 'ally'].includes(card.type)) {
        errorMessages.push(`${name} has invalid type ${card.type}`);
      }
    }

    if (typeof card.attack === 'number' && card.attack < 0) {
      errorMessages.push(`${name} has invalid attack ${card.attack}`);
    }
    if (typeof card.defense === 'number' && card.defense < 0) {
      errorMessages.push(`${name} has invalid defense ${card.defense}`);
    }
    if (typeof card.heal === 'number' && card.heal < 0) {
      errorMessages.push(`${name} has invalid heal ${card.heal}`);
    }
    if (typeof card.onDiscard === 'object' && card.onDiscard !== null) {
      const mockCardId = createNewCard({
        ...card.onDiscard,
        isMockCard: true
      }, 'test_mock_card');
      testIsCardValid(cards[mockCardId]);
    }

    // temporary rule until code is refactored to link customCardEffects to unique keys, not card names.
    if (
      ['attack', 'magic'].includes(card.type)
      && ['common', 'uncommon', 'rare'].includes(card.rarity)
      && card.onDiscard
    ) {
      errorMessages.push(
        `${name} is a ${card.rarity} ${card.type} card, so it can't have onDiscard.`
      )
    }
  };

  blueprints.allCardsArray.forEach((card, index) => {
    testIsCardValid(card, index);
  });

  errorMessages.forEach(error => {
    console.log(error);
  });

  expect(errorMessages.length).toBe(0);
});
