import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { CardLootModal } from '../modals/CardLootModal';
import { Spacer, Image, FlexContainer, Gold, Text } from '../particles';
import { packs } from './packs';
import { genPackCards } from './genPackCards';
import { rarityColors } from '../../cards/rarity';

const shopCss = css`
  .pack_container {
    display: inline-block;
    margin: 0 30px 30px 30px;

    .pack {
      transition: transform 0.1s ease-out;

      &:hover {
        transform: scale(1.25);
      }

      .gem {
        margin: auto;
      }
    }
  }
`;

export const Shop = ({ closeModal }) => {
  const { gold } = useSelector(state => ({
    gold: state.clashPlayer.gold
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isCardLootModalActive, setIsCardLootModalActive] = useState(null);
  const [cardLootModalCards, setCardLootModalCards] = useState([]);
  
  return (
    <React.Fragment>
      <Modal title='Shop' closeModal={closeModal}>
        <FlexContainer css={shopCss}>
          {Object.keys(packs).map(i => {
            const pack = packs[i];

            return (
              <div key={i} className='pack_container'>
                <Gold gold={pack.cost} color={gold >= pack.cost ? 'yellow' : 'red'} />
                <Spacer height={20} />
                <Image
                  key={i}
                  src='/clash/pack.png'
                  width={120}
                  height={170}
                  className='pack'
                  onClick={(e) => {
                    e.stopPropagation();
                    if (gold >= pack.cost) {
                      dispatch(actions.adjustPlayerGold(-1 * pack.cost));
                      setCardLootModalCards(genPackCards(pack));
                      setIsCardLootModalActive(true);
                    } else {
                      dispatch(actions.setToast('Not enough gold!'));
                    }
                  }}
                >
                  <Spacer height={45} />
                  <Image
                    src={`/clash/${pack.image}.png`}
                    width={75}
                    height={75}
                    className='gem'
                  />
                </Image>
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
                  </Text>
                </FlexContainer>
              </div>
            );
          })}
        </FlexContainer>

        <Spacer height={15} />
        <Text type='small'>Note: all cards have a 5% chance to upgrade to the next rarity.</Text>
      </Modal>

      {isCardLootModalActive && (
        <CardLootModal
          cards={cardLootModalCards}
          closeModal={() => setIsCardLootModalActive(false)}
        />
      )}
    </React.Fragment>
  );
};
