import React, { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { Spacer, Image, FlexContainer, Text, Button } from '../particles';
import { Card } from '../card/Card';
import { craftingCss } from './craftingCss';
import { genUpgradedCard } from './genUpgradedCard';
import { CardViewModal } from '../modals/CardViewModal';
import { createNewCard } from '../../cards/createNewCard';
import { cards } from '../../cards/cards';

const testUpgrades = [
  {
    prefix: null,
    suffix: 'of Sharpness',
    description: '+2 attack.',
    cardProperties: {
      attack: 2
    }
  },
  {
    prefix: null,
    suffix: 'of Sharpness',
    description: '+2 attack.',
    cardProperties: {
      attack: 2
    }
  },
  {
    prefix: null,
    suffix: 'of Sharpness',
    description: '+2 attack.',
    cardProperties: {
      attack: 2
    }
  },
  {
    prefix: null,
    suffix: 'of Sharpness',
    description: '+2 attack.',
    cardProperties: {
      attack: 2
    }
  },
];

export const Crafting = () => {
  const { goldBars, deck } = useSelector(state => ({
    goldBars: state.clashPlayer.goldBars,
    deck: state.clashPlayer.deck
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isCraftingInProgress, setIsCraftingInProgress] = useState(false);
  const [card1Id, setCard1Id] = useState(null);
  const [card2Id, setCard2Id] = useState(null);
  const [isCardSelectModalOpen, setIsCardSelectModalOpen] = useState(false);
  
  return (
    <React.Fragment>
      <Modal title='Crafting'>
        <div css={craftingCss}>
          <FlexContainer justifyContent='center' alignItems='center'>
            <div
              className={`card_slot pointer ${card1Id ? 'green_border' : 'red_border'}`}
              onClick={() => {
                if (isCraftingInProgress) {
                  setIsCardSelectModalOpen(true);
                }
              }}
            >
              {card1Id && !isCardSelectModalOpen && <Card cardId={card1Id} />}
            </div>
            <Text type='title'>+</Text>
            <FlexContainer
              justifyContent='center'
              alignItems='center'
              className={
                `gold_bar_slot ${isCraftingInProgress ? 'green_border' : 'red_border faded'}`
              }
            >
              <Image
                src='gold_bar.png'
                width={75}
                height={75}
              />
            </FlexContainer>
            <Text type='title'>=</Text>
            <div className={`card_slot ${card2Id ? 'green_border' : 'red_border'}`}>
              {card2Id && <Card name={card2Id} />}
            </div>
          </FlexContainer>

          <Spacer height={40} />

          {isCraftingInProgress ? (
            <div className='upgrades'>
              {testUpgrades.map((i, index) => (
                <Button
                  key={index}
                  isDisabled={false}
                  textProps={{ centered: false }}
                  onMouseEnter={() => {
                    setCard2Id(`upgrade_preview_${index}`);
                  }}
                  onClick={() => {
                    setCard1Id(null);
                    setCard2Id(null);
                    dispatch(actions.removeCardsFromCollection(card1Id));
                    const upgradedCardId = createNewCard(cards[`upgrade_preview_${index}`]);
                    dispatch(actions.addCardsToCollection(upgradedCardId));
                    setIsCraftingInProgress(false);
                  }}
                >
                  [{i.name}] {i.description}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              isDisabled={!goldBars}
              onClick={() => {
                dispatch(actions.adjustPlayerGoldBars(-1));
                setIsCraftingInProgress(true);
              }}
            >
              Upgrade a Card (costs 1 gold bar)
            </Button>
          )}
        </div>
      </Modal>

      {isCardSelectModalOpen && (
        <CardViewModal
          title='Choose a card to upgrade'
          shouldShowCardCount={false}
          cardIds={deck}
          cardOnClick={(cardId) => {
            setCard1Id(cardId);
            testUpgrades.forEach((upgrade, index) => {
              const upgradedCard = genUpgradedCard(cards[cardId], upgrade);
              if (upgradedCard) {
                createNewCard(upgradedCard, `upgrade_preview_${index}`);
              }
            });
            setIsCardSelectModalOpen(false);
          }}
          closeModal={() => setIsCardSelectModalOpen(false)}
          closeButtonText='Cancel'
      />
      )}
    </React.Fragment>
  );
};
