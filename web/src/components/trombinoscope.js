import React, { Component } from 'react';
import urlJoin from 'url-join';
import injectSheet from 'react-jss';
import Character from './character';
import config from '../config/index';


// jss of the component
const styles = {
  wrap: {
    paddingBottom: 50,
  },
  content: {
    overflow: 'hidden',
    padding: 10,
    marginBottom: 50,
  },
  item: {
    float: 'left',
    margin: 5,
  },
  loading: {
    textAlign: 'center'
  },
  loader: {
    marginTop: 30,
    fontSize: 40,
  },
  loadMore: {
    border: '1px solid black',
    lineHeight: '89px',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    width: 200,
    margin: '0 auto',
    height: 89,
    cursor: 'pointer'
  }
};

/**
 * Component to contain all file items
 * @extends Component
 */
class Trombinoscope extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      offset: 0,
    };
  }

  /**
   * Get characters list from api
   * @return {Promise}
   */
  async getCharacters () {
    this.setState({loading: true});
    const response = await fetch(
      urlJoin(
        config.apiEndpoint,
        'api/characters',
        `?offset=${this.state.offset}`,
        `&limit=${config.apiLimit}`
      ), {
      crossDomain: true,
      mode: 'cors',
    });
    if(response.ok) {
      const res = await response.json();
      console.log('data fetch result:', res);

      // merge and just in case of duplication
      let newData = [...this.state.data, ...res.data];
      // should use normal function def for 'this'
      newData = newData.filter(function ({ id }) { return !this.has(id) && this.add(id) }, new Set);
      this.setState({loading: false, data: newData, offset: res.offset});
    } else {
      console.error(response);
      alert(response.text);
      this.setState({loading: false});
    }
  }

  componentDidMount () {
    this.getCharacters();
  }

  handleLoadMore() {
    this.getCharacters();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrap}>
        <div className={classes.content}>
          {this.state.data.map(item => (<Character className={classes.item} item={item} />))}
        </div>
        {this.state.loading ?
          (
            <div className={classes.loading}>
              <div>Loading data ...</div>
              <div className={`${classes.loader} fa fa-spinner fa-spin`}></div>
            </div>
          ) :
          (
            this.state.offset ? (<div className={classes.loadMore} onClick={this.handleLoadMore.bind(this)}>Load More</div>) : (null)
          )
        }
      </div>
    );
  }
}


export default injectSheet(styles)(Trombinoscope);
