import { Spin, Pagination, Alert  } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import React, {Component} from 'react';

import MovieCard from '../movieCard/movieCard';
import MovieSearch from '../movieSearch';
import './movieList.css';


export default class MovieList extends Component {

  render() {
    const {movies, loading, error, onLabelChange, onPaginationChange } = this.props

    const arr = movies.map(({title, overview, release_date, poster_path, id }) => {
      return <MovieCard title = {title} overview = {overview} release_date = {release_date} poster_path = {poster_path} key={id}/>
    })

    const hasData = !(loading || error)
    const spinner = loading ? 
      <div className='spin'>
        <Spin size="large"/>
      </div> : null
    const content = hasData ? arr : null;
    const errorMessage = error ?
      <div className='spin'>
        <Alert
          message="Error"
          description="Что то пошло не так"
          type="error"
          showIcon
        />
      </div> : null
    const nullMovie = arr.length === 0 ? 
      <div className='spin'>Таких фильмов нет</div> : null

    return(
      <div className='wraperMovie'>
        <Online>
          <MovieSearch onLabelChange = {onLabelChange}/>
          <ul className='movieList'>
            {spinner}
            {content}
            {errorMessage}
            {nullMovie}
          </ul>
          <Pagination size="small" total={50} onChange={onPaginationChange} className='pagination'/>
        </Online>
        <Offline>
          <div className='spin'>
            <p>
              Нет интернета, дай мне инет 
            </p>
          </div>
        </Offline>
      </div>
    )
  }
}