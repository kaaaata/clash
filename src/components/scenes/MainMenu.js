import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text, Spacer, YellowUnderlineText } from '../particles';
import { RulesModal } from '../modals/RulesModal';

export const MainMenu = () => {
  const dispatch = useDispatch();

  const [isRulesModalActive, setIsRulesModalActive] = useState(false);

  useEffect(() => {
    if (window.flow.skipIntro_toggle) {
      dispatch(actions.setScene('character_select'))
    }
  })

  return (
    <div css={mainMenuCss}>
      <Spacer height={90} />
      <Text type='title' centered>Clash</Text>
      <Spacer height={30} />
      <Text centered>A game by KATA-</Text>
      <div className='menu'>
        <YellowUnderlineText onClick={() => dispatch(actions.setScene('story'))}>
          Play
        </YellowUnderlineText>
        <Spacer height={10} />
        <YellowUnderlineText onClick={() => setIsRulesModalActive(true)}>
          Help
        </YellowUnderlineText>
      </div>

      {isRulesModalActive && (
        <RulesModal
          isTopNavPresent={false}
          closeModal={() => setIsRulesModalActive(false)}
        />
      )}
    </div>
  );
};

const mainMenuCss = css`
  .menu {
    position: absolute;
    left: 100px;
    top: 350px;

    & > div {
      margin-bottom: 15px;
    }
  }
`;
