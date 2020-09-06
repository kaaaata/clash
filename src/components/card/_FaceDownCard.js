import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image } from '../particles';
import { colors } from '../styles';
import { cardWidth, cardHeight } from './Card';

const _faceDownCardCss = css`
  width: 100%;
  height: 100%;
  background: ${colors.blackMediumDark};
  border: 2px solid ${colors.steel};
  border-radius: 5px;

  .image {
    margin: -2px 0 0 -2px;
    border-radius: 5px;
  }
`;

export const _FaceDownCard = () => (
  <div css={_faceDownCardCss}>
    <Image
      src='card_back.png'
      width={cardWidth}
      height={cardHeight}
    />
  </div>
);
