import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, Image, FlexContainer, Text } from '../particles';

const townActionCardCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: transform 0.1s ease-out;

  &:hover {
    transform: scale(1.25);
  }

  &.disabled {
    opacity: 0.35;
    pointer-events: none;

    &:hover {
      transform: none;
    }
  }

  .energy {
    margin-left: 3px;
  }
`;

export const TownActionCard = ({
  image,
  name,
  energy,
  isDisabled,
  canAfford,
  onMouseEnter,
  onClick
}) => {
  return (
    <Image
      src='frame.png'
      width={150}
      height={200}
      rgbaFilter='rgba(0, 0, 0, 0.3)'
      css={townActionCardCss}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={isDisabled ? 'disabled' : ''}
    >
      <Image
        src={`${image}.png`}
        width={100}
        height={100}
        size='contain'
      />
      <Spacer height={5} />
      <Text type='small'>{name}</Text>
      <Spacer height={10} />
      <FlexContainer justifyContent='center' alignItems='center'>
        <Text type='header' color={canAfford ? 'yellow' : 'red'}>
          {energy}
        </Text>
        <Image
          src='energy.png'
          width={35}
          height={40}
          className='energy'
        />
      </FlexContainer>
    </Image>
  );
};
