import { css } from '@emotion/core'; /** @jsx jsx */
import { colors, effects } from './styles';

export const portraitCss = (player) => css`
  position: absolute;
  left: ${player === 'enemy' ? 1050 : 35}px;
  top: ${player === 'enemy' ? 54 : 485}px;

  .rainbow {
    ${effects.rainbow};
    animation: rainbow 10s infinite;
  }

  .portrait {
    position: absolute;
    transition: transform 2s ease-in, width 2s ease-in, height 2s ease-in;

    &.dead {
      transform: rotate(1260deg);
      width: 0px;
      height: 0px;
      margin-left: 0;
    }
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
    margin-top: -5px;
  }
`;
