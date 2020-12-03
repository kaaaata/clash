import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { Spacer, FlexContainer, Text, Button } from '../particles';
import { Card } from '../card/Card';
import { craftingCss } from './craftingCss';
import { genUpgradedCard } from './genUpgradedCard';
import { CardViewModal } from '../modals/CardViewModal';
import { createNewCard } from '../../cards/createNewCard';
import { cards } from '../../cards/cards';
import { upgrades } from './upgrades';
import { sampleSize } from 'lodash';

export const Crafting = ({ closeModal }) => {
  const { deck } = useSelector(state => ({
    deck: state.clashPlayer.deck
  }), shallowEqual);
  const dispatch = useDispatch();

  const [availableUpgrades] = useState(sampleSize(upgrades, 4));
  const [card1Id, setCard1Id] = useState(null);
  const [card2Id, setCard2Id] = useState(null);
  const [isUpgradeLockedIn, setIsUpgradeLockedIn] = useState(false);
  const [isCardSelectModalOpen, setIsCardSelectModalOpen] = useState(false);

  const closeButtons = (
    <FlexContainer justifyContent='center' _css={css`width: 100%`}>
      <Button type='mini' centered onClick={closeModal}>Exit</Button>
      <Spacer width={20} />
      <Button
        type='mini'
        centered
        onClick={() => {
          dispatch(actions.removeCardsFromCollection(card1Id));
          dispatch(actions.addCardsToCollection(createNewCard(cards[card2Id])));
          closeModal();
        }}
        isDisabled={!isUpgradeLockedIn}
      >
        Confirm Upgrade
      </Button>
    </FlexContainer>
  );
  
  return (
    <React.Fragment>
      <Modal
        title='Upgrade a Card'
        shouldCloseOnClick={false}
        customCloseButton={closeButtons}
      >
        <div css={craftingCss}>
          <FlexContainer
            justifyContent='space-between'
            flexDirection='column'
            className='container'
          >
            <section>
              <FlexContainer justifyContent='center' alignItems='center'>
                <FlexContainer
                  className='card_slot pointer red_border'
                  justifyContent='center'
                  alignItems='center'
                  onClick={() => setIsCardSelectModalOpen(true)}
                >
                  {(card1Id && !isCardSelectModalOpen)
                    ? <Card cardId={card1Id} shouldDisableZoom />
                    : <Text type='mini'>(select a card)</Text>
                  }
                </FlexContainer>
                <Text type='title'>&#8594;</Text>
                <FlexContainer
                  className={`card_slot ${isUpgradeLockedIn ? 'green_border' : 'red_border'}`}
                  justifyContent='center'
                  alignItems='center'
                >
                  {card2Id
                    ? <Card cardId={card2Id} shouldDisableZoom />
                    : <Text type='mini'>(result card)</Text>
                  }
                </FlexContainer>
              </FlexContainer>

              <Spacer height={40} />

              <div className='upgrades'>
                {availableUpgrades.map((i, index) => (
                  <Button
                    key={index}
                    isDisabled={
                      !card1Id // not sure why "Confirm Upgrade" bugs out without this line.
                      || !cards[`upgrade_preview_${index}`]
                      || (i.cardProperties.prefix && cards[card1Id].prefix)
                      || (i.cardProperties.suffix && cards[card1Id].suffix)
                    }
                    onMouseEnter={() => {
                      if (!isUpgradeLockedIn) {
                        setCard2Id(`upgrade_preview_${index}`);
                      }
                    }}
                    onClick={() => {
                      setCard2Id(`upgrade_preview_${index}`);
                      setIsUpgradeLockedIn(true);
                    }}
                  >
                    <span className='green'>
                      [{
                        i.cardProperties.prefix
                          ? `${i.cardProperties.prefix}...`
                          : `...${i.cardProperties.suffix}`
                      }]</span> {i.description}
                  </Button>
                ))}
              </div>
            </section>

            <section>
              <Text centered>Each card can have 1 prefix and 1 suffix.</Text>
              <Spacer height={20} />
            </section>
          </FlexContainer>
        </div>
      </Modal>

      {isCardSelectModalOpen && (
        <CardViewModal
          title='Choose a card to upgrade'
          shouldShowCardCount={false}
          cardIds={deck.filter(
            cardId => !cards[cardId].isToken && ['attack', 'magic'].includes(cards[cardId].type)
          )}
          cardOnClick={(cardId) => {
            setCard1Id(cardId);
            setCard2Id(null);
            setIsUpgradeLockedIn(false);
            for (const k in cards) {
              if (k.startsWith('upgrade_preview')) {
                delete cards[k];
              }
            }
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
