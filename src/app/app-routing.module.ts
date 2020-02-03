import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './componentes/movie-details/movie-details.component';
import { MoviesComponent } from './componentes/movies/movies.component';


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch:'full' },
  { path: 'movies', component: MoviesComponent },
  { path:'movie-details/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
