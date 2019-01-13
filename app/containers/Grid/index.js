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

import Paper from '@material-ui/core/Paper';

import { HotKeys } from 'react-hotkeys'

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { selectGridItems, selectLayout } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import { Player } from '../../components/Player';
import { VIDEO, EDITOR, CONTROL, AUDIO } from './constants';
import Control from '../Control';
import SidebarSettings from '../SidebarSettings';
import Topbar from '../Topbar';
import Editor from '../Editor';
import { selectGlobalPlaying, selectGlobalSetTime, selectGlobalMasterTime } from '../App/selectors';
import { updateOffset } from './actions';
import { togglePlay, syncSetAndMasterTime, masterTimeMinus, updateText } from '../App/actions';
import { insertAtCaret, formatVideoTime } from '../../utils/misc';
import { GLOBAL_EDITOR_ID } from '../Editor/constants';

const GridItem = styled(Paper)`
  overflow: hidden;
  width: auto;
  height: auto;
  display: block;
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

    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const x = w.innerWidth || e.clientWidth || g.clientWidth;
    const y = w.innerHeight || e.clientHeight || g.clientHeight;
    const rowHeight = parseInt(y / 13, 10) || 70;

    const map = {
      'play': 'alt+p',
      'minus2': 'alt+h',
      'plus2': 'alt+l',
      'insertTime': 'alt+j',
      'sync': 'alt+s',
    };

    const handlers = {
      'play': () => this.props.dispatch(togglePlay()),
      'minus2': () => this.props.dispatch(masterTimeMinus(2)),
      'plus2': () => this.props.dispatch(masterTimeMinus(-2)),
      'insertTime': () => insertAtCaret(GLOBAL_EDITOR_ID, formatVideoTime(this.props.masterTime, false)),
      'sync': () => this.props.dispatch(syncSetAndMasterTime()),
    }

    return (
      <HotKeys keyMap={map} handlers={handlers}>
        {/* <Topbar /> */}
        <SidebarSettings />
        <Paper>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            verticalCompact="false"
            rowHeight={rowHeight}
          >
            {this.props.items.valueSeq().map(item => (
              <GridItem key={toString(item.get('id'))}>
                {this.renderContent(item)}
              </GridItem>
            ))}
          </ResponsiveGridLayout>
        </Paper>

      </HotKeys>
    );
  }

  renderContent(item) {
    const { globalPlay, setTime, ...rest } = this.props;

    switch (item.get('type')) {
      case VIDEO:
      case AUDIO:
        return (
          <Player
            test="5"
            play={globalPlay}
            setTime={setTime}
            item={item}
            {...rest}
          />
        );
      case EDITOR:
        return (
          <Editor />
        );
      case CONTROL:
        return <Control />;
      // case AUDIO:
      //   return <AudioPlayer play={globalPlay} setTime={setTime} item={item} offset={item.get('offset')} {...rest}  />;
      default:
        break;
    }
  }
}

Grid.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    items: selectGridItems,
    layout: selectLayout,
    globalPlay: selectGlobalPlaying,
    setTime: selectGlobalSetTime,
    masterTime: selectGlobalMasterTime,
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateOffset: (id, time) => dispatch(updateOffset(id, time)),
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
