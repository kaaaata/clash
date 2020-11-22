import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

export const Spacer = React.memo(
  ({ height, width }) => (
    <div css={css`
      ${height ? 'width: 100%;' : 'height: 100%;'}
      ${height ? mq.genResponsiveCss('height', height) : mq.genResponsiveCss('width', width)}
    `} />
  )
);
