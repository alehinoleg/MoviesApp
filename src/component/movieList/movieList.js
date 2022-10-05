import React, {Component} from 'react';

import MovieCard from '../movieCard/movieCard';

import './movieList.css';

export default class MovieList extends Component {
  render() {
    
    const {movies} = this.props
    console.log(movies);
    const arr = movies.map(({title, overview, release_date, poster_path, id }) => {
      return <MovieCard title = {title} overview = {overview} release_date = {release_date} poster_path = {poster_path} key={id}/>
    })
    console.log(arr);
    return(
      <ul className='movieList'>
        {arr}
      </ul>
    )
  }
}