/* eslint-disable react/jsx-pascal-case */
import React from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { cards } from '../../cards/cards';
import { rarityColors } from '../../cards/rarity';
import { blueprints } from '../../cards/blueprints';
import { Image, Spacer, FlexContainer } from '../particles';
import { colors, zIndex } from '../styles';
import { _cardCss } from './cardCss';
import { _FaceDownCard } from './_FaceDownCard';

export const cardWidth = 140;
export const cardHeight = 190;

const cardsWithoutTopMargin = ['Catherine the Great', 'Flowy Lady', 'Shaman', 'Brawler'];

// todo: is there a way to render fewer <_Card>? memoization?
const _Card = ({ cardName, cardId }) => {
  const card = cardName ? blueprints.allCardsObject[cardName] : cards[cardId];
  const {
    name,
    image,
    rarity,
    attack,
    defense,
    type,
    description,
    battleMutatedProperties,
    prefix,
    suffix
  } = card;

  const cardArt = (
    <React.Fragment>
      <Spacer height={90} />
      <Image
        src={`${image}.png`}
        width='100%'
        height={type === 'ally' ? 165 : 90}
        size='contain'
        className={`card_art ${type === 'ally' ? 'ally' : ''}`}
        _css={cardsWithoutTopMargin.includes(name) ? 'top: -6px !important;': ''}
      />
    </React.Fragment>
  );

  const attackDisplay = type !== 'potion' && (
    <Image
      className='attack'
      src={`${type}.png`}
      width={20}
      height={20}
    >
      <div className={`number ${battleMutatedProperties.attack ? 'green' : ''}`}>
        {attack}
      </div>
    </Image>
  );

  const defenseDisplay = type !== 'potion' && (
    <Image
      className='defense'
      src='defense.png'
      width={20}
      height={20}
    >
      <div className={`number ${battleMutatedProperties.defense ? 'green' : ''}`}>
        {defense}
      </div>
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
      src='rock_background.png'
      width={cardWidth}
      height={cardWidth}
      _css={_cardCss(colors[rarityColors[rarity]])}
      rgbaFilter='rgba(0, 0, 0, 0.45)'
    >
      <div className='name'>
        {`${prefix || ''} ${name} ${suffix || ''}`.trim()}
      </div>
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
};

export const Card = ({
  cardName,
  cardId,
  x,
  y,
  isFaceDown,
  isInCardPile = false,
  shouldDisableZoom = false,
  isBlurred = false,
  isHidden = false,
  disablePointer = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const cardCss = css`
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    ${typeof x === 'number' && typeof y === 'number' ? `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    ` : 'position: relative;'}
    user-select: none;
    border-radius: 5px;
    ${!isInCardPile && `
      ${disablePointer ? '' : 'cursor: pointer;'}
      transition: transform 0.1s ease-out;
      box-shadow: 2px 2px 3px ${colors.black};

      ${shouldDisableZoom ? '' : `
        &:hover {
          z-index: ${zIndex.mouseEventArea5};
          transform: scale(1.3);
        }
      `}
    `}
    ${isBlurred ? 'filter: blur(3px); &:hover { filter: none; } ' : ''}
    ${isHidden ? 'visibility: hidden;' : ''}
  `;

  return (
    <div
      className='card'
      css={cardCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isFaceDown ? <_FaceDownCard /> : <_Card cardName={cardName} cardId={cardId} />}
    </div>
  );
};
