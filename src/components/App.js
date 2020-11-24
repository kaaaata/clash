import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../stores/actions';
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
  .black { color: ${colors.black}; }
  
  .bold { font-weight: bold; }
`;

export const App = () => {
  const dispatch = useDispatch();

  window.flow = {};
  if (JSON.parse(window.localStorage.getItem('clash_isFlowEnabled_toggle'))) {
    Object.entries(window.localStorage).forEach(i => {
      if (i[0].startsWith('clash_')) {
        window.flow[i[0].slice('clash_'.length)] = JSON.parse(i[1]);
      }
    })

    if (window.flow.gold_toggle && typeof window.flow.gold_value === 'number') {
      dispatch(actions.setPlayerGold(window.flow.gold_value));
    }
    if (window.flow.energyReserved_toggle && typeof window.flow.energyReserved_value === 'number') {
      dispatch(actions.setPlayerEnergyReserved(window.flow.energyReserved_value));
    }
    if (window.flow.energy_toggle && typeof window.flow.energy_value === 'number') {
      dispatch(actions.setPlayerEnergy(window.flow.energy_value));
    }
    if (window.flow.day_toggle && typeof window.flow.day_value === 'number') {
      dispatch(actions.setDay(window.flow.day_value));
    }
    if (window.flow.lives_toggle && typeof window.flow.lives_value === 'number') {
      dispatch(actions.setPlayerLives(window.flow.lives_value));
    }
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
