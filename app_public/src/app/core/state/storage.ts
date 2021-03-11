import {InjectionToken} from '@angular/core';
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
   providedIn: 'root',
   factory: () => localStorage 
});

export const TOKEN_NAME = new InjectionToken<String>('Token Name', {
    providedIn: 'root',
    factory: () => {return 'menuDigital-token'} 
 });

 export const API_URL = new InjectionToken<String>('ApiUrl', {
   providedIn: 'root',
   factory: () => {return 'http://localhost:3000/api'} 
});

