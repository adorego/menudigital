import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'safebase64'})
export class SafeBase64Pipe implements PipeTransform{
  constructor(private sanitizer:DomSanitizer){}

  transform(html):SafeResourceUrl {
    const url = 'data:image/png;base64,'+html;
    const res = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    console.log('SafeBase64Pipe.transform:', res);
    return res;
  }
}