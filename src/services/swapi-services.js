import React from 'react';


export default class SwapiService extends React.Component {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ошибка ${url}, received ${res.status}`)
    }
    const resJson = await res.json();
    return resJson.results;
  }

  async getGeneresResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ошибка ${url}, received ${res.status}`)
    }
    const resJson = await res.json();
    return resJson;
  }


  async getMovies(name, page) {
    // eslint-disable-next-line no-undef
    return await this.getResource(`${process.env.REACT_APP_keyApi}/search/movie?api_key=${process.env.REACT_APP_apiKey}&language=en-EN&query=${name}&page=${page}&include_adult=false`)
  }

  async getGeneresMovies() {
    // eslint-disable-next-line no-undef
    return await this.getGeneresResource(`${process.env.REACT_APP_keyApi}/genre/movie/list?api_key=${process.env.REACT_APP_apiKey}&language=en-US&query=return`)
  }

  async getAuthentication() {
    // eslint-disable-next-line no-undef
    const authentication = await this.getGeneresResource(`${process.env.REACT_APP_keyApi}/authentication/guest_session/new?api_key=${process.env.REACT_APP_apiKey}`)
    if (!localStorage.getItem('key')) {
      localStorage.setItem('key', authentication.guest_session_id)
    }
  }

  

  async getGuestSession() {
    const localSession = localStorage.getItem('key');
    
    // eslint-disable-next-line no-undef
    return await this.getResource(`${process.env.REACT_APP_keyApi}/guest_session/${localSession}/rated/movies?api_key=${process.env.REACT_APP_apiKey}&language=en-US&sort_by=created_at.asc`)
  }
  
};

