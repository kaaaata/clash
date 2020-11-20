import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { CardLootModal } from '../modals/CardLootModal';
import { Spacer, Image, FlexContainer, Gold, Text } from '../particles';
import { packs } from './packs';
import { genPackCardNames } from './genPackCardNames';
import { rarityColors } from '../../cards/rarity';
import { cardWidth, cardHeight } from '../card/Card';

const shopCss = css`
  .pack_container {
    display: inline-block;
    margin: 0 30px 30px 30px;

    .pack {
      transition: transform 0.1s ease-out;

      .gem {
        margin: auto;
      }

      &.energy_pack {
        width: ${cardWidth}px;
        height: ${cardHeight}px;
        position: relative;
        cursor: pointer;

        .energy {
          position: absolute;

          &.one {
            top: 30px;
            left: 10px;
          }

          &.two {
            top: 75px;
            left: 45px;
          }
        }
      }

      &:hover {
        transform: scale(1.25);
      }
    }
  }
`;

export const Shop = ({ closeModal }) => {
  const { gold, energy } = useSelector(state => ({
    gold: state.clashPlayer.gold,
    energy: state.clashTown.energy
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isCardLootModalActive, setIsCardLootModalActive] = useState(null);
  const [cardLootModalCards, setCardLootModalCards] = useState([]);
  const [cardLootModalImage, setCardLootModalImage] = useState(null);
  
  return (
    <React.Fragment>
      <Modal
        title='Shop'
        closeModal={closeModal}
        shouldCloseOnClick={false}
        shouldShowCloseButton={true}
        closeButtonText='Back to Town'
      >
        <FlexContainer css={shopCss}>
          {Object.keys(packs).map(i => {
            const pack = packs[i];

            return (
              <div key={i} className='pack_container'>
                <Gold gold={pack.cost} color={gold >= pack.cost ? 'yellow' : 'red'} />
                <Spacer height={25} />
                {pack.name === 'Energy' ? (
                  <div
                    className='pack energy_pack'
                    onClick={() => {
                      if (energy === 10) {
                        dispatch(actions.setToast('Already at full energy!'));
                      } else if (gold < pack.cost) {
                        dispatch(actions.setToast('Not enough gold!'));
                      } else {
                        dispatch(actions.adjustPlayerGold(-1 * pack.cost));
                        dispatch(actions.adjustPlayerEnergy(10));
                      }
                    }}
                  >
                    <Image
                      src={`${pack.image}.png`}
                      width={100}
                      height={100}
                      className='energy one'
                    />
                    <Image
                      src={`${pack.image}.png`}
                      width={100}
                      height={100}
                      className='energy two'
                    />
                  </div>
                ) : (
                  <Image
                    key={i}
                    src={`${pack.image}.png`}
                    width={cardWidth}
                    height={cardHeight}
                    className='pack'
                    onClick={(e) => {
                      e.stopPropagation();
                      if (gold >= pack.cost) {
                        dispatch(actions.adjustPlayerGold(-1 * pack.cost));
                        setCardLootModalCards(genPackCardNames(pack));
                        setCardLootModalImage(pack.image);
                        setIsCardLootModalActive(true);
                      } else {
                        dispatch(actions.setToast('Not enough gold!'));
                      }
                    }}
                  />
                )}
                <Spacer height={30} />
                <FlexContainer alignItems='center' flexDirection='column'>
                  <Text type='small'>{pack.name}</Text>
                  <Text type='header'>&#183;</Text>
                  <Text type='small'>
                    {Object.keys(pack.cards).map(rarity => !!pack.cards[rarity] && (
                      <div key={rarity}>
                        {pack.cards[rarity]}&nbsp;
                        <Text color={rarityColors[rarity]} type='small' inline>
                          {rarity}{pack.cards[rarity] === 1 ? '' : 's'}
                        </Text>
                      </div>
                    ))}
                    {pack.name === 'Energy' && 'Full energy refill'}
                  </Text>
                </FlexContainer>
              </div>
            );
          })}
        </FlexContainer>

        <Spacer height={20} />

        <Text type='small' centered>
          Note: all cards have a 10% chance to upgrade to the next rarity.
        </Text>
      </Modal>

      {isCardLootModalActive && (
        <CardLootModal
          image={cardLootModalImage}
          cardNames={cardLootModalCards}
          closeModal={() => setIsCardLootModalActive(false)}
        />
      )}
    </React.Fragment>
  );
};
