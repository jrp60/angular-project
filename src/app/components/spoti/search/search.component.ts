import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  termino:string = "";
  constructor(public _spotifyService:SpotifyService){ }

  ngOnInit(): void {
  }

  buscarArtista(){
    this._spotifyService.getArtistas(this.termino)
    .subscribe();
  }

}
