import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer, Text } from '../particles';
import { colors } from '../styles';

const unclickableAreaCss = css`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  bottom: 0;
`;
const modalCss = css`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  font-size: 20px;
  padding: 30px 60px;

  &.half_modal {
    height: 70%;
    transform: translateY(-22%);
    box-shadow: 4px 4px 8px ${colors.black};
    border-top: 3px solid ${colors.yellow};
    border-bottom: 3px solid ${colors.yellow};
  }

  &.transparent {
    background: rgba(0, 0, 0, 0.9);
  }
`;

export const Modal = ({
  title, // String|Node
  halfModal = false,
  transparent = true,
  closeModal,
  children
}) => {
  const modalTitle = title && (
    <Text type='header'>
      {title}
      <Spacer height={30} />
    </Text>
  );

  const modal = (
    <div
      css={modalCss}
      className={`modal ${halfModal ? 'half_modal' : ''} ${transparent ? 'transparent' : ''}`}
      onClick={closeModal}
    >
      <FlexContainer alignItems='center' flexDirection='column'>
        {modalTitle}
        {children}
      </FlexContainer>
    </div>
  );

  return halfModal ? (
    <div css={unclickableAreaCss} onClick={closeModal}>
      {modal}
    </div>
  ) : modal;
};
