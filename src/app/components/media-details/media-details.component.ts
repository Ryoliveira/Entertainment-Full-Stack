import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/common/media';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {

  media : Media = new Media();

  constructor(private mediaService: MediaService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleMediaDetails();
    })
    
  }

  handleMediaDetails(){
    const theImdbId = this.route.snapshot.paramMap.get('mediaId');
    console.log(`mediaId: ${theImdbId}`);

    this.mediaService.getMediaDetails(theImdbId).subscribe(
      data =>{
        this.media = data;
      } 
    )
  }

}
