import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, zIndex } from '../styles';
import { Text } from './Text';

export const Tooltip = ({ text, className, children }) => (
  <div css={tooltipCss} className={className}>
    {children}
    <Text inline type='mini' className='tooltip_text'>{text}</Text>
  </div>
);

const tooltipCss = css`
  position: absolute;

  &:hover {
    .tooltip_text {
      visibility: visible; 
	    opacity: 1;
    }
  }

  .tooltip_text {
    visibility: hidden;
    width: 250px;
    padding: 7px;
    line-height: 1.5;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
    color: ${colors.white};
    background: ${colors.black};
    opacity: 0;
    transition: opacity 1s;
    z-index: ${zIndex.maximum};
    position: absolute;
    bottom: 100%;
    left: 15%;
  }

  .tooltip_text::after {
    position: absolute;
    content: " ";
    top: 100%;
    left: 25%;
    border-width: 10px;
    border-style: solid;
    border-color: ${colors.black} transparent transparent transparent;
  }
`;
