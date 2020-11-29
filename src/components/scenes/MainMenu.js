import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text, Spacer } from '../particles';
import { colors } from '../styles';
import { RulesModal } from '../modals/RulesModal';

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
const yellowUnderlineTextCss = css`
  position: relative;
  width: fit-content;
  cursor: pointer;

  .underline {
    position: absolute;
    height: 4px;
    width: 0%;
    transition: width 0.3s ease-out;
    background: ${colors.yellow};
  }

  &:hover {
    .underline {
      width: 100%;
    }
  }
`;

const YellowUnderlineText = ({ text, onClick }) => (
  <div
    css={yellowUnderlineTextCss}
    onClick={onClick}
  >
    <Text type='header'>{text}</Text>
    <div className='underline' />
  </div>
);

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
      <Text centered>A game by Catherine Han</Text>
      <div className='menu'>
        <YellowUnderlineText
          text='Play'
          onClick={() => dispatch(actions.setScene('story'))}
        >
          Play
        </YellowUnderlineText>
        <Spacer height={10} />
        <YellowUnderlineText
          text='Help'
          onClick={() => setIsRulesModalActive(true)}
        >
          Play
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
