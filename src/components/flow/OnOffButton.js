import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

const onOffButtonCss = css`
  width: 80px;
  height: 40px;
  margin: auto;
  border-radius: 20px;
  overflow: hidden;
  display: inline-block;

  div {
    height: 100%;
  }

  .slider {
    width: 160px;
    position: relative;
    transition: margin-left 0.1s ease-out;

    .green {
      position: absolute;
      background: ${colors.green};
      width: 50%;
    }

    .red {
      position: absolute;
      left: 50%;
      background: ${colors.red};
      width: 50%;
    }
    
    .dot {
      width: 40px;
      background: ${colors.greyDark};
      position: absolute;
      left: 50%;
      border-radius: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const OnOffButton = ({ isOn, onClick }) => (
  <div css={onOffButtonCss} onClick={onClick}>
    <div className='slider' style={{ marginLeft: isOn ? '-20px' : '-60px' }}>
      <div className='green' />
      <div className='red' />
      <div className='dot' />
    </div>
  </div>
);
