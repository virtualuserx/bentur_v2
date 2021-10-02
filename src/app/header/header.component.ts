import { Component, OnInit } from '@angular/core';

import {  faGlobe } from '@fortawesome/free-solid-svg-icons';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  icons = {
    languages:faGlobe
  };

  private language_array = ['en','tr','fr'];
  private language_choicen :string = 'en';

  constructor(private translate: TranslateService) {
     // this language will be used as a fallback when a translation isn't found in the current language
     translate.setDefaultLang('en');

    if(localStorage.getItem('language_choicen') !== null && this.language_array.includes(String(localStorage.getItem('language_choicen')))){
      this.language_choicen = String(localStorage.getItem('language_choicen'));
    }
    else{
      localStorage.setItem('language_choicen','en');
    }

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.language_choicen);

   }

  ngOnInit(): void {
  }

  useLanguage(language: string): void {
    localStorage.setItem('language_choicen', language);
    this.translate.use(language);
}

}
