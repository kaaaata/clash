import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { Text } from './Text';

const buttonTypeWidths = {
  default: '100%',
  mini: '200px',
  'fit-content': 'fit-content'
};

export const Button = ({
  onClick,
  onMouseEnter,
  type = 'default', // 'default'|'mini'|'fit-content'
  isDisabled = false,
  textProps = {},
  className = '',
  _css = '',
  children
}) => (
  <button
    onClick={isDisabled ? null : onClick}
    onMouseEnter={onMouseEnter}
    className={`button ${className}`}
    css={css`
      background: ${isDisabled ? colors.greyDark : colors.slateLight};
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      border: none;
      outline: none;
      width: ${buttonTypeWidths[type]};
      color: ${colors.white};
      cursor: ${isDisabled ? 'default' : 'pointer'};
  
      &:hover {
        ${isDisabled ? '' : `background: ${colors.slate};`}
      }

      ${_css}
    `}
  >
    <Text
      type='small'
      centered
      inline
      {...textProps}
    >
      {children}
    </Text>
  </button>
);
