import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private token:string = '';
  artistas:any[] = [];
  releases:any[] = [];
  urlBusqueda: string = "https://api.spotify.com/v1/search";
  urlArtista:string = "	https://api.spotify.com/v1/artists/";
  

  constructor(private http:HttpClient){
  }

  createToken(){
    let headers = new HttpHeaders();
    headers = headers.append( 'Content-Type', 'application/x-www-form-urlencoded');
    const body = {
      client_id: environment.SPOTIFY_CLIENT_ID,
      client_secret: environment.SPOTIFY_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }

    var querystring = require('querystring');

    return this.http.post<any>('https://accounts.spotify.com/api/token', querystring.stringify(body), { headers }).pipe(map(data => {
      this.token = 'Bearer ' + data.access_token;
      return this.token;
    }));
  }

  getArtistas(termino:string){
    
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    let query = `?query=${termino}&type=artist`
    let url = this.urlBusqueda + query;

    return this.http.get( url, { headers } ).pipe(
      map(res =>{
        this.artistas = res['artists']['items'];
        
      })
    );
  }

  getNewReleasesS(token?:string){
    let headers = new HttpHeaders();
    if(token!=null && token!=''){
      headers = headers.append('Authorization', token);
    }else{
      headers = headers.append('Authorization', this.token);
    }
    
    let url = "https://api.spotify.com/v1/browse/new-releases";
    return this.http.get(url, {headers}).pipe(
      map(res =>{  
        this.releases = res['albums']['items'];
      })
    )
  }

  getArtista(id:string){
    let headers = new HttpHeaders();
    headers = headers.append( 'Authorization', this.token);
    let query = `${id}`
    let url = this.urlArtista + query;

    return this.http.get( url, { headers } ).pipe(
      map( res => {
        return res;
      })
    );
  }

  getTop(id:string){
    let headers = new HttpHeaders();
    headers = headers.append( 'Authorization', this.token);
    let query = `${id}/top-tracks?country=US`
    let url = this.urlArtista + query;

    return this.http.get( url, { headers } ).pipe(
      map( res => {
        return res['tracks'];
      })
    );
  }
  
}
