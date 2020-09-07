import { css } from '@emotion/core'; /** @jsx jsx */
import { effects } from './styles';

export const portraitCss = (player) => css`
  position: absolute;
  left: ${player === 'enemy' ? 1050 : 35}px;
  top: ${player === 'enemy' ? 54 : 485}px;

  .rainbow {
    ${effects.rainbow};
    animation: rainbow 5s infinite;
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

  .attributes {
    margin-top: -5px;
  }
`;
