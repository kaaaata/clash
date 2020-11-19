import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Text } from '../particles';
import { OnOffButton } from './OnOffButton';

const onOffSwitchCss = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 10px;

  .text {
    margin-right: 25px;
  }
`;

export const OnOffSwitch = ({ name, description }) => {
  const [isOn, setIsOn] = useState(JSON.parse(window.localStorage.getItem(`clash_${name}`)));

  return (
    <div css={onOffSwitchCss}>
      <Text>{description}</Text>
      <OnOffButton isOn={isOn} onClick={() => {
        window.localStorage.setItem(`clash_${name}`, JSON.stringify(!isOn));
        setIsOn(!isOn);
      }} />
    </div>
  );
};
