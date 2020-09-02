import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { FlexContainer, Spacer, Button, Text } from '../particles';
import { Card } from '../Card';

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
  cards,
  maxCardsToTake = cards.length,
  closeModal
}) => {
  const dispatch = useDispatch();

  const [selectedCards, setSelectedCards] = useState({});
  const cardsTakenCount = Object.keys(selectedCards).length;

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
  if (maxCardsToTake === cards.length && cardsTakenCount < maxCardsToTake) {
    continueOptions.unshift({
      text: 'Take All',
      color: cardsTakenCount === maxCardsToTake ? 'red' : 'green',
      onClick: () => {
        if (cardsTakenCount < maxCardsToTake) {
          dispatch(actions.addCardsToCollection(
            cards.filter((_, index) => !selectedCards.hasOwnProperty(index))
          ));
          setSelectedCards({ 0: true, 1: true, 2: true, 3: true, 4: true });
          closeModal();
        }
      }
    })
  }

  return (
    <Modal
      halfModal
      title={titleText}
      transparent={false}
    >
      <FlexContainer justifyContent='center' css={cardLootModalCss}>
        {cards.map((i, index) => (
          <Card
            key={index}
            name={i}
            onClick={() => {
              if (cardsTakenCount < maxCardsToTake) {
                setSelectedCards({ ...selectedCards, [index]: true });
                dispatch(actions.addCardsToCollection(i));
              }
            }}
            isHidden={selectedCards.hasOwnProperty(index)}
          />
        ))}
      </FlexContainer>
      <Spacer height={30} />
      <FlexContainer justifyContent='center' css={continueOptionsCss}>
        {continueOptions.map(i => (
          <Button
            key={i.text}
            mini
            isDisabled={i.text === 'Take All' && cardsTakenCount === maxCardsToTake}
            onClick={i.onClick}
            color={i.color}
          >
            {i.text}
          </Button>
        ))}
      </FlexContainer>
    </Modal>
  );
};
