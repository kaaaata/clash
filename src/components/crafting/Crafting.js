import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { Spacer, Image, FlexContainer, Text, Button } from '../particles';
import { Card } from '../Card';
import { CraftingCardSelectionModal } from './CraftingCardSelectionModal';
import { craftingCss } from './craftingCss';
import { isCraftValid } from './isCraftValid';
import { genCraftedCard } from './genCraftedCard';

export const Crafting = ({ isOpen, closeModal }) => {
  const { goldBars } = useSelector(state => ({
    goldBars: state.clashPlayer.goldBars
  }), shallowEqual);
  const dispatch = useDispatch();

  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [card3, setCard3] = useState(null);
  const [cardSelectModal, setCardSelectModal] = useState(null);
  const [card1Index, setCard1Index] = useState(-1);
  const [card2Index, setCard2Index] = useState(-1);

  useEffect(() => {
    if (!isOpen) {
      setCard1(null);
      setCard2(null);
      setCard3(null);
      setCard1Index(-1);
      setCard2Index(-1);
      setCardSelectModal(null)
    } else if (isCraftValid(card1, card2) && goldBars > 0) {
      setCard3(genCraftedCard(card1, card2));
    } else {
      setCard3(null);
    }
  }, [isOpen, card1, card2, goldBars]);
  
  return (
    <React.Fragment>
      <Modal title='Crafting'>
        <div css={craftingCss}>
          <FlexContainer justifyContent='center' alignItems='center'>
            <div
              className={`card_slot pointer ${card1 ? 'green_border' : 'red_border'}`}
              onClick={() => setCardSelectModal(1)}
            >
              {card1 && !cardSelectModal && <Card name={card1} />}
            </div>
            <Text type='title'>+</Text>
            <div
              className={`card_slot pointer ${card2 ? 'green_border' : 'red_border'}`}
              onClick={() => setCardSelectModal(2)}
            >
              {card2 && !cardSelectModal && <Card name={card2} />}
            </div>
            <Text type='title'>+</Text>
            <FlexContainer
              justifyContent='center'
              alignItems='center'
              className={`gold_bar_slot ${goldBars > 0 ? 'green_border' : 'red_border faded'}`}
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
              isDisabled={!card1 && !card2}
              onClick={() => {
                setCard1(null);
                setCard2(null);
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

          <Spacer height={40} />

          <div className='recipes'>
            <Text>Attack + Attack = Stronger Attack</Text>
            <br />
            <Text>Attack + Fire = <span className='red'>Fire Imbue</span></Text>
            <br />
            <Text>Attack + Frost = <span className='blue'>Frost Imbue</span></Text>
          </div>
        </div>
      </Modal>

      {cardSelectModal && (
        <CraftingCardSelectionModal
          title={`Choose a card for crafting (slot ${cardSelectModal})`}
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
          closeModal={() => setCardSelectModal(null)}
        />
      )}
    </React.Fragment>
  );
};
