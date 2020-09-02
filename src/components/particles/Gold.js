import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { Text } from './Text';

export const Gold = ({ gold, color = 'yellow' }) => (
  <FlexContainer alignItems='center' justifyContent='center' className='gold'>
    <Image
      src='/clash/gold.png'
      width={24}
      height={24}
      _css='margin-right: 10px;'
    />
    <Text color={color}>{gold}</Text>
  </FlexContainer>
);
