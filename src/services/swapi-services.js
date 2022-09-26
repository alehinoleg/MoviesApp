export default class SwapiService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const resJson = await res.json();
    return resJson.results;
  }

  async getSearchMovies() {
    return await this.getResource('https://api.themoviedb.org/3/search/movie?api_key=7ee5075b757699681057e6d30dfafc6d&language=ru-RU&query=return&page=1&include_adult=false')
  }
};