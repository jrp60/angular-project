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
/*     console.log(env.SPOTIFY_CLIENT_ID); */
    console.log(environment.AUTH_DOMAIN);
    
    
  }

  ngOnInit(): void {
  }

}
