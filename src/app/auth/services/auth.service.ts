import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = environments.baseUrl
  private user?: User

  get currentUser():User | undefined {
    if(!this.user) return undefined
    return structuredClone(this.user)
  }

  checkAuthenticatoin():Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false)
    const token = localStorage.getItem('token')
    let url = `${this.baseUrl}/users/1`
    return this.http.get<User>(url).pipe(
      tap(user => this.user = user ),
      map(user => !!user),
      catchError(error => of(false))
    )
  }

  login(email:string, password:string):Observable<User> {
    let url = `${this.baseUrl}/users/1`
    return this.http.get<User>(url)
      .pipe(
        tap(user => this.user = user),
        // tap(user => localStorage.setItem('token', user.id.toString()) )
        tap(user => localStorage.setItem('token', 'jsdafj231.534fgds.5435rd') )
      )
  }


  logOut():void {
    this.user = undefined
    localStorage.clear()
  }

}

