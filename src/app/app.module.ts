import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MediaListComponent } from './components/media-list/media-list.component';
import { SearchComponent } from './components/search/search.component';
import { MediaDetailsComponent } from './components/media-details/media-details.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';


const routes: Routes = [
  {path: 'info/:mediaId', component: MediaDetailsComponent},
  {path: 'search/:keyword', component: MediaListComponent},
  {path: 'genres/:genre', component:MediaListComponent},
  {path: 'genres', component: GenreListComponent},
  {path: 'media', component: MediaListComponent},
  {path: '', redirectTo: '/media', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    MediaListComponent,
    SearchComponent,
    MediaDetailsComponent,
    GenreListComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
