import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer, Text, Button, FlexItem } from '../particles';
import { colors } from '../styles';

export const Modal = ({
  title, // String|Node
  halfModal = false,
  transparent = true,
  closeModal,
  shouldCloseOnClick = true,
  shouldShowCloseButton = false,
  closeButtonText = 'Back',
  customCloseButton = null,
  isTopNavPresent = true,
  children
}) => {
  const modalTitle = title && (
    <Text type='header'>
      {title}
      <Spacer height={30} />
    </Text>
  );

  const closeButton = !halfModal && shouldShowCloseButton && closeModal && (
    <Button type='mini' onClick={closeModal} centered>{closeButtonText}</Button>
  );

  const modal = (
    <div
      css={modalCss(isTopNavPresent)}
      className={`modal ${halfModal ? 'half_modal' : ''} ${transparent ? 'transparent' : ''}`}
      onClick={shouldCloseOnClick ? closeModal : undefined}
    >
      <FlexContainer alignItems='center' flexDirection='column' className='modal_content_container'>
        {modalTitle}
        <FlexItem className='modal_children_container'>{children}</FlexItem>
        {customCloseButton || closeButton}
      </FlexContainer>
    </div>
  );

  return halfModal ? (
    <div css={unclickableAreaCss(isTopNavPresent)} onClick={closeModal}>
      {modal}
    </div>
  ) : modal;
};

const unclickableAreaCss = (isTopNavPresent) => css`
  position: absolute;
  width: 100%;
  height: calc(100% - ${isTopNavPresent ? '40px' : '0px'});
  bottom: 0;
`;
const modalCss = (isTopNavPresent) => css`
  position: absolute;
  width: 100%;
  height: calc(100% - ${isTopNavPresent ? '40px' : '0px'});
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  font-size: 20px;
  padding: 40px 60px;

  .modal_content_container {
    height: 100%;
  }

  &.half_modal {
    height: unset;
    bottom: 17%;
    box-shadow: 4px 4px 8px ${colors.black};
    border-top: 3px solid ${colors.yellow};
    border-bottom: 3px solid ${colors.yellow};

    .modal_children_container {
      height: 300px;
      width: 100%;
    }
  }

  &.transparent {
    background: rgba(0, 0, 0, 0.9);
  }
`;
