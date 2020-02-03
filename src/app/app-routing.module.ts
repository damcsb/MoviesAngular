import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { MovieDetailsComponent } from './componentes/movie-details/movie-details.component';
import { MoviesComponent } from './componentes/movies/movies.component';

const sVscroll: ExtraOptions = {
  scrollPositionRestoration: 'enabled'
};

const routes: Routes = [
  { path: '', component: MoviesComponent, pathMatch:'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie-details', component:MovieDetailsComponent },
  { path:'movie-details/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, sVscroll)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
