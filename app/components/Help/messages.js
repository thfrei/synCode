/*
 * Help Messages
 *
 * This contains all the text for the Help component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Help';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Help component!',
  },
});
