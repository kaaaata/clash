import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Text } from '../particles';
import { OnOffSwitch } from './OnOffSwitch';
import { InputSwitch } from './InputSwitch';

const flowCss = css`
  margin: 40px;
`;

export const Flow = () => (
  <div css={flowCss}>
    <Text type='title'>Flow</Text>
    <Spacer height={40} />
    <OnOffSwitch name='isFlowEnabled' description='Is Flow enabled?' />
    <OnOffSwitch name='skipIntro' description='Skip intro & character select?' />
    <InputSwitch name='gold' description='Starting gold:' type='number' />
  </div>
);
