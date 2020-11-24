import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useState } from 'react';
// import { cards } from '../cards/cards';
import { Card } from '../card/Card';
import { FlexContainer, Spacer, Text, Image, Button } from '../particles';
import { Modal } from './Modal';

const rulesModalCss = css`
  .card_showcase {
    width: 50%;
  }

  .basics {
    .attribute {
      display: inline-block;
    }
  }

  .battle {
    .image {
      flex: none;
    }
  }

  .card_properties {
    .card_props {
      width: 50%;
    }
  }
`;

const cardPropertiesOrder = [
  'Deal attack damage to opponent',
  'Deal damage to yourself',
  'Heal (from "Heal X for each point of damage dealt")',
  'Heal (from card heal effect)',
  'Heal enemy',
  'Any special card effects not listed here',
  'Shuffle cards into enemy deck, discard, or banish',
  'Shuffle cards into your deck, discard, or banish',
  'Play copies of cards',
  'Receive temporary attribute bonus'
];
const cardPropertiesNoOrder = [
  'Starts in your hand',
  'Damage pierces shields',
  'Damage banishes',
  'Special effect triggered on discard',
  'Special effect triggered on play or discard'
];

export const RulesModal = ({ isTopNavPresent = true, closeModal }) => {
  const [page, setPage] = useState(1);

  const strength = <Image src='attack.png' width={18} height={18} className='attribute' />;
  const magic = <Image src='magic.png' width={18} height={18} className='attribute' />;
  const defense = <Image src='defense.png' width={18} height={18} className='attribute' />;

  const pages = [
    {
      title: 'Basics',
      component: (
        <div className='basics'>
          <Text type='paragraph'>
            Welcome to <span className='yellow'>Clash!</span> This is a card game where you build a deck to defeat <span className='red'>10 waves of monsters.</span> After each wave, you can spend <span className='yellow'>gold</span> to buy cards from the Shop, and use <span className='yellow'>energy</span> to power up in Town.
          </Text>

          <Spacer height={10} />

          <FlexContainer>
            <FlexContainer alignItems='center' className='card_showcase'>
              <Card cardName='Sword' />
              <Spacer width={10} />
              <Text type='paragraph'>
                This is an <span className='red'>attack card.</span><br />
                It has 3 attack, increasable with {strength} <span className='red'>strength</span>.<br />
                This card deals 3 damage, meaning<br />the opponent will discard 3 cards.
              </Text>
            </FlexContainer>
            <FlexContainer alignItems='center' className='card_showcase'>
              <Card cardName='Saber' />
              <Spacer width={10} />
              <Text type='paragraph'>
                This card has 1 defense, increasable with<br />{defense} <span className='blue'>defense</span>.<br />
                This card gives the player <span className='blue'>1 shield.</span><br />
                <span className='blue'>1 shield</span> reduces all damage taken by 1.
              </Text>
            </FlexContainer>
          </FlexContainer>

          <Spacer height={10} />

          <FlexContainer>          
            <FlexContainer alignItems='center' className='card_showcase'>
              <Card cardName='Frost' />
              <Spacer width={10} />
              <Text type='paragraph'>
                This is a <span className='violet'>magic attack</span> card.<br />
                It has 3 attack, increasable with {magic} <span className='violet'>magic</span>.<br />
                Magic attack damage is not prevented by <span className='blue'>shields.</span>
              </Text>
            </FlexContainer>
            <FlexContainer alignItems='center' className='card_showcase'>
              <Card cardName='Spearman' />
              <Spacer width={10} />
              <Text type='paragraph'>
                This is an <span className='yellow'>ally card.</span><br />
                Ally cards are powerful, but aren't buffed by<br />{strength} <span className='red'>strength</span>, {magic} <span className='violet'>magic</span>, or {defense} <span className='blue'>defense</span>.
              </Text>
            </FlexContainer>
          </FlexContainer>
        </div>
      )
    },
    {
      title: 'Battle',
      component: (
        <div className='battle'>
          <FlexContainer alignItems='center'>
            <Image src='battle_snapshot.png' width={599} height={328} />
            <Spacer width={20} />
            <Text type='paragraph'>
              This is the battle screen. Each player has a <span className='green'>deck</span>, a 3 card hand, a <span className='red'>discard pile</span>, and a <span className='greyDark'>banish pile</span>.
              <br /><br />
              Each turn, a player draws one card from their <span className='green'>deck,</span> and is able to play one card from their hand.
              <br /><br />
              <span className='yellow'>A player loses the game when they are unable to draw a card.</span>
              <br /><br />
              You can view a play-by-play of what happened last turn by clicking the <span className='green'>Last Turn's Recap</span> button.
            </Text>
          </FlexContainer>
        </div>
      )
    },
    {
      title: 'Card Properties',
      component: (
        <div className='card_properties'>
          <Text type='paragraph'>
            Each card can utilize a variety of different card properties. This is a list of all card properties in the game.
          </Text>
          <br />
          <FlexContainer>
            <div className='card_props'>
              <Text className='yellow'>Card properties which trigger in order</Text>
              <br />
              {cardPropertiesOrder.map((i, index) => (
                <Text type='paragraph' key={index}>
                  {index + 1}. {i}<br />
                </Text>
              ))}
            </div>
            <div className='card_props'>
              <Text className='yellow'>Other card properties</Text>
              <br />
              {cardPropertiesNoOrder.map((i, index) => (
                <Text type='paragraph' key={index}>
                  {index + 1}. {i}<br />
                </Text>
              ))}
            </div>
          </FlexContainer>
        </div>
      )
    }
  ];

  const navButtons = (
    <FlexContainer>
      <Button
        type='mini'
        centered
        onClick={() => setPage(page - 1)}
        isDisabled={page === 1}
      >
        Previous
      </Button>
      <Spacer width={10} />
      <Button
        type='mini'
        centered
        onClick={closeModal}
      >
        Exit
      </Button>
      <Spacer width={10} />
      <Button
        type='mini'
        centered
        onClick={() => setPage(page + 1)}
        isDisabled={page === pages.length}
      >
        Next
      </Button>
    </FlexContainer>
  );

  return (
    <Modal
      title={`Help - ${pages[page - 1].title} (${page}/${pages.length})`}
      shouldCloseOnClick={false}
      customCloseButton={navButtons}
      isTopNavPresent={isTopNavPresent}
    >
      <div css={rulesModalCss}>
        {pages[page - 1].component}
      </div>
    </Modal>
  );
};
