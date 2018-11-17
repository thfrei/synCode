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

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
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
    </div>
  );
}
