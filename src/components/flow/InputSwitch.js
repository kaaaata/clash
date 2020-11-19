import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Text, Input } from '../particles';
import { OnOffButton } from './OnOffButton';

const inputSwitchCss = css`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 10px;

  .text {
    margin-right: 25px;
  }

  input {
    margin-right: 25px;
  }
`;

export const InputSwitch = ({
  name,
  description,
  type = 'string' // 'string'|'number'
}) => {
  const [isOn, setIsOn] = useState(
    JSON.parse(window.localStorage.getItem(`clash_${name}_toggle`)) || false
  );
  const [inputText, setInputText] = useState(
    JSON.parse(window.localStorage.getItem(`clash_${name}_value`)) || ''
  );

  return (
    <div css={inputSwitchCss}>
      <Text>{description}</Text>
      <Input value={inputText} onChange={e => {
        const newText = e.target.value;
        setInputText(newText);
        setIsOn(false);
        window.localStorage.setItem(`clash_${name}_toggle`, JSON.stringify(false));
        window.localStorage.setItem(
          `clash_${name}_value`,
          JSON.stringify(type === 'string' ? newText : parseInt(newText)));
      }} />
      <OnOffButton isOn={isOn} onClick={() => {
        window.localStorage.setItem(`clash_${name}_toggle`, JSON.stringify(!isOn));
        setIsOn(!isOn);
      }} />
    </div>
  );
};
