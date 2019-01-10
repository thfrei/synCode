/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Material UI Theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
// generated ones via https://www.favicon-generator.org/
// import '!file-loader?name=[name].[ext]!./images/apple-icon-57x57.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-60x60.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-72x72.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-76x76.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-114x114.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-120x120.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-144x144.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-152x152.png';
// import '!file-loader?name=[name].[ext]!./images/apple-icon-180x180.png';
// import '!file-loader?name=[name].[ext]!./images/android-icon-192x192.png';
// import '!file-loader?name=[name].[ext]!./images/favicon-32x32.png';
// import '!file-loader?name=[name].[ext]!./images/favicon-96x96.png';
// import '!file-loader?name=[name].[ext]!./images/favicon-16x16.png';
// import '!file-loader?name=[name].[ext]!./images/manifest.json';
// end generated icons


import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Material UI
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#03a9f4',
    },
  },
  
  typography: {
    useNextVariants: true,
  },
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </MuiThemeProvider>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
