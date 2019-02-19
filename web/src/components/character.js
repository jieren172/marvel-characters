import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { saveAs } from 'file-saver';
import cd from 'content-disposition';
import config from '../config/index';

// jss of the component
const styles = {
  item: {
    width: 170,
  },
  image: {
    width: '100%',
    minHeight: 255,
  },
  name: {
    width: '100%',
    height: 80,
    textAlign: 'center'
  }
};


/**
 * Component of each file item
 * @extends Component
 */
class Character extends Component {

  render() {
    const { classes, className, item} = this.props;

    const { id, name, thumbnail } = item;
    return (
      <div className={`${className} ${classes.item}`}>
        <div>
          <img className={classes.image} src={thumbnail} />
        </div>
        <div className={classes.name}>{name}</div>
      </div>
    );
  }
}


export default injectSheet(styles)(Character);
