import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';



@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    standalone: true,
})
export class MainHeaderComponent implements OnInit{
    currentLanguage: string = 'th';
    translations = this.languageService.translations
  
    constructor( private languageService: LanguageService) { }
  
    ngOnInit(): void {
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
      });
    }
    refreshPage(): void {
      window.location.href = 'https://wrp-smarttraffic.com';
    }
    
}