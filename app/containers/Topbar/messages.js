/*
 * Topbar Messages
 *
 * This contains all the text for the Topbar container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Topbar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Topbar container!',
  },
});
