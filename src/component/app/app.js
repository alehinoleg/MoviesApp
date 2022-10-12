import React, { Component } from 'react';
import debounce from 'lodash.debounce';


import SwapiService from '../../services/swapi-services';
import MovieList from '../movieList/movieList';

import 'antd/dist/antd.min.css';
import './app.css'

export default class App extends Component {
  swapiService = new SwapiService();
  
  state = {
    AllMovies: [],
    loading: true, 
    error: false,
    search: '',
  }

  componentDidMount() {
    this.updateMovies();
  }
  
  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateMovies = () => {
    this.swapiService.getSearchMovies()
      .then(res => {
        this.setState(() => {
          return {
            AllMovies: res,
            loading: false
          };
        });
      })
      .catch(this.onError) 
  };

  onLabelChange = debounce(
    (event) => {
      if (event.target.value !== '') {
        this.swapiService.getSearchMovie(event.target.value)
          .then(res => {
            this.setState(() => {
              return {
                AllMovies: res,
                loading: false,
                search: event.target.value
              };
            });
          })    
      } 
      else {
        this.setState(() => {
          return {
            search: ''
          }
        })
      }   
    }, 1000
  ) 

  onPaginationChange = (page) => {
    if (this.state.search !== '') {
      this.swapiService.getPaginationMovie(this.state.search, page)
        .then(res => {
          this.setState(() => {
            return {
              AllMovies: res,
              loading: false
            };
          });
        })
        .catch(this.onError)
    }
  }
  
  render() {
    const { AllMovies, loading, error } = this.state;
    
    return (
      <div className='app'>
        <div className='wrapper'>
          <MovieList 
            movies={AllMovies} 
            loading = { loading } 
            error = { error } 
            onLabelChange = {this.onLabelChange} 
            onPaginationChange = {this.onPaginationChange}
          />        
        </div>
      </div>
    )
  }
  
};