import React, { Component } from 'react';


import SwapiService from '../../services/swapi-services';
import MovieList from '../movieList/movieList';

import 'antd/dist/antd.min.css';
import './app.css'

export default class App extends Component {
  swapiService = new SwapiService();
  
  state = {
    AllMovies: [],
  }

  componentDidMount() {
    this.updateMovies();
  }

  updateMovies = () => {
    this.swapiService.getSearchMovies()
      .then(res => {
        this.setState(() => {
          return {
            AllMovies: res
          };
        });
      }); 
  };


  
  render() {
    const { AllMovies } = this.state;
    
    return (
      <div className='app'>
        <div className='wrapper'>
          <MovieList movies={AllMovies}/>        
        </div>
      </div>
    )
  }
  
};