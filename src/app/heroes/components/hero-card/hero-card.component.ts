import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent implements OnInit {

  @Input()
  public hero!:Hero

  public characters:string[] = []

  ngOnInit(): void {
    if(!this.hero ) throw Error('hero no exist');
    this.getCharacters()
  }

  getCharacters():void {
    this.characters = this.hero.characters.split(',')
  }

}
