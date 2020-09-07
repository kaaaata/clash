import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, shallowEqual } from 'react-redux';
import { Image, Spacer, FlexContainer } from './particles';
import { Attributes } from './Attributes';
import { Shields } from './Shields';
import { portraitCss } from './portraitCss';

export const Portrait = ({ player }) => {
  const { image, stats, statBonuses, shields, isDead, isEnemyElite } = useSelector(state => {
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
      isEnemyElite: state.clashBattleStats.isEnemyElite
    };
  }, shallowEqual);
  const [portraitClassName, setPortraitClassName] = useState('portrait');

  useEffect(() => {
    if (isDead) {
      setPortraitClassName('portrait dead');
    }
  }, [isDead]);

  const shieldsDisplay = !!shields && (
    <Shields
      shields={shields}
      imageProps={{
        _css: `
          position: absolute;
          top: ${player === 'enemy' ? -10 : -25}px;
          ${player === 'enemy' ? 'left: -15px;' : 'right: -15px;'}
        `
      }}
    />
  );

  return (
    <FlexContainer flexDirection='column' _css={portraitCss(player)}>
      <div className={isEnemyElite ? 'rainbow' : ''}>
        <Image
          src={`${image}.png`}
          width={120}
          height={150}
          className={portraitClassName}
          size='contain'
        />
      </div>
      {/* hold the place during the spinny death animation */}
      <Spacer height={150} />
      <Spacer height={5} />
      {shieldsDisplay}
      <Attributes stats={stats} statBonuses={statBonuses} />
    </FlexContainer>
  );
};
