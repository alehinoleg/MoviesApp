import React from 'react';

export class SwapiService extends React.Component {
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

  async getSearchMovies() {
    return await this.getResource('https://api.themoviedb.org/3/search/movie?api_key=7ee5075b757699681057e6d30dfafc6d&language=en-EN&query=return&page=1&include_adult=false')
  }

  async getSearchMovie(name) {
    return await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=7ee5075b757699681057e6d30dfafc6d&language=en-EN&query=${name}&page=1&include_adult=false`)
  }

  async getPaginationMovie(name, page) {
    return await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=7ee5075b757699681057e6d30dfafc6d&language=en-EN&query=${name}&page=${page}&include_adult=false`)
  }

  async getGeneresMovies() {
    return await this.getGeneresResource('https://api.themoviedb.org/3/genre/movie/list?api_key=7ee5075b757699681057e6d30dfafc6d&language=en-US&query=return')
  }

  async getAuthentication() {
    const authentication = await this.getGeneresResource('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=7ee5075b757699681057e6d30dfafc6d')
    localStorage.setItem('key', authentication.guest_session_id)
  }

  async getGuestSession() {
    const localSession = localStorage.getItem('key');
    return await this.getResource(`https://api.themoviedb.org/3/guest_session/${localSession}/rated/movies?api_key=7ee5075b757699681057e6d30dfafc6d&language=en-US&sort_by=created_at.asc`)
  }
  
};

export async function postMovieId(id, rate) {
  const localSession = localStorage.getItem('key');
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=7ee5075b757699681057e6d30dfafc6d&guest_session_id=${localSession}`, {
    method:'POST', 
    body: JSON.stringify({
      value: rate,
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  if (!res.ok) {
    throw new Error(`Ошибка, received ${res.status}`)
  }
  const resJson = await res.json();
  return resJson.results;
}