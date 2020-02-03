import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { MovieType } from '../../service/movie';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [MovieService],
})
export class MoviesComponent implements OnInit {

  ////Atts

  movies: Observable<any>;
  type: MovieType = MovieType.all;
  private _strSearch: string = '';
  private timer: any;

  ////Builder

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ////Implements

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      console.log({ queryParams });
      this._strSearch = queryParams['search'];
      this.searchMovie();
    });


  }

  ////Methods

  get strSearch() {
    return this._strSearch;
  }

  set strSearch(value) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.navigate(), 1000);
    this._strSearch = value;
    console.log(value)

  }

  navigate() {
    let extras: NavigationExtras = { queryParams: { search: this.strSearch } }
    this.router.navigate(['/movies'], extras)
  }

  searchMovie() {
    this.movies = this.movieService.searchData(this.strSearch, this.type);
  }

}
