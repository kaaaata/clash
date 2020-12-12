import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { colors } from '../styles';
import { Card, cardWidth, cardHeight } from '../card/Card';
import { PileCardPlaceholder } from '../card/PileCardPlaceholder';
import { PileCard } from '../card/PileCard';
import { useRef, useEffect } from 'react';

const inDevelopment = process.env.NODE_ENV !== 'production';

const CardPile = ({
  cardIds,
  x,
  y,
  themeColor,
  countX,
  countY,
  cardPileModal,
  isFaceDown = false,
  disablePointer = false,
}) => {
  const dispatch = useDispatch();
  
  const prevCardCountRef = useRef();
  useEffect(() => {
    prevCardCountRef.current = cardIds.length;
  });
  const prevCardCount = prevCardCountRef.current;

  const cardPileCss = css`
    cursor: ${disablePointer ? 'default' : 'pointer'};

    .outline {
      position: absolute;
      left: ${x - 5}px;
      top: ${y - 5}px;
      width: ${cardWidth + 10}px;
      height: ${cardHeight + 10}px;
      border: 2px solid ${themeColor};
      transform: rotate3d(1, 0, 0, 65deg);
    }

    .card_count {
      position: absolute;
      left: ${countX}px;
      top: ${countY}px;
      width: ${cardWidth + 10}px;
      text-align: center;
  
      .count {
        color: ${themeColor === colors.black ? colors.greyDark : themeColor};
        font-size: 60px;
        text-shadow: 2px 2px 6px ${colors.black};
      }
    }
  `;

  return (
    <div
      css={cardPileCss}
      onClick={cardPileModal ? () => dispatch(actions.setActiveModalCardPile(cardPileModal)) : null}
    >
      <div className='outline' />
      {cardIds.map((cardId, index) => (
        (index >= cardIds.length - 2) ? ( // need to render top 2 cards, because top card can flip
          <PileCard
            key={index}
            cardProps={{
              cardId,
              x,
              y: y - index,
              isInCardPile: true,
              isFaceDown
            }}
            shouldAnimateEntry={
              index === cardIds.length - 1 // only animate top card in pile
              && prevCardCount !== 'undefined' // no animation on initial render
              && prevCardCount < cardIds.length // only animate if card was added to pile
            }
          />
        ) : (
          <PileCardPlaceholder
            key={index}
            x={x}
            y={y - index}
          />
        )
      ))}
      <div className='card_count'>
        <div className='count'>{cardIds.length}</div>
      </div>
    </div>
  );
};

// "countX", "countY" cannot be derived from "x", "y" because of perspective.
export const YourDeck = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.yourDeck,
  }), shallowEqual);

  return (
    <CardPile
      cardIds={cardIds}
      x={195}
      y={460}
      themeColor={colors.green}
      countX={175}
      countY={594}
      cardPileModal='yourDeck'
      isFaceDown={!inDevelopment}
    />
  );
};

export const YourDiscard = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.yourDiscard,
  }), shallowEqual);

  return (
    <CardPile
      cardIds={cardIds}
      x={835}
      y={460}
      themeColor={colors.red}
      countX={846}
      countY={594}
      cardPileModal='yourDiscard'
    />
  );
};

export const YourBanish = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.yourBanish,
  }), shallowEqual);

  return (
    <CardPile
      cardIds={cardIds}
      x={995}
      y={460}
      themeColor={colors.black}
      countX={1013}
      countY={594}
      cardPileModal='yourBanish'
    />
  );
};

export const YourHand = ({ cardOnClick }) => {
  const { cardsIds, winner } = useSelector(state => ({
    cardsIds: state.clashBattleCards.yourHand,
    winner: state.clashBattleStats.winner
  }), shallowEqual);

  return cardsIds.map((cardId, index) => (
    cardId ? (
      <Card
        key={index}
        cardId={cardId}
        x={370 + (cardWidth + 5) * index}
        y={475}
        onClick={() => {
          if (!winner) {
            cardOnClick(index);
          }
        }}
      />
    ) : null
  ));
};

export const EnemyBanish = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.enemyBanish,
  }), shallowEqual);

  return (
    <CardPile
      cardIds={cardIds}
      x={64}
      y={55}
      themeColor={colors.black}
      countX={38}
      countY={171}
      cardPileModal='enemyBanish'
    />
  );
};

export const EnemyDiscard = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.enemyDiscard,
  }), shallowEqual);

  return (
    <CardPile
      cardIds={cardIds}
      x={225}
      y={55}
      themeColor={colors.red}
      countX={204}
      countY={171}
      cardPileModal='enemyDiscard'
    />
  );
};

export const EnemyDeck = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.enemyDeck,
  }), shallowEqual);

  return (
    <CardPile
      cardIds={cardIds}
      x={865}
      y={55}
      themeColor={colors.green}
      countX={876}
      countY={171}
      cardPileModal={inDevelopment ? 'enemyDeck' : null}
      isFaceDown={!inDevelopment}
      disablePointer
    />
  );
};

export const EnemyHand = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.enemyHand,
  }), shallowEqual);

  return cardIds.map((cardId, index) => (
    cardId ? (
      <Card
        key={index}
        cardId={cardId}
        x={400 + (cardWidth + 5) * index}
        y={52}
        shouldDisableZoom
        isFaceDown={!inDevelopment}
        disablePointer
      />
    ) : null
  ));
};

export const Stack = () => {
  const { cardIds } = useSelector(state => ({
    cardIds: state.clashBattleCards.stack,
  }), shallowEqual);

  return cardIds.map((cardId, index) => (
    <Card
      key={index}
      cardId={cardId}
      x={530 + index * 15}
      y={263}
      isBlurred={cardIds.length >= 2 && index !== cardIds.length - 1}
    />
  ));
};
