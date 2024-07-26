import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.heroService.getAllHeroes().subscribe()
  }

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Aniadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

  get user(): User | undefined {
    return this.authService.currentUser
  }

  onLogOut(): void {
    this.authService.logOut()
    this.router.navigate(['/auth'])
  }

}
