/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

import styled from 'styled-components';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectGrid from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import { Player } from '../../components/Player';

const GridItem = styled.div`
  background-color: white;
`;

const ResponsiveGridLayout = WidthProvider(Responsive);

/* eslint-disable react/prefer-stateless-function */
class Grid extends React.Component {
  render() {
    // {lg: layout1, md: layout2, ...}
    const layouts = [
      { i: 'a', x: 0, y: 4, w: 5, h: 3, static: true },
      { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'ff', x: 4, y: 0, w: 1, h: 2 },
    ];
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        // breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        // cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        // verticalCompact="false"
        // rowHeight={30}
      >
        <GridItem key="ff" data-grid={{x: 2, y: 2, w: 3, h: 2}}>
          {/* <Player /> */}
        </GridItem>
        <GridItem key="b">asdf</GridItem>
        <GridItem key="c">3</GridItem>
      </ResponsiveGridLayout>
    );
  }
}

Grid.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  grid: makeSelectGrid(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'grid', reducer });
const withSaga = injectSaga({ key: 'grid', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Grid);
