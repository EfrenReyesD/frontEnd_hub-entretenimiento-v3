import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideBarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


}
