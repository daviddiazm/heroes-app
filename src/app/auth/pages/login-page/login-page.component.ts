import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'] // Cambiado a styleUrls
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin():void {
    this.authService.login('hola@email.com', '123')
      .subscribe(user => {
        this.router.navigateByUrl('/heroes')
      })
  }

}
