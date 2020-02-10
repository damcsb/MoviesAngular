import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { MovieType } from '../../service/movie';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { MovieScrollService } from './moviescroll.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [MovieService],
})

export class MoviesComponent implements OnInit {

  ////Atts

  private _strSearch: string = '';
  private timer: any;
  movies: Observable<any>;
  type: MovieType = MovieType.all;

  ////Builder

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private movieScrollService: MovieScrollService,
    private elementref: ElementRef
  ) { }

  ////Implements

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
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
  }

  navigate() {
    let extras: NavigationExtras = { queryParams: { search: this.strSearch } }
    this.router.navigate(['/movies'], extras)
  }

  searchMovie() {
    return this.movieService.searchData(this.strSearch, this.type).subscribe(res=>{
      this.movies = res;
      setTimeout(() => {
        this.elementref.nativeElement.scrollTop = this.movieScrollService.scrollPosition;
      })
    })
  }

  @HostListener('scroll', ['$event'])
  onMovieScroll($event) {
    this.movieScrollService.scrollPosition = $event.srcElement.scrollTop;
  }

}
