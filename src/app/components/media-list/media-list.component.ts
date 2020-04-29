import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/common/media';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  mediaList : Media[];
  
  searchMode: boolean = false;


  hasSelectedGenre: boolean = false;
  selectedGenre: string = "All Media";

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 12;
  theTotalElements: number = 0;

  constructor(private mediaService: MediaService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listMedia();
    })
  }

  listMedia(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.hasSelectedGenre = this.route.snapshot.paramMap.has('genre');

    if(this.searchMode){
      this.searchMedia();
    }
    else if(this.hasSelectedGenre){
      this.listGenreSpecificMedia();
    }
    else{
      this.listAllMedia();
    }

  }

  listAllMedia(){
    this.mediaService.getAllMedia(this.thePageNumber-1, this.thePageSize).subscribe(this.processResult());
  }

  searchMedia() {
   const theKeyword = this.route.snapshot.paramMap.get('keyword');
   this.mediaService.searchMovies(this.thePageNumber-1, this.thePageSize, theKeyword).subscribe(this.processResult());
  }

  listGenreSpecificMedia() {
    const theGenre = this.route.snapshot.paramMap.get('genre');
    this.selectedGenre = theGenre;
    this.mediaService.getGenreSpecificMedia(this.thePageNumber-1, this.thePageSize, theGenre).subscribe(this.processResult());

  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listMedia();
  }

  processResult(){
    return data =>{
      this.mediaList = data._embedded.media;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

}