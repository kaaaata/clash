import { colors } from './colors';
import { mixins } from './mixins';

export const effects = {
  rainbow: `
    ${mixins.keyframes('rainbow', `
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    `)}
  `,
  fadeIn: `
    ${mixins.keyframes('fadeIn', `
      0% { opacity: 0; }
      100% { opacity: 1; }
    `)}
  `,
  hoverScale: (duration = 0.1, scale = 1.3) => `
    transition: transform ${duration}s ease-out;
  
    &:hover {
      transform: scale(${scale});
    }
  `,
  waxAndWane: `
    ${mixins.keyframes('waxAndWane', `
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    `)}
  `,
  glowGreen: `
    ${mixins.keyframes('glowGreen', `
      0% { filter: drop-shadow(0 0 8px ${colors.green}); }
      100% { filter: drop-shadow(0 0 22px ${colors.green}); }
    `)}
    animation: glowGreen 1s ease-out infinite alternate;
  `
};
