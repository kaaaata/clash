/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { cards } from '../cards/cards';
import { Image, Spacer, FlexContainer } from './particles';
import { colors, zIndex } from './styles';
import { rarityColors } from '../cards/rarity';
import { _cardCss } from './cardCss';

const width = 120;
const height = 170;

const _Card = React.memo(
  ({ name }) => {
    const {
      image,
      rarity,
      attack,
      defense,
      type,
      description
    } = cards[name];

    const cardArt = (
      <React.Fragment>
        <Spacer height={70} />
        <Image
          src={`/clash/${image}.png`}
          width='100%'
          height={70}
          size='contain'
          _css='position: absolute;'
        />
      </React.Fragment>
    );
  
    const attackDisplay = type !== 'potion' && (
      <Image
        className='attack'
        src={`/clash/${type}.png`}
        width={20}
        height={20}
      >
        <div className='number'>{attack}</div>
      </Image>
    );
  
    const defenseDisplay = typeof defense === 'number' && (
      <Image
        className='defense'
        src='/clash/defense.png'
        width={20}
        height={20}
      >
        <div className='number'>{defense}</div>
      </Image>
    );
  
    const cardTypeFlair = (
      <Image
        className='type_flair'
        src={`/clash/${type === 'potion' ? 'healing_potion' : type}.png`}
        width={12}
        height={12}
      />
    );

    return (
      <Image
        src='/clash/rock.png'
        width={width}
        height={height}
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
      src='/clash/card_back.png'
      width={width}
      height={height}
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
  isBlurred = false,
  isHidden = false,
  onClick
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
    width: ${width}px;
    height: ${height}px;
    ${x && y ? `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    ` : 'position: relative;'}
    user-select: none;
    border-radius: 5px;
    ${isInCardPile ? transformCss : `
      box-shadow: 2px 2px 3px ${colors.black};

      &:hover {
        z-index: ${zIndex.mouseEventArea5};
        ${onClick ? 'transform: scale(1.25);' : transformCss}
      }
    `}
    transition: transform ${onClick ? '0.1s' : '0.2s'} ease-out;
    cursor: ${onClick ? 'pointer' : 'default'};
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

  return (
    <div
      className='card'
      css={cardCss}
      onClick={onClick}
    >
      {isFaceDown ? <_FaceDownCard /> : <_Card name={name} />}
    </div>
  )

};

// refactor this eventually to show the card back maybe
export const PileCardPlaceholder = ({ x, y, isInvisible }) => (
  <div css={css`
    width: ${width}px;
    height: ${height}px;
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    border: 1px solid ${colors.white};
    border-radius: 5px;
    transform: rotate3d(1, 0, 0, 65deg);
  `} />
);
