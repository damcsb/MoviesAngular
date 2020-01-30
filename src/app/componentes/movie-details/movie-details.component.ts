import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  ////Atts

  movieInfo:any;

  ////Builder

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ////Implements

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);

    this.movieService.getDetails(id).subscribe(
      data => {
        this.movieInfo = data
        console.log(data);
      }
    );
    console.log(this.movieInfo);
  }

  ////Methods

  backClicked() {
    this.location.back();
  }


}
