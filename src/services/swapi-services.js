export default class SwapiService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ошибка ${url}, received ${res.status}`)
    }
    const resJson = await res.json();
    return resJson.results;
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
};