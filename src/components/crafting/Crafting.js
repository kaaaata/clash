import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { Spacer, Image, FlexContainer, Text, Button } from '../particles';
import { Card } from '../Card';
import { CraftingCardSelectionModal } from './CraftingCardSelectionModal';
import { craftingCss } from './craftingCss';
import { isCraftValid } from './isCraftValid';
import { genCraftedCard } from './genCraftedCard';

export const Crafting = ({ closeModal }) => {
  const { goldBars } = useSelector(state => ({
    goldBars: state.clashPlayer.goldBars
  }), shallowEqual);
  const dispatch = useDispatch();
  console.log('crafting render');
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [isGoldBarPlaced, setIsGoldBarPlaced] = useState(false);
  const [card3, setCard3] = useState(null);
  const [cardSelectModal, setCardSelectModal] = useState(null);
  const [card1Index, setCard1Index] = useState(-1);
  const [card2Index, setCard2Index] = useState(-1);

  useEffect(() => {
    if (isCraftValid(card1, card2) && isGoldBarPlaced) {
    setCard3(genCraftedCard(card1, card2));
    } else {
      setCard3(null);
    }
  }, [card1, card2, isGoldBarPlaced]);
  
  return (
    <React.Fragment>
      <Modal title='Crafting'>
        <div css={craftingCss}>
          <FlexContainer justifyContent='center' alignItems='center'>
            <div
              className={`card_slot ${card1 ? 'green_border' : 'red_border'}`}
              onClick={() => setCardSelectModal(1)}
            >
              {card1 && !cardSelectModal && <Card name={card1} />}
            </div>
            <Text type='title'>+</Text>
            <div
              className={`card_slot ${card2 ? 'green_border' : 'red_border'}`}
              onClick={() => setCardSelectModal(2)}
            >
              {card2 && !cardSelectModal && <Card name={card2} />}
            </div>
            <Text type='title'>+</Text>
            <FlexContainer
              justifyContent='center'
              alignItems='center'
              className={`gold_bar_slot ${isGoldBarPlaced ? 'green_border' : 'red_border faded'}`}
              onClick={() => {
                if (goldBars > 0) {
                  setIsGoldBarPlaced(!isGoldBarPlaced);
                } else {
                  dispatch(actions.setToast('Not enough gold bars!'));
                }
              }}
            >
              <Image
                src='gold_bar.png'
                width={75}
                height={75}
              />
            </FlexContainer>
            <Text type='title'>=</Text>
            <div className={`card_slot ${card3 ? 'green_border' : 'red_border'}`}>
              {card3 && <Card name={card3} />}
            </div>
          </FlexContainer>

          <Spacer height={40} />
        
          <FlexContainer justifyContent='center'>
            <Button
              mini
              isDisabled={!card1 && !card2 && !isGoldBarPlaced}
              onClick={() => {
                setCard1(null);
                setCard2(null);
                setIsGoldBarPlaced(false);
                setCard3(null);
                setCard1Index(-1);
                setCard2Index(-1);
              }}
            >
              Clear
            </Button>
            <Button
              mini
              isDisabled={!card3}
              onClick={() => {
                setCard1(null);
                setCard2(null);
                setIsGoldBarPlaced(false);
                setCard3(null);
                setCard1Index(-1);
                setCard2Index(-1);
                dispatch(actions.adjustPlayerGoldBars(-1));
                dispatch(actions.removeCardsFromCollection(card1));
                dispatch(actions.removeCardsFromCollection(card2));
                dispatch(actions.addCardsToCollection(card3));
              }}
            >
              Craft
            </Button>
          </FlexContainer>
        </div>
      </Modal>

      {cardSelectModal && (
        <CraftingCardSelectionModal
          title={`Choose a card for crafting (card ${cardSelectModal}/2)`}
          cardIndexAlreadySelected={cardSelectModal === 1 ? card2Index : card1Index}
          cardOnClick={(card, index) => {
            if (cardSelectModal === 1) {
              setCard1(card);
              setCard1Index(index);
            } else {
              setCard2(card);
              setCard2Index(index);
            }
            setCardSelectModal(null);
          }}
        />
      )}
    </React.Fragment>
  );
};
