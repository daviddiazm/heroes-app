import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {

  constructor (private heroService:HeroService) {}

  ngOnInit(): void {
    this.heroService.getAllHeroes().subscribe()
  }

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Aniadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]
}
