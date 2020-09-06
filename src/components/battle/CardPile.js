import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { colors } from '../styles';
import { Card, PileCardPlaceholder, cardWidth, cardHeight } from '../Card';

const CardPile = ({
  cards,
  x,
  y,
  themeColor,
  countX,
  countY,
  cardPileModal
}) => {
  const dispatch = useDispatch();

  const cardPileCss = css`
    cursor: pointer;

    .card {
      cursor: pointer;
    }

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
      {cards.map((card, index) => (
        (index >= cards.length - 2) ? (
          <Card
            key={index}
            name={card}
            x={x}
            y={y - index}
            isInCardPile
            shouldAnimateEntry={index === cards.length - 1}
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
        <div className='count'>{cards.length}</div>
      </div>
    </div>
  );
};

// "countX", "countY" cannot be derived from "x", "y" because of perspective.
export const YourDeck = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.yourDeck,
  }), shallowEqual);

  return (
    <CardPile
      cards={cards}
      x={195}
      y={460}
      themeColor={colors.green}
      countX={175}
      countY={594}
    />
  );
};

export const YourDiscard = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.yourDiscard,
  }), shallowEqual);

  return (
    <CardPile
      cards={cards}
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
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.yourBanish,
  }), shallowEqual);

  return (
    <CardPile
      cards={cards}
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
  const { cards, winner } = useSelector(state => ({
    cards: state.clashBattleCards.yourHand,
    winner: state.clashBattleStats.winner
  }), shallowEqual);

  return cards.map((card, index) => (
    card ? (
      <Card
        key={index}
        name={card}
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
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyBanish,
  }), shallowEqual);

  return (
    <CardPile
      cards={cards}
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
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyDiscard,
  }), shallowEqual);

  return (
    <CardPile
      cards={cards}
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
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyDeck,
  }), shallowEqual);

  return (
    <CardPile
      cards={cards}
      x={865}
      y={55}
      themeColor={colors.green}
      countX={876}
      countY={171}
    />
  );
};

export const EnemyHand = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyHand,
  }), shallowEqual);

  return cards.map((card, index) => (
    card ? (
      <Card
        key={index}
        name={card}
        x={400 + (cardWidth + 5) * index}
        y={52}
        shouldDisableZoom
      />
    ) : null
  ));
};

export const Stack = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.stack,
  }), shallowEqual);

  return cards.map((card, index) => (
    <Card
      key={index}
      name={card}
      x={530 + index * 15}
      y={263}
      isBlurred={cards.length >= 2 && index !== cards.length - 1}
    />
  ));
};
