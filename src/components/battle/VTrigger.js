import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Button, FlexContainer } from '../particles';
import { colors, effects } from '../styles';

export const VTrigger = ({ handleActivateVTrigger, bars }) => {
  const canActivate = !!bars;

  const vTriggerCss = css`
    position: absolute;
    width: 150px;
    top: 430px;
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

      .fill {
        position: absolute;
        height: 28px;
        background: ${canActivate ? colors.yellow : colors.slateLight};
        width: ${~~(100 * bars / 2)}%;
        transition: all 0.75s ease-out;
      }

      .text {
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
      onClick={handleActivateVTrigger}
      className={canActivate ? 'glow' : ''}
      _css={vTriggerCss}
    >
      <div className='fill_container'>
        <div className='fill' />
        <FlexContainer justifyContent='center' alignItems='center' className='text'>
          <div>Re-draw ({bars}/2)</div>
        </FlexContainer>
      </div>
    </Button>
  );
};
