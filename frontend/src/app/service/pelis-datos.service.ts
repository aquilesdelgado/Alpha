import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PelisDatosService {
  url = 'https://api.themoviedb.org/3/';
  url2 = 'https://api.themoviedb.org/3/movie/';
  apikey = '4d1fbdcf538ee0650a9a3cf6ce963c2b';
  urlAPI = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getPelis() {
    //const topPelis = `${this.url}discover/movie?sort_by=popularity.desc&api_key=${this.apikey}`;
    const topPelis = `${this.urlAPI}peliculas/`;
    return this.http.get<any[]>(topPelis);
  }
  getMovieById(idpel) {
    const idpelis = `${this.urlAPI}pelicula/${idpel}`;
    return this.http.get<any[]>(idpelis);
  }
  getSearchResult(param) {
    const urlsearch = `${this.url}search/multi?api_key=${this.apikey}&query=${param}`;
    return this.http.get<any[]>(urlsearch);
  }
  getPelisComedia() {
    const topPelis = `${this.urlAPI}genero/35`;
    return this.http.get<any[]>(topPelis);
  }
  getPelisAccion() {
    const topPelis = `${this.urlAPI}genero/28`;
    return this.http.get<any[]>(topPelis);
  }
  getPelisHorror() {
    const topPelis = `${this.urlAPI}genero/27`;
    return this.http.get<any[]>(topPelis);
  }
  getPelisRomance() {
    const topPelis = `${this.urlAPI}genero/10749`;
    return this.http.get<any[]>(topPelis);
  }
  getMovieKey(id){
    const topPelis = `${this.url2}${id}/videos?api_key=${this.apikey}`;
    return this.http.get<any[]>(topPelis);
  }
}

