import { Component, inject } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router
} from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-shell',

  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './shell.html',

  styleUrls: ['./shell.scss'],
})

export class ShellComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  collapsed = false;

  toggleSidebar(): void {

    this.collapsed = !this.collapsed;
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/auth/login']);
  }

}