import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Text } from '../particles';
import { OnOffSwitch } from './OnOffSwitch';
import { InputSwitch } from './InputSwitch';

const flowCss = css`
  margin: 40px;

  .input {
    width: 200px;
  }
`;

export const Flow = () => (
  <div css={flowCss}>
    <Text type='title'>Flow</Text>
    <Spacer height={40} />
    <OnOffSwitch name='isFlowEnabled' description='Is Flow enabled?' />
    <OnOffSwitch name='skipIntro' description='Skip intro & character select?' />
    <OnOffSwitch name='skipToBattle' description='Skip straight to battle when in town?' />
    <InputSwitch name='testTownEvent' description='Render this town event when in town:' type='string' />
    <InputSwitch name='gold' description='Starting gold:' type='number' />
    <InputSwitch name='energy' description='Starting energy:' type='number' />
    <InputSwitch name='energyReserved' description='Energy reserved:' type='number' />
    <InputSwitch name='day' description='Starting day:' type='number' />
    <InputSwitch name='lives' description='Starting lives:' type='number' />
    <InputSwitch name='monsterOverride1' description='Wave 1-3 monster override:' type='string' />
    <InputSwitch name='monsterOverride2' description='Wave 4-6 monster override:' type='string' />
    <InputSwitch name='monsterOverride3' description='Wave 7-9 monster override:' type='string' />
  </div>
);
