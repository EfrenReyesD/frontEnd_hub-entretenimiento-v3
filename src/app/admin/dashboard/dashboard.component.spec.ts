import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar módulo de pruebas para HttpClient
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent, // Importa el componente standalone directamente
        SideBarComponent,
        HeaderComponent,
        RouterOutlet,
        HttpClientTestingModule // Incluye el módulo para pruebas de HttpClient
      ],
      providers: [
        // Mock de ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: of(new Map<string, string>()) // Simular un ActivatedRoute snapshot vacío
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta los cambios después de crear el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SideBarComponent', () => {
    const sidebarElement = fixture.nativeElement.querySelector('app-side-bar');
    expect(sidebarElement).toBeTruthy(); // Verifica que el componente Sidebar está presente
  });


  it('should render RouterOutlet', () => {
    const routerOutletElement = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy(); // Verifica que el RouterOutlet está presente
  });
});
