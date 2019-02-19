import React, {Component} from 'react';
import injectSheet from 'react-jss';

import Topbar from '../components/topbar';
import Trombinoscope from '../components/trombinoscope';


// jss of the component
const styles = {
  all: {
    fontFamily: 'BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Helvetica Neue"',
  },
  content: {
    // height: '100%',
    width: '100%',
    position: 'absolute',
    borderTop: '1px solid',
    top: 100,
    bottom: 0,
    overflow: 'hidden',
    overflowY: 'auto',
  },
};

/**
 * Container component for the layout of the page
 * @extends Component
 */
class Layout extends Component {

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.all}>
        <div>
          <Topbar title="Marvel characters"/>
        </div>
        <div className={classes.content}>
          <Trombinoscope />
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(Layout);
