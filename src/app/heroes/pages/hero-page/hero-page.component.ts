import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { delay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{

  constructor(
    private activatedRoute:ActivatedRoute,
    private heroService:HeroService,
    private router: Router) {}

  public hero?: Hero
  private id!: string | null

  // ngOnInit(): void {
  //   this.activatedRoute.paramMap
  //     .subscribe(params => {
  //       this.id = params.get('id');
  //       if (!this.id) throw Error('id no existe');
  //       this.heroService.getHeroById(this.id)
  //         .subscribe(hero => this.hero = hero );
  //     });

  //   if(!this.hero) throw Error('el hero no existe')

  //   console.log(this.id, this.hero);
  // }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(3000),
        switchMap(({id}) => this.heroService.getHeroById(id))
      ).subscribe((hero) => {
        if(!hero) {
          this.router.navigate(['/heroes/list'])
          return
        }
        this.hero = hero
        return
      })

    console.log(this.id, this.hero);
  }

  public goBack():void {
    // this.router.navigate(['/heroes/list'])
    this.router.navigateByUrl('heroes/list')
  }

}
