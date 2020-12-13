import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { FlexContainer, Spacer, Text, Image } from '../particles';
import { Modal } from './Modal';

export const CreditsModal = ({ closeModal }) => {
  return (
    <Modal
      title='Credits'
      shouldCloseOnClick={false}
      isTopNavPresent={false}
      shouldShowCloseButton
      closeModal={closeModal}
      closeButtonText='Exit'
    >
      <div css={creditsModalCss}>
        <Image
          src='basic_slime.png'
          width={250}
          height={250}
        />
        <Spacer height={30} />
        <FlexContainer justifyContent='space-between'>
          <Text>Development & Design</Text>
          <Text>Catherine Han (kiteezy)</Text>
        </FlexContainer>
        <Spacer height={30} />
        <FlexContainer justifyContent='space-between'>
          <Text>Art</Text>
          <Text>Alisha Volkman</Text>
        </FlexContainer>
        <Spacer height={30} />
        <FlexContainer justifyContent='space-between'>
          <Text>Background Illustration</Text>
          <Text>PepperRaccoon</Text>
        </FlexContainer>
      </div>
    </Modal>
  );
};

const creditsModalCss = css`
  width: 600px;

  .image {
    margin: auto;
  }
`;
