import { Pipe, PipeTransform } from '@angular/core';
import { PortalLanguageKeyValueMap } from '../../../../shared/shared-data/constants';



@Pipe({
  name: 'portalLanguage'
})
export class PortalLanguagePipe implements PipeTransform {


  transform(value: ('en' | 'be') ): string {

    return PortalLanguageKeyValueMap[value]
    
  }

}
