import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { Image, Spacer } from './particles';
import { Attributes } from './Attributes';
import { colors } from './styles';
import { useState, useEffect } from 'react';

const portraitCss = (player) => css`
  position: absolute;
  left: ${player === 'enemy' ? 885 : 20}px;
  top: ${player === 'enemy' ? 57 : 405}px;

  .portrait {
    position: absolute;
    transition: transform 2s ease-in, width 2s ease-in, height 2s ease-in;
    margin-left: -25px;

    &.dead {
      transform: rotate(1260deg);
      width: 0px;
      height: 0px;
      margin-left: 0;
    }
  }

  .portrait_placeholder {
    width: 100px;
    height: 125px;
  }

  .shields {
    position: absolute;
    top: ${player === 'enemy' ? -10 : -25}px;
    ${player === 'enemy' ? 'left: -15px;' : 'right: -15px;'}
    
    .number {
      font-size: 36px;
      text-align: center;
      text-shadow: 2px 2px 4px ${colors.black};
      color: black;
      margin-top: 18px;
      margin-left: -3px;
    }
  }

  .attributes {
    margin: -3px -5px 0 -5px;
  }
`;

export const Portrait = ({ player }) => {
  const { image, stats, statBonuses, shields, isDead, enemyHueRotate } = useSelector(state => {
    return player === 'you' ? {
      image: state.clashBattleStats.yourImage,
      stats: state.clashBattleStats.yourStats,
      statBonuses: state.clashBattleStats.yourStatBonuses,
      shields: state.clashBattleStats.yourShields,
      isDead: state.clashBattleStats.winner === state.clashBattleStats.enemyName
    } : {
      image: state.clashBattleStats.enemyImage,
      stats: state.clashBattleStats.enemyStats,
      statBonuses: state.clashBattleStats.enemyStatBonuses,
      shields: state.clashBattleStats.enemyShields,
      isDead: state.clashBattleStats.winner === state.clashBattleStats.yourName,
      enemyHueRotate: state.clashBattleStats.enemyHueRotate
    };
  }, shallowEqual);
  const [portraitClassName, setPortraitClassName] = useState('portrait');

  useEffect(() => {
    if (isDead) {
      setPortraitClassName('portrait dead');
    }
  }, [isDead]);

  const portrait = (
    <Image
      src={`${image}.png`}
      width={150}
      height={125}
      className={portraitClassName}
      size='contain'
      filter={enemyHueRotate ? `hue-rotate(${enemyHueRotate}deg)` : null}
    />
  );

  // hold the place during the spinny death animation
  const portraitPlaceholder = (
    <div className='portrait_placeholder' />
  );

  const shieldsDisplay = !!shields && (
    <Image
      className='shields'
      src='defense.png'
      width={72}
      height={72}
    >
      <div className='number'>{shields}</div>
    </Image>
  );

  return (
    <div css={portraitCss(player)}>
      {portrait}
      {portraitPlaceholder}
      <Spacer height={5} />
      {shieldsDisplay}
      <Attributes stats={stats} statBonuses={statBonuses} />
    </div>
  );
};
