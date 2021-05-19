import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styles: [
  ]
})
export class YoutubeComponent implements OnInit {

  constructor() {
    /* console.log("Environment");
    console.log(" texto: ${process.env.SPOTIFY_CLIENT_ID}");

    if (!process.env.SPOTIFY_CLIENT_ID) {
      console.error('All the required environment variables were not provided!');
      process.exit(-1);
    }
    else{
      console.log(process.env.SPOTIFY_CLIENT_ID);
      
    } */

  }

  ngOnInit(): void {
  }

}
