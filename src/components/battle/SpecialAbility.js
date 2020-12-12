import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { shallowEqual, useSelector } from 'react-redux';
import { Button, FlexContainer, Text, Tooltip } from '../particles';
import { colors, effects } from '../styles';

export const SpecialAbility = ({ onClick }) => {
  const {
    specialAbilityBars,
    specialAbility,
    maxSpecialAbilityBars,
    isAnimating
  } = useSelector(state => ({
    specialAbilityBars: state.clashBattleStats.specialAbilityBars,
    specialAbility: state.clashBattleStats.specialAbility,
    maxSpecialAbilityBars: state.clashBattleStats.maxSpecialAbilityBars,
    isAnimating: state.clashBattleStats.isAnimating
  }), shallowEqual);
  const canActivate = !!specialAbilityBars && !isAnimating;
  const barColor = specialAbility.name === 'Invoke'
    ? specialAbilityBars % 2 === 0 ? colors.blue : colors.red
    : specialAbility.color;
  const name = specialAbility.name === 'Invoke'
    ? specialAbilityBars % 2 === 0 ? 'Invoke Frost' : 'Invoke Fire'
    : specialAbility.name;

  const speialAbilityCss = css`
    position: absolute;
    width: 150px;
    top: 370px;
    left: 25px;
    padding: 0;
    background: none !important;
    border: 2px solid ${canActivate ? colors.green : colors.red};
    
    &.glow {
      ${canActivate ? effects.glowGreen : ''}
    }

    .fill_container {
      position: relative;
      height: 100%;
      drop-shadow: none;

      .fill {
        position: absolute;
        height: 28px;
        background: ${specialAbilityBars ? barColor : colors.slateLight};
        width: ${~~(100 * specialAbilityBars / maxSpecialAbilityBars)}%;
        transition: all 0.75s ease-out;
      }

      .text_container {
        position: absolute;
        height: 28px;
        width: 150px;
      }
    }
  `;

  return (
    <Button
      centered
      isDisabled={!canActivate}
      onClick={canActivate ? onClick : null}
      className={canActivate ? 'glow' : ''}
      _css={speialAbilityCss}
    >
      <Tooltip text={specialAbility.description} className='fill_container'>
        <div className='fill' />
        <FlexContainer justifyContent='center' alignItems='center' className='text_container'>
          <Text type='mini'>{name} ({specialAbilityBars}/{maxSpecialAbilityBars})</Text>
        </FlexContainer>
      </Tooltip>
    </Button>
  );
};
