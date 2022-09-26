import React, {Component} from 'react';

import MovieCard from '../movieCard/movieCard';

import './movieList.css';

export default class MovieList extends Component {
  render() {
    const {movies} = this.state;
    console.log(movies);
    return(
      <ul className='movieList'>
        <li>
          <MovieCard />
        </li>
      </ul>
    )
  }
}