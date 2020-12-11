import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Image, Gold, Text } from './particles';
import { Attributes } from './Attributes';
import { Settings } from './modals/Settings';
import { Shop } from './shop/Shop';
import { Crafting } from './crafting/Crafting';
import { topNavCss, energyMeterCss, collectionCss } from './topNavCss';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import * as actions from '../stores/actions';
import { CardViewModal } from './modals/CardViewModal';
import { GameOver } from './modals/GameOver';

export const TopNav = () => {
  const {
    lives,
    gold,
    energy,
    energyReserved,
    deck,
    image,
    stats,
    canVisitShop,
    shouldHideTopNav
  } = useSelector(state => ({
    lives: state.clashPlayer.lives,
    gold: state.clashPlayer.gold,
    energy: state.clashTown.energy,
    energyReserved: state.clashTown.energyReserved,
    deck: state.clashPlayer.deck,
    image: state.clashBattleStats.yourImage,
    stats: state.clashBattleStats.yourStats,
    canVisitShop: state.clashScene.canVisitShop,
    shouldHideTopNav: ['story', 'main_menu', 'character_select', 'win_screen'].includes(state.clashScene.scene)
  }), shallowEqual);
  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (!lives) {
      setActiveModal(null);
      setIsSettingsOpen(false);
    }
  }, [lives]);

  return shouldHideTopNav ? null : (
    <React.Fragment>
      <FlexContainer
        justifyContent='space-between'
        alignItems='center'
        _css={topNavCss}
      >
        <FlexContainer className='left' alignItems='center'>
          <Image
            className='top_nav_portrait'
            src={`${image}.png`}
            width={36}
            height={36}
            size='contain'
          />
          <Attributes stats={stats} />
          <FlexContainer className='lives' alignItems='center'>
            <Text type='small'>Lives:&nbsp;</Text>
            {[1, 2, 3].map(i => (
              <Image
                key={i}
                src='life.png'
                width={30}
                height={30}
                _css={i > lives ? 'opacity: 0.15;' : ''}
              />
            ))}
          </FlexContainer>
        </FlexContainer>

        <FlexContainer className='center' justifyContent='center' alignItems='center'>
          <Image
            src='energy.png'
            width={20}
            height={25}
            className='energy'
          />
          <FlexContainer _css={energyMeterCss} justifyContent='space-between'>
            <div className='fill' css={css`width: ${100 * energy / 10}%;`} />
            <Image
              src='rock_sliver.png'
              width={300}
              height={20}
              className='reserved'
              _css={`width: ${100 * energyReserved / 10}%;`}
            />
            <Text type='mini' className='energy_count'>{energy} / 10</Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer className='right' justifyContent='flex-end' alignItems='center'>
          <FlexContainer className='collection' alignItems='center'>
            <div css={collectionCss}>
              {[0, 1].map(i => (
                <Image
                  key={i}
                  src='card_back.png'
                  width={24}
                  height={34}
                  onClick={() => {
                    setActiveModal(activeModal === 'collection' ? null : 'collection');
                    setIsSettingsOpen(false);
                  }}
                  className={`card_${i}`}
                />
              ))}
            </div>
            <Text className='deck_count'>{deck.length}</Text>
          </FlexContainer>
          <Gold gold={gold} />
          <Image
            src='shop.png'
            width={35}
            height={35}
            onClick={() => {
              if (canVisitShop) {
                setActiveModal(activeModal === 'shop' ? null : 'shop');
                setIsSettingsOpen(false);
              } else {
                dispatch(actions.setToast('You can\'t shop right now!'));
              }
            }}
            className='shop'
          >
            $
          </Image>
          <Image
            src='gear.png'
            width={35}
            height={35}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className='settings'
          />
        </FlexContainer>
      </FlexContainer>

      <div css={css`display: ${activeModal === 'collection' ? 'unset' : 'none'};`}>
        <CardViewModal
          title='Your Deck'
          cardIds={deck}
          closeModal={() => {
            setActiveModal(null);
            setIsSettingsOpen(false);
          }}
        />
      </div>

      <div css={css`display: ${activeModal === 'crafting' ? 'unset' : 'none'};`}>
        <Crafting closeModal={() => setActiveModal(null)} />
      </div>

      <div css={css`display: ${activeModal === 'shop' ? 'unset' : 'none'};`}>
        <Shop closeModal={() => setActiveModal(null)} />
      </div>

      <div css={css`display: ${!lives ? 'unset' : 'none'};`}>
        <GameOver />
      </div>

      <div css={css`display: ${isSettingsOpen ? 'unset' : 'none'};`}>
        <Settings closeModal={() => setIsSettingsOpen(false)} />
      </div>
    </React.Fragment>
  );
};
