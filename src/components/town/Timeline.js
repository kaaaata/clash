import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Spacer, FlexContainer, Text, FlexItem, Image } from '../particles';
import { colors, effects } from '../styles';

const timelineCss = css`
  width: 900px;
  height: 60px;
  position: relative;

  .meter {
    position: absolute;
    top: 25px;
    width: 100%;
    height: 10px;
    border-radius: 2px;

    .fill_grey {
      background: ${colors.grey};
      height: 100%;
      width: 100%;
      position: absolute;
    }

    .fill_green {
      background: ${colors.green};
      height: 100%;
      transition: width 1s ease-out;
      position: absolute;
    }
  }
`;

const Node = ({ image, day, currentDay, big }) => {
  const nodeCss = css`
    border-radius: 50%;
    position: absolute;
    background: ${colors.sand};
    border: 4px solid ${colors.grey};
    left: ${(day - 1) * 100 - (big ? 25 : 15)}px;
    top: ${big ? 0 : 10}px;
    height: ${big ? 60 : 40}px;
    width: ${big ? 60 : 40}px;
    ${day <= currentDay ? `border: 4px solid ${colors.green};` : ''}
    ${day === currentDay ? `
      ${effects.waxAndWane}
      animation: waxAndWane 2.5s infinite;
    `: ''}
  `;

  return (
    <FlexContainer
      justifyContent='center'
      alignItems='center'
      _css={nodeCss}
    >
      {image && (
        <Image
          src={image}
          width={big ? 60 : 30}
          height={big ? 60 : 30}
        />
      )}
    </FlexContainer>
  );
};

const nodes = [
  { image: 'clash_swords.png', big: false },
  { image: 'clash_swords.png', big: false },
  { image: 'death.png', big: true },
  { image: 'clash_swords.png', big: false },
  { image: 'clash_swords.png', big: false },
  { image: 'death.png', big: true },
  { image: 'clash_swords.png', big: false },
  { image: 'clash_swords.png', big: false },
  { image: null, big: false },
  { image: 'death_red.png', big: true },
];

export const Timeline = () => {
  const { day } = useSelector(state => ({
    day: state.clashTown.day,
  }), shallowEqual);

  return (
    <div css={timelineCss}>
      <div className='meter'>
        <div className='fill_grey' />
        <div className='fill_green' css={css`width: ${100 * (day - 1) / 9}%;`} />
      </div>
      {nodes.map((node, index) => (
        <Node
          key={index}
          day={index + 1}
          currentDay={day}
          image={node.image}
          big={node.big}
        />
      ))}
    </div>
  );
};
