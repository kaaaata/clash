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

export const WinScreen = ({ setScene }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  return (
    <div
      css={storyCss}
      onClick={() => step === 3
        ? dispatch(actions.resetGame())
        : setStep(step + 1)
      }
    >
      <Text type='header' centered>
        Congratulations!
      </Text>
      {step >= 2 && (
        <Text type='header' centered>
          You survived 10 days and nights, and defeated the evil Dragon.
        </Text>
      )}
      {step >= 3 && (
        <Text type='header' centered>
          Thanks for playing. I really do appreciate it. -Cat
        </Text>
      )}
      <Text className='click_to_continue' centered>
        {'(click to continue)'}
      </Text>
    </div>
  );
};
