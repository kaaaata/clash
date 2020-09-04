import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { BackgroundImage } from './scenes/BackgroundImage';
import { Scene } from './scenes/Scene';
import { TopNav } from './TopNav';
import { Toasts } from './Toasts';
import { colors } from './styles';

const appCss = css`
  width: 1200px;
  height: 700px;
  user-select: none;
  position: relative;

  font-family: 'Cabin', sans-serif;
  color: ${colors.white};
  letter-spacing: 0.3px;

  .sand { color: ${colors.sand}; }
  .green { color: ${colors.green}; }
  .blue { color: ${colors.blue}; }
  .red { color: ${colors.red}; }
  .yellow { color: ${colors.yellow}; }
  .violet { color: ${colors.violet}; }
  
  .bold { font-weight: bold; }
`;

export const App = () => (
  <main id='app' css={appCss}>
    <BackgroundImage />
    <Scene />
    <TopNav />
    <Toasts />
  </main>
);
