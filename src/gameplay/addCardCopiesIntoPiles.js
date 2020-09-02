import { actionGenerators } from './actionGenerators';
import { cards } from '../cards/cards';

export const addCardCopiesIntoPiles = (
  state,
  copies, // [{ card:String, pile:String, index:(Number|'random') = 'random' }]
  player,
  removeCardArgs // move cards b/t piles: { player, location, index }. shuffle cards into piles: undefined
) => {
  const { logs, renderActions } = state;
  copies.forEach(({ card }) => {
    const renderAction = [actionGenerators.addCardToStack(state, { state, ...cards[card], player })];
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

  copies.forEach(({ card, pile, index = 'random' }) => {
    logs.push(`${player} shuffles ${card} into their ${pile}`);
    renderActions.push([
      actionGenerators.removeTopCardFromStack(state),
      actionGenerators.addCard(state, cards[card], player, pile, index)
    ]);
  });
};
