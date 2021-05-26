import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class YoutubeService{
    
    youtubeUrl:string ="https://www.googleapis.com/youtube/v3/videos";
    private apikeyYT:string = "AIzaSyAUIyXVQEA2dXfwW7U37yDFcfPsrx5qc4k";
    private nextPageToken:string = "";

    constructor(private http:HttpClient){}

    getVideos(){
        let params = new HttpParams();
    
        params = params.append('part', 'snippet');
        params = params.set('chart', 'mostPopular');
        params = params.set('maxResults', '10');
        params = params.set('regionCode', 'ES');
        params = params.set('key', this.apikeyYT);

        if(this.nextPageToken){
            params = params.set('pageToken', this.nextPageToken);
        }

        return this.http.get(this.youtubeUrl, {params: params}).pipe(map(res => {
            this.nextPageToken = res['nextPageToken'];
            let videos:any[] = [];
            for(let video of res['items']){
                videos.push(video);
            }
            return videos;
        }));
    }
}