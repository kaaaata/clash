import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text } from '../particles';
import { effects } from '../styles';

const storyCss = css`
  ${effects.fadeIn}

  height: 100%;
  cursor: pointer;

  .text {
    animation: fadeIn 0.75s ease-out;
    padding: 50px;

    &.click_to_continue {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
`;

export const Story = ({ setScene }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  return (
    <div
      css={storyCss}
      onClick={() => step === 3
          ? dispatch(actions.setScene('character_select'))
          : setStep(step + 1)
      }
    >
      <Text type='header' centered>
        Your village is under attack by monsters!
      </Text>
      {step >= 2 && (
        <Text type='header' centered>
          Can you survive for 10 days and nights?!
        </Text>
      )}
      {step >= 3 && (
        <Text type='header' centered>
          Only time will tell!!
        </Text>
      )}
      <Text className='click_to_continue' centered>
        {'(click to continue)'}
      </Text>
    </div>
  );
};
