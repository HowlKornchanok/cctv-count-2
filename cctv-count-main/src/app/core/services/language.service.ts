import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { translations } from './translations';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject: BehaviorSubject<string>;
  currentLanguage$: Observable<string>; // Change the type to Observable<string>
  translations = translations;

  constructor() {
    // Initialize current language from localStorage or default to 'th'
    const storedLanguage = localStorage.getItem('currentLanguage');
    this.currentLanguageSubject = new BehaviorSubject<string>(storedLanguage || 'th');
    this.currentLanguage$ = this.currentLanguageSubject.asObservable(); // Assign currentLanguage$ here
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  public get isTH(): boolean {
    return this.getCurrentLanguage() == 'th';
  }
  

  toggleLanguage(): void {
    const newLanguage = this.getCurrentLanguage() === 'th' ? 'en' : 'th';
    this.currentLanguageSubject.next(newLanguage);
    localStorage.setItem('currentLanguage', newLanguage); // Save to localStorage
    console.log('Current Language:', newLanguage);
  }
}
