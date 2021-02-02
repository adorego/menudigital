import {InjectionToken} from '@angular/core';
export const BASE_URL_API = new InjectionToken<String>('Base URL API', {
   providedIn: 'root',
   factory: () => 'http://localhost:3000/api'
});
