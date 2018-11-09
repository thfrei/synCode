/*
 * Player Messages
 *
 * This contains all the text for the Player component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Player';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Player component!',
  },
});
