import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { Text } from '../particles';

const onOffSwitchCss = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 10px;

  .text {
    margin-right: 25px;
  }

  .button {
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
  }
`;

export const OnOffSwitch = ({ name, description }) => {
  const [isOn, setIsOn] = useState(JSON.parse(window.localStorage.getItem(`clash_${name}`)));

  return (
    <div css={onOffSwitchCss}>
      <Text>{description}</Text>

      <div className='button' onClick={() => {
        window.localStorage.setItem(`clash_${name}`, JSON.stringify(!isOn));
        setIsOn(!isOn);
      }}>
        <div className='slider' style={{ marginLeft: isOn ? '-20px' : '-60px' }}>
          <div className='green' />
          <div className='red' />
          <div className='dot' />
        </div>
      </div>
    </div>
  );
};
