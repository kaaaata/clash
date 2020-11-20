import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles/colors';

export const townCss = css`
  padding: 40px 60px;
  height: calc(100% - 40px);

  .play {
    position: absolute;
    left: 100px;
    top: 350px;
  }

  .title {
    margin-top: 90px;
    text-align: center;
  }

  .updates {
    padding-right: 40px;
    width: 250px;

    .feed {
      overflow: scroll;
      border-bottom: 3px solid ${colors.yellow};
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      padding: 10px;
      flex-grow: 1;
      height: 0; ${/* prevent this flex child div from expanding past parent div height */''}
    }

    .description {
      height: 50px;
    }
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
  }
`;
