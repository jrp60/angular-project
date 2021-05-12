import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service'

@Component({
  selector: 'app-spoti',
  templateUrl: './spoti.component.html',
  styles: [
  ]
})
export class SpotiComponent implements OnInit {

  private token:string;
  termino:string = "";

  constructor(private http:HttpClient,public _spotifyService:SpotifyService){
    //get token from localstorage
    //if not, create and store it
    this.getTokenAndReleases();
    if (typeof(Storage) !== 'undefined') {
      // Código cuando Storage es compatible
    } else {
     // Código cuando Storage NO es compatible
    }
  }

  ngOnInit(): void {
  }

/*   buscarArtista(){
    this._spotifyService.getArtistas(this.termino)
    .subscribe(
      data => {
        console.log('ESTO ES DEL SEARCH.COMPONENT');
        console.log(data);
      }
    );
    return null;
  } */

  getNewReleases(){
    return this._spotifyService.getNewReleasesS();
  }
  
  createToken(){
    return this._spotifyService.createToken();
  }

  getTokenAndReleases() {
    this.createToken()
      .subscribe(
        () => this.getNewReleases().subscribe(()=> console.log("hola final"))
      );
  }


}
