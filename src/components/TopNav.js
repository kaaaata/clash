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
  const [activeModal, setActiveModal] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    lives,
    gold,
    goldBars,
    energy,
    deck,
    image,
    stats,
    statBonuses,
    canVisitShop,
    shouldHideTopNav
  } = useSelector(state => ({
    lives: state.clashPlayer.lives,
    gold: state.clashPlayer.gold,
    goldBars: state.clashPlayer.goldBars,
    energy: state.clashTown.energy,
    deck: state.clashPlayer.deck,
    image: state.clashBattleStats.yourImage,
    stats: state.clashBattleStats.yourStats,
    statBonuses: state.clashBattleStats.yourStatBonuses,
    canVisitShop: state.clashScene.canVisitShop,
    shouldHideTopNav: ['story', 'main_menu'].includes(state.clashScene.scene)
  }), shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lives) {
      setActiveModal('gameover');
      setIsSettingsOpen(false);
    }
  }, [lives])

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
            width={20}
            height={36}
          />
          <Attributes stats={stats} statBonuses={statBonuses} />
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
          <div css={energyMeterCss}>
            <div className='fill' css={css`width: ${100 * energy / 10}%;`} />
            <Text type='mini' className='energy_count'>{energy} / 10</Text>
          </div>
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
          <FlexContainer className='gold_bar' alignItems='center' justifyContent='flex-start'>
            <Image
              src='gold_bar.png'
              width={35}
              height={35}
              onClick={() => {
                setActiveModal(activeModal === 'crafting' ? null : 'crafting');
                setIsSettingsOpen(false);
              }}
            />
            <Text color='yellow'>{goldBars}</Text>
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
          cards={deck}
          closeModal={() => {
            setActiveModal(null);
            setIsSettingsOpen(false);
          }}
        />
      </div>

      <div css={css`display: ${activeModal === 'crafting' ? 'unset' : 'none'};`}>
        <Crafting isOpen={activeModal === 'crafting'} />
      </div>

      <div css={css`display: ${activeModal === 'shop' ? 'unset' : 'none'};`}>
        <Shop closeModal={() => setActiveModal(null)} />
      </div>

      <div css={css`display: ${activeModal === 'gameover' ? 'unset' : 'none'};`}>
        <GameOver />
      </div>

      <div css={css`display: ${isSettingsOpen ? 'unset' : 'none'};`}>
        <Settings closeModal={() => setIsSettingsOpen(false)} />
      </div>
    </React.Fragment>
  );
};
