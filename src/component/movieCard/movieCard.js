import { Button } from 'antd';
import React, { Component } from 'react';

import './movieCard.css'

export default class MovieCard extends Component {

  render() {
    return(
      <div className='movieCard'>
        <img src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg' className='movieImg'></img>
        <div className='movieInfo'>
          <h1>The way back</h1>
          <span>March 5, 2020</span>
          <Button size={'small'} className='button'>Action</Button>
          <Button size={'small'} className='button'>Drama</Button>
          <p className='description'>A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...</p>
        </div>
      </div>
    );
  }
}