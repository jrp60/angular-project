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
    
  }

  ngOnInit(): void {
    
    /* this.buscarArtista(); */
    setTimeout(function(){ 
      console.log("TIMEOUT");
      console.log(this._spotifyService);
      
       this._spotifyService.getArtistas(this.termino)
      .subscribe(
        data => {
          console.log('ESTO ES DEL SEARCH.COMPONENT');
          console.log(data);
          
          
        }
      ); }, 3000);
  }

  buscarArtista(){
    this._spotifyService.getArtistas(this.termino)
    .subscribe(
      data => {
        console.log('ESTO ES DEL SEARCH.COMPONENT');
        console.log(data);
        
        
      }
    );
    return null;
  }

  getNewReleases(){
    this._spotifyService.getNewReleasesS().subscribe(
      data => {
        console.log('ESTO ES DEL SEARCH.COMPONENT');
        console.log(data);
        
        
      }
    );
  }
  



}
