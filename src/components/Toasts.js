import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Text } from './particles';
import { useSelector, } from 'react-redux';
import { colors, mixins } from './styles';

const toastCss = css`
  ${mixins.keyframes('fadeOut', `
    0% { opacity: 1; width: 780px; }
    12% { opacity: 1; width: 880px; }
    25% { opacity: 1; width: 880px; }
    75% { opacity: 1; width: 880px; }
    100% { opacity: 0; width: 880px; }
  `)}

  height: 30px;
  border: 1px solid ${colors.black};
  border-radius: 15px;
  background: ${colors.white};
  box-shadow: 2px 2px 3px ${colors.black};
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);

  .text {
    line-height: 30px;
    text-align: center;
    text-shadow: none;
  }

  &.toast_animation {
    animation: fadeOut 4s;
    animation-fill-mode: forwards;
  }
`;

const resetToastAnimation = () => {
  const el = document.querySelector('.toast_animation');
  if (el) {
    el.classList.remove('toast_animation');
    void el.offsetWidth;
    el.classList.add('toast_animation');
  }
};

export const Toasts = () => {
  const { toast } = useSelector(state => ({
    toast: state.clashToast.toast,
    flipper: state.clashToast.flipper
  }),  (oldState, newState) => oldState.flipper === newState.flipper);
  // rerender whenever toast text is set, regardless of whether the text is the same.

  resetToastAnimation();

  return toast && (
    <div className='toast_animation' css={toastCss}>
      <Text type='mini' color='black'>{toast}</Text>
    </div>
  )
};
