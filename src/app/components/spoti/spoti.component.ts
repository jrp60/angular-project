import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service'

@Component({
  selector: 'app-spoti',
  templateUrl: './spoti.component.html',
  styles: [
  ]
})
export class SpotiComponent {

  private token:string;
  termino:string = "";

  constructor(public _spotifyService:SpotifyService){
    if (typeof(Storage) !== 'undefined') {
      this.getTokenStorageAndReleases();
    } else {
      this.getTokenAndReleasesWithoutStorage();
    }
  }

  getNewReleases(token?:string){
    return this._spotifyService.getNewReleasesS(token);
  }
  
  createToken(){
    return this._spotifyService.createToken();
  }

  createTokenStorage(){
    return this._spotifyService.createToken();
  }

  getTokenStorageAndReleases(){
    this.token = sessionStorage.getItem('tokenSpotify');
    console.log(this.token);
    if(this.token==null || this.token=='' || this.token=='null'){
      console.log("ESTAMOS EN NULL");
      
      this.createTokenStorage().subscribe((data) =>{
        this.token = data;
        console.log(this.token);
        sessionStorage.setItem('tokenSpotify', this.token);
        this.getNewReleases(this.token).subscribe(()=> {return} );
      });
      
    }
    else{
      console.log("ELSE BLOCK");
      console.log(this.token);
      
      this.getNewReleases(this.token).subscribe(()=> {return});
    }
    
  }

  getTokenAndReleasesWithoutStorage() {
    this.createToken()
      .subscribe(
        () => this.getNewReleases().subscribe(()=> {return})
      );
  }


}
