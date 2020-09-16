import { useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Modal } from './Modal';
import { FlexContainer, Image, Button, Text } from '../particles';
import { effects } from '../styles';

const eventModalPageCss = css`
  flex-grow: 1;

  button {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .event_modal--fade_in {
    opacity: 0;
    transition: opacity 1s ease-out;
    pointer-events: none;
  }
`;
const eventModalCss = css`
  ${effects.fadeIn};
  width: 100%;
  padding: 0 50px;

  .main_image {
    border-radius: 5px;
    animation: fadeIn 1s ease-out;
  }
`;

export const EventModalPage = ({
  page, // Number
  text, // String|Node
  options /* [
    text:String|Node,
    options:[{
      name:String,
      isDisabled: bool,
      greenText:String,
      redText:String,
      redTextFirst: bool,
      onClick:Func
    }]
  }] */
}) => {
  useEffect(() => {
    // need this garbage to properly restart animation
    let interval;
    let counter = page === 1 ? -1 : 0; // wait 250ms for EventModal .main_image fadeIn on 1st page
    interval = setInterval(() => {
      if (counter !== -1) {
        const el = document.getElementsByClassName('event_modal--fade_in')[counter];
        if (!el) {
          return clearInterval(interval);
        }
        el.style.opacity = 1;
        el.style.pointerEvents = 'unset';
      }
      counter++;
    }, 250);
  });

  return (
    <FlexContainer
      key={page}
      flexDirection='column'
      justifyContent='space-between'
      _css={eventModalPageCss}
    >
      <Text type='paragraph' className='event_modal--fade_in'>
        {text}
      </Text>
      <div>
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={option.onClick}
            isDisabled={option.isDisabled}
            className='event_modal--fade_in'
          >
            [{option.name}]
            {option.redTextFirst
              ? <span className='red'> {option.redText}</span>
              : <span className='green'> {option.greenText}</span>
            }
            {option.redTextFirst
              ? <span className='green'> {option.greenText}</span>
              : <span className='red'> {option.redText}</span>
            }
          </Button>
        ))}
      </div>
    </FlexContainer>
  );
};

export const EventModal = ({
  title,
  image,
  imageContainerCss = '',
  imageComponentOverride = null,
  children // <EventModalPage>
}) => (
  <Modal halfModal title={title}>
    <FlexContainer justifyContent='flex-start' _css={eventModalCss}>
      <div css={css`${imageContainerCss} flex: none; margin-right: 30px;`}>
        {imageComponentOverride || (
          <Image
            src={`${image}.png`}
            height={300}
            width={300}
            size='contain'
            className='main_image'
          />
        )}
      </div>
      {children}
    </FlexContainer>
  </Modal>
);
