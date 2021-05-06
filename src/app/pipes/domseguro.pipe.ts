import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domSanitazer:DomSanitizer){}

  transform(value:string, url: string): any {
    return this.domSanitazer.bypassSecurityTrustResourceUrl( url + value);
  }

}
