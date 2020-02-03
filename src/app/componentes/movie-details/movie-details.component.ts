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

  ///////////////////////////////Renderer button Like/Dislike Test

  @ViewChild('like', { static: true }) like: ElementRef;
  @ViewChild('dislike', { static: true }) dislike: ElementRef;

  numberlike: any = localStorage.getItem('Like');
  numberdislike: any = localStorage.getItem('Dislike');
  unclick: boolean = false;

  exampleLike() {
    this.renderer.setStyle(this.like.nativeElement, 'background', '#9FE49E');
    this.renderer.setStyle(this.dislike.nativeElement, 'display', 'none');

    if (this.unclick == false) {
      this.numberlike++;
      localStorage.setItem("Like", this.numberlike);
      this.unclick = true;
    }
  }

  exampleDislike() {
    this.renderer.setStyle(this.dislike.nativeElement, 'background', '#E49E9E');
    this.renderer.setStyle(this.like.nativeElement, 'display', 'none');

    if (this.unclick == false) {
      this.numberdislike++;
      localStorage.setItem("Dislike", this.numberdislike);
      this.unclick = true;
    }
  }

}
