import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { Text } from './Text';

export const YellowUnderlineText = ({ onClick, children }) => (
  <div
    css={css`
      position: relative;
      width: fit-content;
      cursor: pointer;
    
      .underline {
        position: absolute;
        height: 4px;
        width: ${onClick ? 0 : 100}%;
        transition: width 0.3s ease-out;
        background: ${colors.yellow};
      }
      
      &:hover {
        .underline {
          width: 100%;
        }
      }
    `}
    onClick={onClick}
  >
    <Text type='header'>{children}</Text>
    <div className='underline' />
  </div>
);
