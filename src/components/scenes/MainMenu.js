import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text, Spacer } from '../particles';

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

export const MainMenu = () => {
  const dispatch = useDispatch();

  return (
    <div css={mainMenuCss}>
      <Spacer height={90} />
      <Text type='title' centered>Clash</Text>
      <Spacer height={30} />
      <Text centered>A game by Catherine Han</Text>
      <div className='menu'>
        <Text
          type='header'
          onClick={() => dispatch(actions.setScene('story'))}
        >
          Play
        </Text>
        <Text
          type='header'
          onClick={() => {}}
        >
          About
        </Text>
        <Text
          type='header'
          onClick={() => {}}
        >
          Credits
        </Text>
      </div>
    </div>
  );
};
