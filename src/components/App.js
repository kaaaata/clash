import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { BackgroundImage } from './scenes/BackgroundImage';
import { Scene } from './scenes/Scene';
import { TopNav } from './TopNav';
import { Toasts } from './Toasts';
import { colors } from './styles';
import { Flow } from './flow/Flow';

const appCss = css`
  width: 1200px;
  height: 700px;
  user-select: none;
  position: relative;

  color: ${colors.white};
  letter-spacing: 0.3px;
  font-family: 'Cabin', sans-serif;

  button {
    font-family: 'Cabin', sans-serif;
  }

  .sand { color: ${colors.sand}; }
  .green { color: ${colors.green}; }
  .blue { color: ${colors.blue}; }
  .red { color: ${colors.red}; }
  .yellow { color: ${colors.yellow}; }
  .violet { color: ${colors.violet}; }
  .greyDark { color: ${colors.greyDark}; }
  
  .bold { font-weight: bold; }
`;

export const App = () => {
  console.log('app rerender')
  window.flow = {};
  if (JSON.parse(window.localStorage.getItem('clash_isFlowEnabled'))) {
    Object.entries(window.localStorage).forEach(i => {
      if (i[0].startsWith('clash_')) {
        window.flow[i[0].slice('clash_'.length)] = JSON.parse(i[1]);
      }
    })
  }

 return (
    <main id='app' css={appCss}>
      {window.location.pathname === '/flow' ? <Flow /> : (
        <React.Fragment>
          <BackgroundImage />
          <Scene />
          <TopNav />
          <Toasts />
        </React.Fragment>
      )}
    </main>
  );
};
