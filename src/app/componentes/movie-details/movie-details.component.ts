import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  ////Atts

  movieInfo: any;

  ////Builder

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private renderer: Renderer2,
    private el: ElementRef) { }

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

  ///////////////////////////////Renderer examples button Like/Dislike


  @ViewChild('like', { static: true }) like: ElementRef;
  @ViewChild('dislike', { static: true }) dislike: ElementRef;

  numberlike:number = 0;
  numberdislike:number = 0;


  exampleLike() {
    this.renderer.setStyle(this.like.nativeElement, 'background', '#9FE49E');
    this.renderer.setStyle(this.dislike.nativeElement, 'display', 'none');
    this.numberlike++;
  }

  exampleDislike() {
    this.renderer.setStyle(this.dislike.nativeElement, 'background', '#E49E9E');
    this.renderer.setStyle(this.like.nativeElement, 'display', 'none');
    this.numberdislike++;
  }

}
