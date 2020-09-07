import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image } from './particles';
import { colors } from './styles';

const shieldsNumberCss = css`
  font-size: 36px;
  text-align: center;
  text-shadow: 2px 2px 4px ${colors.black};
  color: black;
  padding-top: 17px;
  margin-left: -2px;
`;

export const Shields = ({ shields, imageProps }) => (
  <Image
    src='defense.png'
    width={72}
    height={72}
    {...imageProps}
  >
    <div css={shieldsNumberCss}>{shields}</div>
  </Image>
);
