import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import * as actions from '../../../stores/actions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { EventModal, EventModalPage } from '../../modals/EventModal';
import { Spacer, Gold } from '../../particles';
import { Card } from '../../Card';

// the margin-top: -15px is a hack to fit all the content inside EventModal.
// the line-height: 1 is a hack to disallow EventModal paragraph line height from impacting card text.
const purchaseCardsCss = css`
  .item {
    margin-right: 40px;
    display: inline-block;
    line-height: 1 !important;
    position: relative;

    .gold {
      justify-content: center;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: top 0.1s ease-out;
    }

    &.hidden {
      visibility: hidden;
    }

    &.hovered {
      .gold {
        top: -20px;
      }
    }
  }
`;

export const PurchaseCards = ({ title, image, closeModal }) => {
  const { gold, cards } = useSelector(state => ({
    gold: state.clashPlayer.gold,
    cards: state.clashTown.purchasableCards
  }), shallowEqual);
  const dispatch = useDispatch();

  const [purchasedCards, setPurchasedCards] = useState({});
  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1);

  return (
    <EventModal
      title={title}
      image={image}
    >
      <EventModalPage
        page={1}
        text={
          <div css={purchaseCardsCss}>
            {cards.map((i, index) => (
              <div
                key={index}
                className={[
                  'item',
                  purchasedCards[index] ? 'hidden' : '',
                  hoveredCardIndex === index ? 'hovered' : ''
                ].filter(Boolean).join(' ')}
              >
                <Gold gold={i.cost} color={gold >= i.cost ? 'yellow' : 'red'} />
                <Spacer height={35} />
                <Card
                  name={i.name}
                  onClick={() => {
                    if (gold >= i.cost) {
                      dispatch(actions.adjustPlayerGold(-1 * i.cost));
                      dispatch(actions.addCardsToCollection(i.name));
                      setPurchasedCards({
                        ...purchasedCards,
                        [index]: true
                      });
                    } else {
                      dispatch(actions.setToast('Not enough gold!'));
                    }
                  }}
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(-1)}
                />
              </div>
            ))}
          </div>
        }
        options={[{
          name: 'Leave',
          onClick: closeModal
        }]}
      />
    </EventModal>
  );
};
