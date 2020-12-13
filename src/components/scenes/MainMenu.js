import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text, Spacer, YellowUnderlineText } from '../particles';
import { RulesModal } from '../modals/RulesModal';
import { CreditsModal } from '../modals/CreditsModal';
import { ImagePreloadingSpinner } from '../ImagePreloadingSpinner';
import { CardViewModal } from '../modals/CardViewModal';
import { blueprints } from '../../cards/blueprints';

export const MainMenu = () => {
  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (window.flow.skipIntro_toggle) {
      dispatch(actions.setScene('character_select'))
    }
  });

  return (
    <div css={mainMenuCss}>
      <Spacer height={90} />
      <Text type='title' centered>Clash</Text>
      <Spacer height={30} />
      <Text centered>A game by kiteezy</Text>
      <div className='menu'>
        <YellowUnderlineText onClick={() => dispatch(actions.setScene('story'))}>
          Play
        </YellowUnderlineText>
        <Spacer height={10} />
        <YellowUnderlineText onClick={() => setActiveModal('help')}>
          Help
        </YellowUnderlineText>
        <Spacer height={10} />
        <YellowUnderlineText onClick={() => setActiveModal('gallery')}>
          Card Gallery
        </YellowUnderlineText>
        <Spacer height={10} />
        <YellowUnderlineText onClick={() => setActiveModal('credits')}>
          Credits
        </YellowUnderlineText>
      </div>

      <ImagePreloadingSpinner />

      {activeModal === 'help' && (
        <RulesModal
          isTopNavPresent={false}
          closeModal={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'gallery' && (
        <CardViewModal
          title='Card Gallery'
          cardNames={blueprints.allCardsArray.map(card => card.name)}
          closeModal={() => setActiveModal(false)}
          isTopNavPresent={false}
        />
      )}

      {activeModal === 'credits' && (
        <CreditsModal closeModal={() => setActiveModal(null)} />
      )}
    </div>
  );
};

const mainMenuCss = css`
  .menu {
    position: absolute;
    left: 100px;
    top: 350px;

    & > div {
      margin-bottom: 15px;
    }
  }
`;
