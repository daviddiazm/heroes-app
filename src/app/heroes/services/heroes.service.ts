import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroService {

  private baseUrl: string = environments.baseUrl


  constructor(private http: HttpClient) {
    this.getAllHeroes()
  }

  getAllHeroes ():Observable<Hero[]> {
    let url = `${this.baseUrl}/heroes`
    return this.http.get<Hero[]>(url).pipe(
      tap(hero => {
        // console.log('la api ',hero);
      })
    )
  }

  getHeroById(id:string):Observable<Hero | undefined> {
    let url = `${this.baseUrl}/heroes/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        catchError(error => of(undefined))
      )
  }

  getSuggestions(query: string):Observable<Hero[]> {
    let url: string = `${this.baseUrl}/heroes?q=${query}&_limit=6`
    return this.http.get<Hero[]>(url)
      .pipe(
        catchError(e => of([]))
      )
  }

  addHero(hero: Hero):Observable<Hero> {
    let url:string = `${this.baseUrl}/heroes`
    return this.http.post<Hero>(url, hero)
  }

  updateById(hero: Hero):Observable<Hero> {
    const {id} = hero
    if (!id) throw Error('no existe heroe con ese id')
    let url:string = `${this.baseUrl}/heroes/${id}`
    return this.http.patch<Hero>(url, hero)
  }

  deleteById(id:string):Observable<boolean> {
    let url:string = `${this.baseUrl}/heroes/${id}`
    return this.http.delete(url).pipe(
      catchError(error => of(false)),
      map(resp => true)
    )
  }


}
