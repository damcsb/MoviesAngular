import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieType } from './movie'


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //Atts

  apiKey: any = "f73d5e01"
  url: any = "http://www.omdbapi.com/"

  //Builder

  constructor(private http: HttpClient) { }

  //Methods

  searchData(title: string, type: MovieType): Observable<any> {
    return this.http.get(
      `${this.url}?s=${(title)}&type=${type}&apikey=${this.apiKey}`
    ).pipe(map(data => data['Search']));
  }

  getDetails(id: string) {
    return this.http.get(`${this.url}?i=${id}&apikey=${this.apiKey}`);
  }
}
