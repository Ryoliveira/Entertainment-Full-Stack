import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { MediaGenre } from 'src/app/common/media-genre';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  mediaGenres: MediaGenre[] = [];

  constructor(private router: Router,
              private mediaService: MediaService) { }

  ngOnInit(): void {
    this.loadGenres();
  }


  loadGenres(){
    this.mediaService.getGenres().subscribe(
      data => this.mediaGenres = data._embedded.mediaGenres
    );
  }


}
