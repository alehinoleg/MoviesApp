import { Rate, Progress } from 'antd';
import React, { Component } from 'react';

import ContextMovies from '../../services/context-movies';
import postMovieId from '../../services/postMovise';
import color from '../../utils/utils';

import './movieCard.css'

export default class MovieCard extends Component {
  

  render() {
    const {title, overview, release_date, poster_path, vote_average, genre_ids, id, rating } = this.props;
    const poster = 'https://image.tmdb.org/t/p/original/';
    const posterDefault = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg'

    return(
      <ContextMovies.Consumer>
        { (value) => (
          <li>
            <div className='movieCard' >
              <Progress type="circle" percent={100} className='progress' width='30px' format={() => vote_average} strokeColor={color(vote_average)}/>
              <img src={poster_path ? `${poster}${poster_path}` : posterDefault} className='movieImg'></img>
              <div className='movieInfo'>
                <h1>{title}</h1>
                <span>{release_date}</span>
                <div size={'small'} className='genres'>{
                  genre_ids.map(el => {
                    for (let res of value) {
                      if (res.id === el) {
                        return (<span key={res.id} className='generes-tile'>{res.name}</span>)
                      }
                    }
                  })
                }</div>
                <p className='description'>{overview}</p>
                <Rate onChange={(a) => {postMovieId(id, a)}} defaultValue = {rating} count={10} className='rateUser'/>
              </div>
            </div>
          </li>
        )
        }
      </ContextMovies.Consumer>
    );
  }
}