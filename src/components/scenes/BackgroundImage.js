import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image } from '../particles';
import { useSelector, shallowEqual } from 'react-redux'

// index = energy
const rgbaFiltersByEnergy = [
  'rgba(0, 0, 0, 0.12)',
  'rgba(0, 0, 0, 0.09)',
  'rgba(0, 0, 0, 0.06)',
  'rgba(0, 0, 0, 0.03)',
  'rgba(0, 0, 0, 0)',
  'rgba(255, 255, 255, 0.03)',
  'rgba(255, 255, 255, 0.06)',
  'rgba(255, 255, 255, 0.09)',
  'rgba(255, 255, 255, 0.12)',
  'rgba(255, 255, 255, 0.15)',
  'rgba(255, 255, 255, 0.18)'
];

const backgroundImageCss = css`
  position: absolute;
`;

const sceneToBackgroundImage = {

};

export const BackgroundImage = () => {
  const { scene, energy } = useSelector(state => ({
    scene: state.clashScene.scene,
    energy: state.clashTown.energy
  }), shallowEqual);

  return (
    <Image
      src={`${sceneToBackgroundImage[scene] || 'landscape'}.png`}
      width={1200}
      height={700}
      rgbaFilter={rgbaFiltersByEnergy[energy]}
      css={backgroundImageCss}
    />
  );
};
