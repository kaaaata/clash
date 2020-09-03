import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { Text } from './Text';

export const Gold = ({ gold, color = 'yellow' }) => (
  <FlexContainer
    alignItems='center'
    justifyContent='flex-start'
    className='gold'
  >
    <Image
      src='gold.png'
      width={30}
      height={30}
      _css='margin-right: 10px;'
    />
    <Text color={color}>{gold}</Text>
  </FlexContainer>
);
