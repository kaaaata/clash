import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useEffect, useState } from 'react';
import { preloadedImages } from './imagesToPreload';
import { Text } from './particles';
import { colors } from './styles';

// spinner css credits to https://loading.io/css/

export const ImagePreloadingSpinner = () => {
  const [areImagesLoading, setAreImagesLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let timeElapsed = 0;
    const interval = setInterval(() => {
      timeElapsed += 250;
      let numImagesLoaded = 0;
      preloadedImages.forEach(image => {
        if (image.complete) {
          numImagesLoaded++;
        }
      });
      if (numImagesLoaded === preloadedImages.length) {
        clearInterval(interval);
        setAreImagesLoading(false);
      }
      if (timeElapsed >= 10000) {
        clearInterval(interval);
        setIsError(true);
      }
    }, 500);
  }, []);

  return (
    <div
      css={imagePreloadingSpinnerCss}
      className={`${areImagesLoading ? '' : 'done'} ${isError ? 'error' : ''}`}
    >
      <Text inline>
        {isError
          ? <span className='red'>Asset loading error. Try reloading.</span>
          : areImagesLoading
            ? 'Loading assets'
            : <span className='green'>Assets loaded.</span>
        }
      </Text>
      <div className='lds-dual-ring' />
    </div>
  );
};

const imagePreloadingSpinnerCss = css`
  position: absolute;
  right: 60px;
  top: 20px;
  transition: opacity 0.75s ease-out;
  opacity: 1;

  &.done {
    .lds-dual-ring:after {
      animation: none;
      opacity: 0;
    }
  }

  &.error {
    .lds-dual-ring:after {
      animation: none;
      border-color: ${colors.red} transparent ${colors.red} transparent;
    }
  }

  .lds-dual-ring {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-bottom: 5px;
    margin-left: 7px;
  }

  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 28px;
    height: 28px;
    margin: 8px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
