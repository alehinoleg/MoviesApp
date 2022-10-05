import { Button } from 'antd';
import React, { Component } from 'react';


import './movieCard.css'

export default class MovieCard extends Component {

  render() {
    const {title, overview, release_date, poster_path } = this.props;
    return(
      <li>
        <div className='movieCard' >
          <img src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg'} className='movieImg'></img>
          <div className='movieInfo'>
            <h1>{title}</h1>
            <span>{release_date}</span>
            <Button size={'small'} className='button'>Action</Button>
            <Button size={'small'} className='button'>Drama</Button>
            <p className='description'>{overview}</p>
          </div>
        </div>
      </li>
    );
  }
}