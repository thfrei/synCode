/*
 * Status Messages
 *
 * This contains all the text for the Status container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Status';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Status container!',
  },
});
