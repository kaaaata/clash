import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import * as actions from '../../../stores/actions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { Spacer, Gold } from '../../particles';
import { Card } from '../../card/Card';

// the margin-top: -15px is a hack to fit all the content inside EventModal.
// the line-height: 1 is a hack to disallow EventModal paragraph line height from impacting card text.
const cardWithPriceCss = (isHidden, isHovered) => css`
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

const CardWithPrice = ({ card, cost, canAfford }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      css={cardWithPriceCss(isPurchased, isHovered)}>
      <Gold gold={cost} color={canAfford ? 'yellow' : 'red'} />
      <Spacer height={35} />
      <Card
        name={card}
        onClick={() => {
          if (canAfford) {
            dispatch(actions.adjustPlayerGold(-1 * cost));
            dispatch(actions.addCardsToCollection(card));
            setIsPurchased(true);
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

export const PurchaseCards = ({ title, image, closeModal }) => {
  const { gold, cards } = useSelector(state => ({
    gold: state.clashPlayer.gold,
    cards: state.clashTown.purchasableCards
  }), shallowEqual);

  return (
    <EventModal
      title={title}
      image={image}
    >
      <EventModalPage
        page={1}
        text={cards.map((i, index) => (
          <CardWithPrice
            key={index}
            card={i.name}
            cost={i.cost}
            canAfford={gold >= i.cost}
          />
        ))}
        options={[{
          name: 'Leave',
          onClick: closeModal
        }]}
      />
    </EventModal>
  );
};
