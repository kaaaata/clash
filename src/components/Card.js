/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { cards } from '../cards/cards';
import { Image, Spacer, FlexContainer } from './particles';
import { colors, zIndex } from './styles';
import { rarityColors } from '../cards/rarity';
import { _cardCss } from './cardCss';

export const cardWidth = 140;
export const cardHeight = 190;

const _Card = React.memo(
  ({ name }) => {
    const {
      image,
      imageSlant,
      craftedImage,
      craftedImageSlant,
      rarity,
      attack,
      defense,
      type,
      description,
      glow,
    } = cards[name];

    const cardArt = (
      <React.Fragment>
        <Spacer height={90} />
        {glow && <div className={`glow glow_${glow}`} />}
        {rarity === 'crafted' ? (
          <React.Fragment>
            <Image
              src={`${image}.png`}
              width='100%'
              height={90}
              size='contain'
              className='card_art faded'
            />
            <Image
              src={`${craftedImage}.png`}
              width='100%'
              height={90}
              size='contain'
              className={`card_art ${imageSlant === craftedImageSlant ? 'horizontal_flip' : ''}`}
            />
          </React.Fragment>
        ) : (
          <Image
            src={`${image}.png`}
            width='100%'
            height={type === 'ally' ? 165 : 90}
            size='contain'
            className={`card_art ${type === 'ally' ? 'ally' : ''}`}
            // adjust top margin for this single card which doesn't come with top whitespace...
            _css={name === 'Catherine the Great' ? 'top: -6px !important;': ''}
          />
        )}
      </React.Fragment>
    );
  
    const attackDisplay = type !== 'potion' && (
      <Image
        className='attack'
        src={`${type}.png`}
        width={20}
        height={20}
      >
        <div className='number'>{attack}</div>
      </Image>
    );
  
    const defenseDisplay = type !== 'potion' && (
      <Image
        className='defense'
        src='defense.png'
        width={20}
        height={20}
      >
        <div className='number'>{defense}</div>
      </Image>
    );
  
    const cardTypeFlair = (
      <Image
        className='type_flair'
        src={`${type === 'potion' ? 'healing_potion' : type}.png`}
        width={12}
        height={12}
      />
    );

    return (
      <Image
        src='rock.png'
        width={cardWidth}
        height={cardWidth}
        _css={_cardCss(colors[rarityColors[rarity]])}
        rgbaFilter='rgba(0, 0, 0, 0.45)'
      >
        <div className='name'>{name}</div>
        <div className='border' />
        <div className='image_container'>
          {cardArt}
          {attackDisplay}
          {defenseDisplay}
        </div>
        <div className='border' />
        <FlexContainer
          className='flair'
          justifyContent='space-between'
          alignItems='center'
        >
          <div>
            {type[0].toUpperCase()}{type.slice(1)}{' - '}
            <span className='rarity'>
              {rarity[0].toUpperCase()}{rarity.slice(1)}
            </span>
          </div>
          {cardTypeFlair}
        </FlexContainer>
        <div className='border' />
        <div className='description'>{description}</div>
      </Image>
    );
  }
);

const _FaceDownCard = () => (
  <div css={css`
    width: 100%;
    height: 100%;
    background: ${colors.blackMediumDark};
    border: 2px solid ${colors.steel};
    border-radius: 5px;

    .image {
      margin: -2px 0 0 -2px;
      border-radius: 5px;
    }
  `}>
    <Image
      src='card_back.png'
      width={cardWidth}
      height={cardHeight}
    />
  </div>
);

export const Card = ({
  name,
  x = 0,
  y = 0,
  isFaceDown,
  isInCardPile = false,
  shouldAnimateEntry = false,
  shouldDisableZoom = false,
  isBlurred = false,
  isHidden = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const animatedEntryStartingTransformCss = 'transform: rotate3d(0, 1, 0, 65deg);';
  const restingPositionTransformCss = isInCardPile
    ? 'transform: rotate3d(1, 0, 0, 65deg);'
    : '';

  const [transformCss, setTransformCss] = useState(
    shouldAnimateEntry
      ? animatedEntryStartingTransformCss
      : restingPositionTransformCss
  );

  const cardCss = css`
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    ${x && y ? `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    ` : 'position: relative;'}
    user-select: none;
    border-radius: 5px;
    ${isInCardPile ? `
      transition: transform 0.2s ease-in;
      ${transformCss}
    ` : `
      cursor: pointer;
      transition: transform 0.1s ease-out;
      box-shadow: 2px 2px 3px ${colors.black};

      ${shouldDisableZoom ? '' : `
        &:hover {
          z-index: ${zIndex.mouseEventArea5};
          transform: scale(1.3);
        }
      `}
    `}
    ${isBlurred ? 'filter: blur(3px);' : ''}
    ${isHidden ? 'visibility: hidden;' : ''}
  `;

  useEffect(() => {
    // need this garbage to properly restart animation
    setTimeout(() => {
      if (transformCss === animatedEntryStartingTransformCss) {
        setTransformCss(restingPositionTransformCss);
      }
    }, 0);
  });

  const mouseProps = {};
  if (onClick) {
    mouseProps.onClick = onClick;
  }
  if (onMouseEnter) {
    mouseProps.onMouseEnter = onMouseEnter;
  }
  if (onMouseLeave) {
    mouseProps.onMouseLeave = onMouseLeave;
  }

  return (
    <div
      className='card'
      css={cardCss}
      {...mouseProps}
    >
      {isFaceDown ? <_FaceDownCard /> : <_Card name={name} />}
    </div>
  )

};

// refactor this eventually to show the card back maybe
export const PileCardPlaceholder = ({ x, y, isInvisible }) => (
  <div css={css`
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    border: 1px solid ${colors.white};
    border-radius: 5px;
    transform: rotate3d(1, 0, 0, 65deg);
  `} />
);
