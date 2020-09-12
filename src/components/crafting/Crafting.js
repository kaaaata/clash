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
import { basicUpgrades } from './upgrades';
import { sampleSize } from 'lodash';

export const Crafting = () => {
  const { goldBars, deck } = useSelector(state => ({
    goldBars: state.clashPlayer.goldBars,
    deck: state.clashPlayer.deck
  }), shallowEqual);
  const dispatch = useDispatch();

  const [availableUpgrades, setAvailableUpgrades] = useState(null);
  const [card1Id, setCard1Id] = useState(null);
  const [card2Id, setCard2Id] = useState(null);
  const [isCardSelectModalOpen, setIsCardSelectModalOpen] = useState(false);
  
  const isCraftingInProgress = !!availableUpgrades;
  
  return (
    <React.Fragment>
      <Modal title='Crafting'>
        <div css={craftingCss}>
          <FlexContainer justifyContent='center' alignItems='center'>
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
            <Text type='title'>+</Text>
            <div
              className={`card_slot pointer ${card1Id ? 'green_border' : 'red_border'}`}
              onClick={() => {
                if (isCraftingInProgress) {
                  setIsCardSelectModalOpen(true);
                }
              }}
            >
              {card1Id && !isCardSelectModalOpen && (
                <Card cardId={card1Id} shouldDisableZoom />
              )}
            </div>
            <Text type='title'>=</Text>
            <div className={`card_slot ${card2Id ? 'green_border' : 'red_border'}`}>
              {card2Id && <Card cardId={card2Id} shouldDisableZoom />}
            </div>
          </FlexContainer>

          <Spacer height={40} />

          {isCraftingInProgress ? (
            <div className='upgrades'>
              {availableUpgrades.map((i, index) => (
                <Button
                  key={index}
                  isDisabled={!card1Id || !cards[`upgrade_preview_${index}`]}
                  onMouseEnter={() => {
                    setCard2Id(`upgrade_preview_${index}`);
                  }}
                  onClick={() => {
                    setCard1Id(null);
                    setCard2Id(null);
                    dispatch(actions.removeCardsFromCollection(card1Id));
                    const upgradedCardId = createNewCard(cards[`upgrade_preview_${index}`]);
                    dispatch(actions.addCardsToCollection(upgradedCardId));
                    setAvailableUpgrades(null);
                  }}
                >
                  [{i.cardProperties.prefix ? `${i.cardProperties.prefix}...` : `...${i.cardProperties.suffix}`}] {i.description}
                </Button>
              ))}
            </div>
          ) : (
            <Button
              isDisabled={!goldBars}
              onClick={() => {
                dispatch(actions.adjustPlayerGoldBars(-1));
                setAvailableUpgrades(sampleSize(basicUpgrades, 4));
              }}
              centered
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
          cardIds={deck.filter(cardId => cards[cardId].isCraftable)}
          cardOnClick={(cardId) => {
            setCard1Id(cardId);
            availableUpgrades.forEach((upgrade, index) => {
              genUpgradedCard(cards[cardId], upgrade.cardProperties, `upgrade_preview_${index}`);
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
