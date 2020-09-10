import { actionGenerators } from './actionGenerators';
import { logShuffleCardIntoPile } from './battleLogGenerators';
import { cards } from '../cards/cards';
import { createNewCard } from '../cards/createNewCard';

export const addCardCopiesIntoPiles = (
  state,
  copies, // [{ cardName:String|undefined, cardId:String|undefined, pile:String, index:(Number|'random') = 'random' }]
  player,
  removeCardArgs // move cards b/t piles: { player, location, index }. shuffle cards into piles: undefined
) => {
  const { logs, renderActions } = state;
  const cardIds = [];

  copies.forEach(({ cardName, cardId }) => {
    const _cardId = cardId || createNewCard(cardName);
    cardIds.push(_cardId);
    const renderAction = [actionGenerators.addCardToStack(
      state,
      { state, ...cards[_cardId], player }
    )];
    if (removeCardArgs) {
      renderAction.push(actionGenerators.removeCard(
        state,
        removeCardArgs.player,
        removeCardArgs.location,
        removeCardArgs.index
      ));
    }
    renderActions.push(renderAction);
  });

  renderActions.push([]);

  copies.forEach(({ cardName, cardId, pile, index = 'random' }, _index) => {
    logs.push(logShuffleCardIntoPile(
      `${player} shuffles ${cardName || cards[cardId].name} (${cardIds[_index]}) into their ${pile}`,
      player,
      cardIds[_index],
      pile, 
    ));
    renderActions.push([
      actionGenerators.removeTopCardFromStack(state),
      actionGenerators.addCard(state, cardIds[_index], player, pile, index)
    ]);
  });
};
