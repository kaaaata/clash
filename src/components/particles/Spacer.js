import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

export const Spacer = React.memo(
  ({ height }) => (
    <div css={css`
      width: 100%;
      ${mq.genResponsiveCss('height', height)}
    `} />
  )
);
