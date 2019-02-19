import React, { Component } from 'react';
import injectSheet from 'react-jss';


// jss of the component
const styles = {
  topbar: {
    width: '100%',
    height: 100,
    lineHeight: '100px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  }
};

/**
 * Component of the top bar
 * @extends Component
 */
class Topbar extends Component {
  render() {
    const {classes, title} = this.props;

    return (
      <div className={classes.topbar}>
        <div className={classes.title}> {title} </div>
      </div>
    );
  }
}


export default injectSheet(styles)(Topbar);
