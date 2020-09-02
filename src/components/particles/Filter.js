import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

export const Filter = ({
  opacity = 0, color = colors.white
}) => {
  const filterCss = css`
    opacity: ${opacity};
    background: ${color};
    width: 100%;
    height: 100%;
    position: absolute;

    transition: opacity 1s ease-out;
  `;

  return (
    <div
      className='filter'
      css={filterCss}
    />
  );
};
