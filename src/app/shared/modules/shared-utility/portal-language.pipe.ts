import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'portalLanguage'
})
export class PortalLanguagePipe implements PipeTransform {

  transform(value: ('en' | 'be')): string {
    switch (value) {
      case 'be':
        return "BENGALI";
      case 'en':
        return "ENGLISH";
    }
  }

}
