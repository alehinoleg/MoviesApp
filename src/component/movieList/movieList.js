import { Spin, Pagination, Alert, Tabs  } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import React, {Component} from 'react';

import MovieCard from '../movieCard/movieCard';
import MovieSearch from '../movieSearch';
import SwapiService from '../../services/swapi-services';
import './movieList.css';


export default class MovieList extends Component {
  swapiService = new SwapiService();

  render() {
    const {movies, loading, error, onLabelChange, onPaginationChange, onRate, retaMovies } = this.props;
    
    const arr = movies.map(({title, overview, release_date, poster_path, id, vote_average, genre_ids }) => {
      return <MovieCard title = {title} overview = {overview} release_date = {release_date} 
        poster_path = {poster_path} key={id} genre_ids={genre_ids} vote_average = {vote_average} onRate = {onRate} id={id}/>
    })

    const arrRate = retaMovies.map(({title, overview, release_date, poster_path, id, vote_average, genre_ids, rating }) => {
      return <MovieCard title = {title} overview = {overview} release_date = {release_date} 
        poster_path = {poster_path} key={id} genre_ids={genre_ids} vote_average = {vote_average} onRate = {onRate} id={id} rating={rating}/>
    })

    const hasData = !(loading || error)
    const spinner = loading &&
      <div className='spin'>
        <Spin size="large"/>
      </div> 
    const content = hasData && arr ;
    const errorMessage = error &&
      <div className='spin'>
        <Alert
          message="Error"
          description="Что то пошло не так"
          type="error"
          showIcon
        />
      </div>
    const nullMovie = arr.length === 0 &&
      <div className='spin'>Таких фильмов нет</div> 

    const paginstion = arr.length !== 0 && <Pagination size="small" total={50} onChange={onPaginationChange} className='pagination'/>
    return(
      <div className='wraperMovie'>
        <Online>
          <Tabs defaultActiveKey="1">
            onChange={(event) => {
              let tabsKey = 2;
              if (event === tabsKey) {
                this.swapiService.getGuestSession()
              }
            }}
            <Tabs.TabPane tab="Search" key="1">
              <MovieSearch onLabelChange = {onLabelChange}/>
              <ul className='movieList'>
                {spinner}
                {content}
                {errorMessage}
                {nullMovie}
              </ul>
              {paginstion}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rated" key="2">
              <ul className='movieList'>
                {arrRate}
              </ul>
            </Tabs.TabPane>
          </Tabs>
          
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