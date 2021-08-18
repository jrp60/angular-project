import { Component } from '@angular/core';
import { YoutubeService } from "../../services/youtube.service";

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styles: [
  ]
})
export class YoutubeComponent {

  videos:any[] = [];
  videoSel:any;

  constructor(public _yts:YoutubeService) {
    this._yts.getVideos().subscribe(videos => {
      this.videos = videos;
    });
    
  }
  verVideo(video:any){
    this.videoSel = video;
  }

  cerrarModal(){
    this.videoSel = null;

  }

  cargarMas(){
    this._yts.getVideos().subscribe(videos=>{
      this.videos.push.apply(this.videos, videos);
    });
  }

}
