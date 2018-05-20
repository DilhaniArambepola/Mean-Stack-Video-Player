import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any, url: any): any {
    if (value && !url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = value.match(regExp);
        if (match && match[2].length === 11) {
            console.log(match[2]);
            const sepratedID = match[2];
            // tslint:disable-next-line:prefer-const
            let embedUrl = '//www.youtube.com/embed/' + sepratedID;
            return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }

     }

   }

  // transform(url: any) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }

}
