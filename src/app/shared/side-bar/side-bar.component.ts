import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
    // Redirigir al usuario a la página de inicio de sesión
  }
}
