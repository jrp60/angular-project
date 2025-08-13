import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { SpotifyService } from "../../../services/spotify.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styles: [],
})
export class SearchComponent implements OnInit {
  termino: string = "";
  artistas: any[] = [];

  private searchSubject = new Subject<string>();

  constructor(public _spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300), // wait 300ms after stop writting
        distinctUntilChanged(), // avoid repeating the same
        switchMap((term) => this._spotifyService.getArtistas(term))
      )
      .subscribe((artistas: any[]) => {
        this.artistas = artistas;
      });
  }

  buscarArtista() {
    this.searchSubject.next(this.termino); // emite el valor actual
  }

  // buscarArtista() {
  //   this._spotifyService.getArtistas(this.termino).subscribe((artistas) => {
  //     this.artistas = artistas;
  //   });
  // }
}
