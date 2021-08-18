import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'videoYoutube'
})
export class VideoYoutubePipe implements PipeTransform {

  constructor(private domSanitizer:DomSanitizer){
  }

  transform(value: string): any {
    let urlYoutube = "https://www.youtube.com/embed/";
    return this.domSanitizer.bypassSecurityTrustResourceUrl(urlYoutube + value);
  }

}
