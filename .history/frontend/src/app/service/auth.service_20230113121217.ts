import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}

  // Get all objects
 GetUsers() {
  return this.http.get(`${this.endpoint}`);
}


 // Get single object
 GetUse(id: any): Observable<any> {
  let API_URL = `${this.endpoint}/read-user/${id}`;
  return this.http.get(API_URL, { headers: this.headers }).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.handleError)
  );
}

// Update
updateUser(id: any, data: any): Observable<any> {
  let API_URL = `${this.endpoint}/update-user/${id}`;
  return this.http
    .put(API_URL, data, { headers: this.headers })
    .pipe(catchError(this.handleError));
}
// Delete
deleteUser(id: any): Observable<any> {
  let API_URL = `${this.endpoint}/delete-user/${id}`;
  return this.http
    .delete(API_URL, { headers: this.headers })
    .pipe(catchError(this.handleError));
}

  // Sign-up
  signUp(prenom: string, nom: string, email: string, role: string, password: string, etat: boolean, imageUrl: File, matricule: String): Observable<any> {
    var formData: any = new FormData();
      formData.append('prenom', prenom);
      formData.append('nom', nom);
      formData.append('email', email);
      formData.append('role', role);
      formData.append('password', password);
      formData.append('etat', etat);
      formData.append('imageUrl', imageUrl);
      formData.append('matricule', matricule);
    return this.http.post<User>(`${this.endpoint}/register-user`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        localStorage.getItem('prenom')
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
