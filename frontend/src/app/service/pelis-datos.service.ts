import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PelisDatosService {
  url = 'https://api.themoviedb.org/3/';
  url2 = 'https://api.themoviedb.org/3/movie/';
  apikey = '4d1fbdcf538ee0650a9a3cf6ce963c2b';

  constructor(private http: HttpClient) { }

  getPelis() {
    const topPelis = `${this.url}discover/movie?sort_by=popularity.desc&api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
  getMovieById(idpel) {
    const idpelis = `${this.url}movie/${idpel}?api_key=${this.apikey}`;
    return this.http.get<any[]>(idpelis);
  }
  getSearchResult(param) {
    const urlsearch = `${this.url}search/multi?api_key=${this.apikey}&query=${param}`;
    return this.http.get<any[]>(urlsearch);
  }
  getPelisComedia() {
    const topPelis = `${this.url}discover/movie?with_genres=35&sort_by=vote_average.desc&api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
  getPelisAccion() {
    const topPelis = `${this.url}discover/movie?with_genres=28&sort_by=vote_average.desc&api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
  getPelisHorror() {
    const topPelis = `${this.url}discover/movie?with_genres=27&sort_by=vote_average.desc&api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
  getPelisRomance() {
    const topPelis = `${this.url}discover/movie?with_genres=10749&sort_by=vote_average.desc&api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
  getMovieKey(id){
    const topPelis = `${this.url2}${id}/videos?api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
}

