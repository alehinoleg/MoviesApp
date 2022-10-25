import React, { Component } from 'react';
import debounce from 'lodash.debounce';


import { SwapiService } from '../../services/swapi-services';
import MovieList from '../movieList/movieList';
import ContextMovies from '../../services/context-movies';

import 'antd/dist/antd.min.css';
import './app.css'

export default class App extends Component {

  constructor() {
    super()
    this.swapiService = new SwapiService();
  }
  
  
  state = {
    AllMovies: [],
    generesMovies: [],
    loading: true, 
    error: false,
    search: '',
    moviesRate: {},
    retaMovies: []
  }

  componentDidMount() {
    this.updateMovies();
    this.generesMovies();
    this.swapiService.getAuthentication();
  }

  componentDidUpdate() {
    this.swapiService.getGuestSession()
      .then(res => {
        this.setState(() => {
          return {
            retaMovies: res,
            loading: false
          };
        });
      })
      .catch(this.onError)
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
  
  updateGuestSession = () => {
    this.swapiService.getGuestSession()
      .then(res => {
        console.log(res)
      })
      .catch(this.onError) 
  };

  generesMovies = () => {
    this.swapiService.getGeneresMovies()
      .then(res => {
        this.setState(() => {
          return {
            generesMovies: res.genres,
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
    else {
      this.swapiService.getPaginationMovie('return', page)
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

  /*onRate = ( id, rating ) => {
    this.setState(({ moviesRate }) => {
      const rateLocal = {moviesRate: {...moviesRate, [id]: rating}}
      console.log(rateLocal)
      localStorage.setItem('rate', JSON.stringify(rateLocal))
      return rateLocal;
    });
    console.log({[id]:rating});
  };*/
  
  render() {
    const { AllMovies, generesMovies, loading, error, moviesRate, retaMovies } = this.state;
    return (
      <div className='app'>
        <div className='wrapper'>
          <ContextMovies.Provider value={generesMovies}>
            <MovieList 
              movies={AllMovies} 
              retaMovies = {retaMovies}
              moviesRate = {moviesRate}
              loading = { loading } 
              error = { error } 
              onLabelChange = {this.onLabelChange} 
              onPaginationChange = {this.onPaginationChange}
              onRate = {this.onRate}
            />  
          </ContextMovies.Provider>
        </div>
      </div>
    )
  }
  
};