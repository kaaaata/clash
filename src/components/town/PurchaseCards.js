import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import * as actions from '../../stores/actions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { Spacer, Gold } from '../particles';
import { Card } from '../Card';

// the margin-top: -15px is a hack to fit all the content inside EventModal.
// the line-height: 1 is a hack to disallow EventModal paragraph line height from impacting card text.
const purchaseCardsCss = css`
  .item {
    margin-right: 40px;
    margin-top: -15px;
    display: inline-block;
    line-height: 1 !important;

    &.hidden {
      visibility: hidden;
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
              <div className={`item ${purchasedCards[index] ? 'hidden' : ''}`} key={index}>
                <Gold gold={i.cost} color={gold >= i.cost ? 'yellow' : 'red'} />
                <Spacer height={20} />
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
                />
              </div>
            ))}
            <Spacer height={20} />
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
