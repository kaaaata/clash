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
  `
};
