import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(value: any, position:number = 0): any {
    let noimage = "assets/img/noimage.png";
    if(!value){
      return  noimage;
    }
    return (value.length > position) ? value[position].url : noimage;
  }

}
