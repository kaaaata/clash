import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text } from '../particles';

const mainMenuCss = css`
  .play {
    position: absolute;
    left: 100px;
    top: 350px;
  }

  .title {
    margin-top: 90px;
    text-align: center;
  }
`;

export const MainMenu = () => {
  const dispatch = useDispatch();

  return (
    <div css={mainMenuCss}>
      <Text type='title' className='title'>
        12 Days Before the Dragon Attack
      </Text>
      <Text
        type='header'
        onClick={() => dispatch(actions.setScene('story'))}
        className='play'
      >
        Play
      </Text>
    </div>
  );
};
