import { css } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';

export const _cardCss = (rarityColor) => css`
  position: absolute;
  width: 100%;
  height: 100%;
  text-shadow: 2px 2px 4px ${colors.black};
  border: 2px solid ${rarityColor};
  border-radius: 5px;

  .name {
    color: ${rarityColor};
    text-align: center;
    padding: 2px;
    font-size: 12px;
  }

  .image_container {
    display: flex;
    justify-content: center;
    position: relative;
    background: rgba(255, 255, 255, 0.25);

    .attack, .defense {
      font-size: 24px;
      position: absolute;
      left: 5px;
      top: 5px;
      text-align: center;

      .number {
        margin-top: 8px;
        margin-left: -4px;
      }

      &.defense {
        left: unset;
        right: 5px;

        .number {
          margin-left: 0;
        }
      }
    }
  }

  .border {
    height: 2px;
    background: ${rarityColor};
  }

  .flair {
    font-size: 10px;
    padding: 2px 5px;

    .rarity {
      color: ${rarityColor};
    }
  }

  .description {
    font-size: 10px;
    padding: 4px 5px;
    position: relative;
  }
`;
