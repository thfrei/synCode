/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Grid from '../Grid';

// Material UI Theme
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import GlobalStyle from '../../global-styles';

export default function App() {

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

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet
        titleTemplate="%s - synCode"
        defaultTitle="Home"
      >
        <meta name="description" content="synCode - Encode video" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route path="/" component={Grid} />
        {/* <Route path="" component={NotFoundPage} /> */}
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </MuiThemeProvider>
  );
}
