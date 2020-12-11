import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { shallowEqual, useSelector } from 'react-redux';
import { Button, FlexContainer, Text } from '../particles';
import { colors, effects } from '../styles';

export const VTrigger = ({ onClick }) => {
  const { vBars, isAnimating } = useSelector(state => ({
    vBars: state.clashBattleStats.vBars,
    isAnimating: state.clashBattleStats.isAnimating
  }), shallowEqual);
  const canActivate = !!vBars && !isAnimating;

  const vTriggerCss = css`
    position: absolute;
    width: 150px;
    top: 420px;
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

      .fill {
        position: absolute;
        height: 28px;
        background: ${vBars ? colors.yellow : colors.slateLight};
        width: ${~~(100 * vBars / 3)}%;
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
      _css={vTriggerCss}
    >
      <div className='fill_container'>
        <div className='fill' />
        <FlexContainer justifyContent='center' alignItems='center' className='text_container'>
          <Text type='mini'>Re-draw ({vBars}/3)</Text>
        </FlexContainer>
      </div>
    </Button>
  );
};
