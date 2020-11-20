import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import * as actions from '../../stores/actions';
import { useDispatch } from 'react-redux';
import { Spacer, Gold } from '../particles';
import { Card } from '../card/Card';
import { createNewCard } from '../../cards/createNewCard';
import { cards } from '../../cards/cards';

// the line-height: 1 is a hack to disallow EventModal paragraph line height from impacting card text.
const eventModalLootableCardCss = (isHidden, isHovered) => css`
  margin-right: 40px;
  display: inline-block;
  line-height: 1 !important;
  position: relative;
  ${isHidden ? 'visibility: hidden;' : ''}

  .gold {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: top 0.1s ease-out;
    ${isHovered ? 'top: -22px;' : ''};
  }
`;

export const EventModalLootableCard = ({
  cardName,
  cardId,
  cost,
  canAfford,
  canTake,
  takeCardCb
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const dispatch = useDispatch();

  return (
    <div css={eventModalLootableCardCss(isTaken, isHovered)}>
      {typeof cost === 'number' && (
        <React.Fragment>
          <Gold gold={cost} color={canAfford ? 'yellow' : 'red'} />
          <Spacer height={35} />
        </React.Fragment>
      )}
      <Card
        cardName={cardName}
        cardId={cardId}
        onClick={() => {
          if (!canTake) {
            dispatch(actions.setToast('Cannot take any more cards!'));
          } else if (canAfford) {
            if (cost) {
              dispatch(actions.adjustPlayerGold(-1 * cost));
            }
            dispatch(actions.addCardsToCollection(createNewCard(cardName || cards[cardId])));
            setIsTaken(true);
            if (takeCardCb) {
              takeCardCb()
            };
          } else {
            dispatch(actions.setToast('Not enough gold!'));
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};
