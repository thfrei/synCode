/**
 *
 * Asynchronously loads the component for Control
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
