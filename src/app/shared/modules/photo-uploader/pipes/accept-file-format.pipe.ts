import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acceptFileFormat'
})
export class AcceptFileFormatPipe implements PipeTransform {

  transform(fileTypes: string[]): string {
    const accept = fileTypes.map((type) => `.${type}`).join(",");
    return accept;
  }

}
