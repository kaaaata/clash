import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { FlexContainer, Spacer, Button, Text } from '../particles';
import { Card } from '../card/Card';
import { blueprints } from '../../cards/blueprints';
import { createNewCard } from '../../cards/createNewCard';
import { cards } from '../../cards/cards';

const cardLootModalCss = css`
  .card {
    margin: 10px;
  }
`;

const continueOptionsCss = css`
  button {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const CardLootModal = ({
  cardNames,
  cardIds,
  maxCardsToTake = cardNames ? cardNames.length : cardIds.length,
  closeModal
}) => {
  const dispatch = useDispatch();

  const [selectedCardIndices, setSelectedCardIndices] = useState({});
  const cardsTakenCount = Object.keys(selectedCardIndices).length;

  const titleText = (
    <React.Fragment>
      Choose cards to keep&nbsp;
      <Text
        type='header'
        inline
        color={cardsTakenCount === maxCardsToTake ? 'red' : 'green'}
      >
        ({cardsTakenCount}/{maxCardsToTake})
      </Text>
    </React.Fragment>
  );

  const continueOptions = [{ text: 'Done', color: 'green', onClick: closeModal }];
  if (maxCardsToTake === (cardNames ? cardNames.length : cardIds.length)) {
    continueOptions.push({
      text: 'Take All',
      color: cardsTakenCount === maxCardsToTake ? 'red' : 'green',
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
    <Modal
      halfModal
      title={titleText}
      transparent={false}
    >
      <FlexContainer justifyContent='center' css={cardLootModalCss}>
        {(cardNames || cardIds).map((cardNameOrId, index) => (
          <Card
            key={index}
            cardName={cardNames && cardNameOrId}
            cardId={cardIds && cardNameOrId}
            onClick={() => {
              if (cardsTakenCount < maxCardsToTake) {
                setSelectedCardIndices({ ...selectedCardIndices, [index]: true });
                dispatch(actions.addCardsToCollection(createNewCard(cardIds
                  ? cards[cardNameOrId]
                  : blueprints.allCardsObject[cardNameOrId])
                ));
              }
            }}
            isHidden={selectedCardIndices.hasOwnProperty(index)}
          />
        ))}
      </FlexContainer>
      <Spacer height={30} />
      <FlexContainer justifyContent='center' css={continueOptionsCss}>
        {continueOptions.map(i => (
          <Button
            key={i.text}
            type='mini'
            isDisabled={i.text === 'Take All' && cardsTakenCount === maxCardsToTake}
            onClick={i.onClick}
            textProps={{ color: i.color }}
            centered
          >
            {i.text}
          </Button>
        ))}
      </FlexContainer>
    </Modal>
  );
};
