import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { shallowEqual, useSelector } from 'react-redux';
import { Button, FlexContainer, Text, Tooltip } from '../particles';
import { colors, effects } from '../styles';

export const SpecialAbility = ({ onClick }) => {
  const { specialAbilityBars, specialAbility } = useSelector(state => ({
    specialAbilityBars: state.clashBattleStats.specialAbilityBars,
    specialAbility: state.clashBattleStats.specialAbility
  }), shallowEqual);
  const canActivate = !!specialAbilityBars;

  const speialAbilityCss = css`
    position: absolute;
    width: 150px;
    top: 370px;
    left: 25px;
    padding: 0;
    background: none !important;
    border: 2px solid ${canActivate ? colors.green : colors.red};
    
    &.glow {
      ${effects.glowGreen}
    }

    .fill_container {
      position: relative;
      height: 100%;
      drop-shadow: none;

      .fill {
        position: absolute;
        height: 28px;
        background: ${canActivate ? colors.blue : colors.slateLight};
        width: ${~~(100 * specialAbilityBars / specialAbility.uses)}%;
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
          <Text type='mini'>{specialAbility.name} ({specialAbilityBars}/{specialAbility.uses})</Text>
        </FlexContainer>
      </Tooltip>
    </Button>
  );
};
