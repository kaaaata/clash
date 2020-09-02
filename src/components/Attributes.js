import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer, Text } from './particles';

const attributesCss = css`
  cursor: default;
  text-align: center;

  .text {
    margin-top: 11px;
  }

  .attack {
    .text {
      margin-left: -7px;
    }
  }

  .magic {
    .text {
      margin-left: -2px;
    }
  }

  .defense {
    .text {
      margin-left: -3px;
    }
  }
`;

export const Attributes = ({ stats, statBonuses }) => {
  const attackDisplay = (
    <Image
      className='attack'
      src='/clash/attack.png'
      width={30}
      height={30}
    >
      <Text color={statBonuses.attack === 0 ? 'white' : 'green'}>
        {stats.attack + statBonuses.attack}
      </Text>
    </Image>
  );

  const magicDisplay = (
    <Image
      className='magic'
      src='/clash/magic.png'
      width={30}
      height={30}
    >
      <Text color={statBonuses.magic === 0 ? 'white' : 'green'}>
        {stats.magic + statBonuses.magic}
      </Text>
    </Image>
  );

  const defenseDisplay = (
    <Image
      className='defense'
      src='/clash/defense.png'
      width={30}
      height={30}
    >
      <Text color={statBonuses.defense === 0 ? 'white' : 'green'}>
        {stats.defense + statBonuses.defense}
      </Text>
    </Image>
  );

  return (
    <FlexContainer
      className='attributes'
      justifyContent='space-between'
      css={attributesCss}
    >
      {attackDisplay}
      {magicDisplay}
      {defenseDisplay}
    </FlexContainer>
  );
};
