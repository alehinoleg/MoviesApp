import { Input } from 'antd';
import React, { Component } from 'react';

import './movieSearch.css'

export default class MovieSearch extends Component {


  render() {
    const {onLabelChange} = this.props;
    return (
	  <form className='movieSearch'>
		  <Input placeholder="Type to search..." 
		  	onChange={onLabelChange}/>
	  </form>
    );
  };
};