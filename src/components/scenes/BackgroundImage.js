import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image } from '../particles';
import { useSelector, shallowEqual } from 'react-redux'

const rgbaFiltersByEnergy = [
  'rgba(0, 0, 0, 0.16)',
  'rgba(0, 0, 0, 0.12)',
  'rgba(0, 0, 0, 0.08)',
  'rgba(0, 0, 0, 0.04)',
  'rgba(0, 0, 0, 0)',
  'rgba(255, 255, 255, 0.04)',
  'rgba(255, 255, 255, 0.08)',
  'rgba(255, 255, 255, 0.12)',
  'rgba(255, 255, 255, 0.16)',
  'rgba(255, 255, 255, 0.2)',
  'rgba(255, 255, 255, 0.24)'
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
