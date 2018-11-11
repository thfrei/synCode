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
import { toString } from 'lodash';

import styled from 'styled-components';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectGridItems, selectLayout } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import { Player } from '../../components/Player';

const GridItem = styled.div`
  background-color: white;
  overflow: hidden;
  width: auto;
  height: auto;
`;

const ResponsiveGridLayout = WidthProvider(Responsive);

/* eslint-disable react/prefer-stateless-function */
class Grid extends React.Component {
  render() {
    // {lg: layout1, md: layout2, ...}
    const layouts = {
      lg: this.props.layout.toJS(),
    };

    console.log(this.props.items);
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        verticalCompact="false"
        rowHeight={70}
      >
        {
          this.props.items.valueSeq().map(item => (
            <GridItem key={toString(item.get('id'))}>{item.get('id')}</GridItem>
          ))
        }
      </ResponsiveGridLayout>
    );
  }
}

Grid.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  items: selectGridItems,
  layout: selectLayout,
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
