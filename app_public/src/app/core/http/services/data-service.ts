import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {User} from '../../../shared/models/user.model';

import {AuthResponse} from '../../../shared/models/authresponse.model';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {
  
    private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  

  public login(user:User): Observable<AuthResponse> {
    return this.makeApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeApiCall('register', user);
  }

  private makeApiCall(urlPath:string, user:User): Observable<AuthResponse>{
    
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http.post<AuthResponse>(url, user);
      
  }
  
}