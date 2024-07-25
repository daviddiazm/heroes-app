import { Component } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public heroes: Hero[] = []
  public searchInput = new FormControl('')
  public query?: string
  public selectedHero?:Hero

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  searchHero() {
    const value: string = this.searchInput.value || '';
    this.heroService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes)
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent ):void {
    if(!event.option.value){
      this.selectedHero = undefined
      return
    }
    const hero:Hero = event.option.value
    this.selectedHero = hero
    this.searchInput.setValue(hero.superhero)
  }



}
