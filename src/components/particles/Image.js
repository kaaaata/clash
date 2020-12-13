import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

export const Image = (props) => {
  const {
    src,
    width,
    height,
    size = 'cover',
    circular,
    rgbaFilter,
    external = false,
    className = '',
    filter,
    _css = '',
    onClick,
    onMouseEnter,
    children
  } = props;

  const widthCss = mq.genResponsiveCss('width', width);
  const heightCss = mq.genResponsiveCss('height', height);
  const linearGradientCss = rgbaFilter ? `linear-gradient(${rgbaFilter}, ${rgbaFilter}), ` : '';
  const url = `${external ? '' : 'assets/'}${src}`;

  const imageCss = css`
    ${children ? `
      background: ${linearGradientCss}url("${url}") no-repeat center center;
      background-size: ${size};
      ${widthCss}
      ${heightCss}
    ` : `
      display: block;
      object-fit: ${size};
    `
    }
    
    ${circular ? 'border-radius: 50%;' : ''}
    ${onClick ? 'cursor: pointer;' : ''}
    ${filter ? `filter: ${filter};` : ''}

    ${_css}
  `;

  return children ? (
    <div
      className={`image ${className}`}
      css={imageCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  ) : (
    <img
      src={url}
      width={width}
      height={height}
      alt={url}
      className={`image ${className}`}
      css={imageCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    />
  );
};
