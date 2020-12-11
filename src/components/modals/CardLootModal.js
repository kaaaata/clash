import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from './EventModal';
import { Text } from '../particles';
import { blueprints } from '../../cards/blueprints';
import { createNewCard } from '../../cards/createNewCard';
import { EventModalLootableCard } from './EventModalLootableCard';

export const CardLootModal = ({
  title = 'Select cards to keep',
  image,
  cardNames,
  cardIds,
  cardCosts = [],
  maxCardsToTake = cardNames ? cardNames.length : cardIds.length,
  continueText = 'Continue',
  showCounter = false,
  closeModal
}) => {
  const { gold } = useSelector(state => ({
    gold: state.clashPlayer.gold
  }), shallowEqual);
  const dispatch = useDispatch();

  const [selectedCardIndices, setSelectedCardIndices] = useState({});
  const cardsTakenCount = Object.keys(selectedCardIndices).length;
  const shouldShowTakeAllButton = !cardCosts.length
    && maxCardsToTake >= (cardNames ? cardNames.length : cardIds.length);

  const titleText = (
    <React.Fragment>
      {title}
      {showCounter && (
        <Text
          type='header'
          inline
          color={cardsTakenCount === maxCardsToTake ? 'red' : 'green'}
        >
          &nbsp;({cardsTakenCount}/{maxCardsToTake})
        </Text>
      )}
    </React.Fragment>
  );

  const continueOptions = [{ name: continueText, onClick: closeModal }];
  if (shouldShowTakeAllButton) {
    continueOptions.unshift({
      name: 'Take All',
      isDisabled: cardsTakenCount === maxCardsToTake,
      onClick: () => {
        if (cardsTakenCount < maxCardsToTake) {
          dispatch(actions.addCardsToCollection((cardNames || cardIds)
            .filter((_, index) => !selectedCardIndices.hasOwnProperty(index))
            .map((cardNameOrId) => createNewCard(cardIds
                ? cardNameOrId
                : blueprints.allCardsObject[cardNameOrId]
            ))
          ));
          setSelectedCardIndices({ 0: true, 1: true, 2: true, 3: true, 4: true });
          closeModal();
        }
      }
    });
  }

  return (
    <EventModal
      title={titleText}
      image={image}
    >
      <EventModalPage
        page={1}
        text={(cardNames || cardIds).map((cardNameOrId, index) => (
          <EventModalLootableCard
            key={index}
            cardName={cardNames && cardNameOrId}
            cardId={cardIds && cardNameOrId}
            cost={cardCosts[index]}
            canAfford={typeof cardCosts[index] !== 'number' || gold >= cardCosts[index]}
            canTake={cardsTakenCount < maxCardsToTake}
            takeCardCb={() => setSelectedCardIndices({
              ...selectedCardIndices, [index]: true
            })}
          />
        ))}
        options={continueOptions}
      />
    </EventModal>
  );
};
