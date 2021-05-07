import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators';
import { SpotifyService } from '../../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {
  
  artista:any;
  pistas:any[];

  constructor(private activatedRoute: ActivatedRoute, public _spotifyService:SpotifyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(map(parametros => parametros['id'])).subscribe( id =>{
      this._spotifyService.getArtista(id).subscribe( data =>{ this.artista = data});
      this._spotifyService.getTop(id).subscribe( data =>{ this.pistas = data});
    })
  }

}
