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
import { VIDEO, EDITOR, CONTROL } from './constants';
import Control from '../Control/Loadable';
import { selectGlobalPlaying } from '../App/selectors';

const GridItem = styled.div`
  background-color: white;
  overflow: hidden;
  width: auto;
  height: auto;
`;

const ResponsiveGridLayout = WidthProvider(Responsive);

/* eslint-disable react/prefer-stateless-function */
class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
  }

  render() {
    // {lg: layout1, md: layout2, ...}
    const layouts = {
      lg: this.props.layout.toJS(),
    };

    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        verticalCompact="false"
        rowHeight={70}
      >
        {this.props.items.valueSeq().map(item => (
          <GridItem key={toString(item.get('id'))}>
            {/* {item.get('id')} */}
            {item.get('type')}
            {this.renderContent(item)}
          </GridItem>
        ))}
      </ResponsiveGridLayout>
    );
  }

  renderContent(item) {
    const {globalPlay} = this.props;

    switch (item.get('type')) {
      case VIDEO:
        return <Player test="5" play={globalPlay} />;
      case EDITOR:
        return (
          <div>
            <textarea
              style={{
                width: '100%',
                height: '100%',
                minHeight: '300px',
                backgroundColor: '#EFEFEF',
                border: '1px solid black',
              }}
            />
          </div>
        );
      case CONTROL:
        return <Control />;
      default:
        break;
    }
  }
}

Grid.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  items: selectGridItems,
  layout: selectLayout,
  globalPlay: selectGlobalPlaying,
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
