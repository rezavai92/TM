import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acceptFormat'
})
export class AcceptFormatPipe implements PipeTransform {

  transform(fileTypes : string[] ): string {
    const accept =fileTypes.map((type)=>`.${type}`).join(",");
    return accept;
  }

}
