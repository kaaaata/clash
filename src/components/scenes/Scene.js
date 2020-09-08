import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { MainMenu } from './MainMenu';
import { Story } from './Story';
import { Town } from '../town/Town';
import { CharacterSelect } from './CharacterSelect';
import { Battle } from '../battle/Battle';
import { Spacer } from '../particles';
import { useSelector, shallowEqual } from 'react-redux';

const sceneCss = css`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const Scene = () => {
  const { scene } = useSelector(state => ({
    scene: state.clashScene.scene
  }), shallowEqual);

  let sceneComponent;
  switch (scene) {
    case 'battle':
      sceneComponent = <Battle />;
      break;
    case 'story':
      sceneComponent = <Story />;
      break;
    case 'character_select':
      sceneComponent = <CharacterSelect />;
      break;
    case 'main_menu':
      sceneComponent = <MainMenu />;
      break;
    case 'town':
      sceneComponent = <Town />;
      break
    default:
      sceneComponent = null;
      break;
  }

  return (
    <div css={sceneCss}>
      <Spacer height={40} />
      {sceneComponent}
    </div>
  );
};
