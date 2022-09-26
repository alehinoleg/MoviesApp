import React, { Component } from 'react';


import SwapiService from '../../services/swapi-services';
import MovieList from '../movieList/movieList';

import 'antd/dist/antd.min.css';
import './app.css'

export default class App extends Component {
  SwapiService = new SwapiService();
  
  state = {
    AllMovies: [],
  }
  
  constructor() {
    super();
    this.updateMovies();
  }

  updateMovies() {
    this.SwapiService.getSearchMovies()
      .then(res => {
        this.setState(() => {
          return {
            AllMovies: res
          };
        });
      }) 
  }


  
  render() {
    const { AllMovies } = this.state;
    console.log(AllMovies);
    return (
      <div className='app'>
        <div className='wrapper'>
          <MovieList movies={AllMovies}/>        
        </div>
      </div>
    )
  }
  
};