import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private httpClient: HttpClient) { }

  login(email:string, password:string) {
    return this.httpClient.post<{access_token:  string}>('http://localhost:3000/auth/login', {email, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }))
  }

  // register(email:string, password:string) {
  //   // return this.httpClient.post<{access_token: string}>('http://localhost:3000/users/api', {email, password}).pipe(tap(res => {
  //   //   this.login(email, password)
  //   // }))
  //   let user = {
  //     "user": {
  //       "email": "juanito@blablabla.com",
  //       "password": "String"
  //     }
  //   };
  //   console.log(email);
  //   return this.httpClient.post<{access_token: string}>('http://localhost:3000/api/users', user, httpOptions);
  //
  // }

  register(user): Promise<string> {
    return this.httpClient
      .post('http://localhost:3000/api/users', JSON.stringify(user), httpOptions)
      .toPromise()
      .then(res => res.toString());
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

}
