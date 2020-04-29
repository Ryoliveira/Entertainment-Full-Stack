import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Media } from '../common/media';
import { MediaGenre } from '../common/media-genre';


@Injectable({
  providedIn: 'root'
})
export class MediaService {
 
  private baseMediaUrl: string = "http://localhost:8080/api/media-data";
  private mediaGenreUrl: string = "http://localhost:8080/api/mediaGenres?size=30";



  constructor(private httpClient: HttpClient) { }


  getAllMedia(pageNumber: number, pageSize: number): Observable<GetMediaResponse> {
    const searchUrl = `${this.baseMediaUrl}/search/findAllByOrderByYearDesc?page=${pageNumber}&size=${pageSize}`;
    return this.getMedia(searchUrl);
  }

  searchMovies(pageNumber: number, pageSize: number, theKeyword: string): Observable<GetMediaResponse>{
    const searchUrl = `${this.baseMediaUrl}/search/findByTitleLikeIgnoreCase/?title=${theKeyword}&page=${pageNumber}&size=${pageSize}`;
    return this.getMedia(searchUrl);
  }

  getMediaDetails(mediaId: string): Observable<Media> {
    const searchUrl = `${this.baseMediaUrl}/${mediaId}`;
    return this.httpClient.get<Media>(searchUrl);
  }

  getGenreSpecificMedia(pageNumber: number, pageSize: number, theGenre: string) {
    console.log(`Genre = ${theGenre}`)
    const searchUrl = `${this.baseMediaUrl}/search/findByGenreContainingOrderByYearDesc?genre=${theGenre}&page=${pageNumber}&size=${pageSize}`;
    return this.getMedia(searchUrl);
  }

  getMedia(searchUrl: string) : Observable<GetMediaResponse> {
    return this.httpClient.get<GetMediaResponse>(searchUrl);
  }

  getGenres() : Observable<GetMediaGenresResponse> {
    return this.httpClient.get<GetMediaGenresResponse>(this.mediaGenreUrl);
  }

}

interface GetMediaResponse {
  _embedded: {
    media: Media[]
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}


interface GetMediaGenresResponse{
  _embedded: {
    mediaGenres: MediaGenre[];
  }
}



