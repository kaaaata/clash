import { useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import { Image, Spacer, FlexContainer, Text, Button } from '../particles';
import { characters } from './characters';
import { Card, cardWidth, cardHeight } from '../card/Card';
import * as actions from '../../stores/actions';
import { createNewCard } from '../../cards/createNewCard';

export const CharacterSelect = () => {
  const dispatch = useDispatch();
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  
  const { name, image, startingCards, specialAbility } = characters[selectedCharIndex];

  const continueOnClick = ({ name, image, startingCards, specialAbility }) => {
    dispatch(actions.setPlayer({ name, image, specialAbility }));
    dispatch(actions.addCardsToCollection(startingCards.map(i => createNewCard(i))));
    dispatch(actions.setScene('town'));
  };

  useEffect(() => {
    if (window.flow.skipIntro_toggle) {
      const character = characters.filter(
        i => i.name === (window.flow.skipIntro_value || 'Paladin')
      )[0];
      continueOnClick(character);
    }
  })

  return (
    <div css={characterSelectCss}>
      <Spacer height={20} />
      <Text type='title' centered>Character Selection</Text>
      <Spacer height={40} />

      <div className='showcase'>
        <FlexContainer justifyContent='center'>
          <Image
            src={`${image}.png`}
            width={cardWidth * 2}
            height={cardHeight * 2}
            size='contain'
            className='showcase_image'
          />
          <FlexContainer flexDirection='column'>
            <Text type='header'>{name}</Text>
            <Spacer height={30} />
            <Text>Additional starting cards:&nbsp;</Text>
            <Spacer height={5} />
            <FlexContainer className='cards'>
              {startingCards.map((cardName, index) => (
                <Card key={index} cardName={cardName} />
              ))}
            </FlexContainer>
            <Spacer height={30} />
            <Button
              type='mini'
              centered
              onClick={() => continueOnClick(characters[selectedCharIndex])}
            >
             Play as {name}
            </Button>
            <Spacer height={10} />
          </FlexContainer>
          <FlexContainer flexDirection='column' className='special_ability_section'>
            <Text type='header'>&nbsp;</Text>
            <Spacer height={30} />
            <Text>
              Special ability:&nbsp;
              <span css={css`color: ${specialAbility.color}`}>{specialAbility.name}</span>
            </Text>
            <Spacer height={20} />
            <Text type='paragraph'>{specialAbility.description} ({specialAbility.uses} {specialAbility.uses === 1 ? 'use' : 'uses'} per battle)</Text>
          </FlexContainer>
        </FlexContainer>
      </div>

      <Spacer height={20} />

      <FlexContainer className='thumbnails' justifyContent='center'>
        {characters.map((i, index) => (
          <div key={i.name} className='thumbnail'>
            <Image
              src={`${i.image}.png`}
              width={cardHeight / 2}
              height={cardHeight / 2}
              onMouseEnter={() => setSelectedCharIndex(index)}
              size='contain'
            />
          </div>
        ))}
      </FlexContainer>
    </div>
  );
};

const characterSelectCss = css`
  .showcase {
    .showcase_image {
      margin-right: 20px;
    }

    .card {
      margin-right: 7px;
  
      &:last-child {
        margin-right: 0;
      }
    }

    .special_ability_section {
      margin-left: 20px;
      width: 350px;
    }
  }

  .thumbnails {
    .thumbnail {
      box-sizing: content-box;
      cursor: pointer;
      border-radius: 3px;
      margin: 0 5px;

      .image {
        transform-origin: bottom;
        transition: transform 0.25s ease-out;
      }

      &:hover {
        .image {
          transform: scale(1.15);
        }
      }
    }
  }
`;
