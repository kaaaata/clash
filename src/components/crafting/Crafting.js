import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { Spacer, Image, FlexContainer, Text, Button } from '../particles';
import { Card } from '../card/Card';
import { CraftingCardSelectionModal } from './CraftingCardSelectionModal';
import { craftingCss } from './craftingCss';
import { isCraftValid } from './isCraftValid';
import { genUpgradedCard } from './genUpgradedCard';

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

export const Crafting = ({ isOpen }) => {
  const { goldBars } = useSelector(state => ({
    goldBars: state.clashPlayer.goldBars
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isCraftingInProgress, setIsCraftingInProgress] = useState(false);
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [isCardSelectModalOpen, setIsCardSelectModalOpen] = useState(null);

  // useEffect(() => {
  //   if (!isOpen) {
  //     setCard1(null);
  //     setCard2(null);
  //     setCard3(null);
  //     setCard1Index(-1);
  //     setCard2Index(-1);
  //     setCardSelectModal(null)
  //   } else if (isCraftValid(card1, card2) && goldBars > 0) {
  //     setCard3(genCraftedCard(card1, card2));
  //   } else {
  //     setCard3(null);
  //   }
  // }, [isOpen, card1, card2, goldBars]);
  
  return (
    <React.Fragment>
      <Modal title='Crafting'>
        <div css={craftingCss}>
          <FlexContainer justifyContent='center' alignItems='center'>
            <div
              className={`card_slot pointer ${card1 ? 'green_border' : 'red_border'}`}
              onClick={() => {
                if (isCraftingInProgress) {
                  setIsCardSelectModalOpen(true);
                }
              }}
            >
              {card1 && !isCardSelectModalOpen && <Card name={card1} />}
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
            <div className={`card_slot ${card2 ? 'green_border' : 'red_border'}`}>
              {card2 && <Card name={card2} />}
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
                    setCard2('Falchion');
                  }}
                  onClick={() => {
                    setIsCraftingInProgress(false);
                    setCard1(null);
                    setCard2(null);
                    dispatch(actions.removeCardsFromCollection(card1));
                    dispatch(actions.addCardsToCollection(card2));
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
        <CraftingCardSelectionModal
          title='Choose a card to upgrade'
          cardOnClick={(card, index) => {
            setCard1(card);
            setIsCardSelectModalOpen(false);
          }}
          closeModal={() => setIsCardSelectModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
};
