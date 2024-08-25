import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet] // Importa el componente y los módulos necesarios
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it('should have a title', () => {
    expect(component.title).toEqual('hub-entretenimiento'); // Verifica que la propiedad title está correctamente inicializada
  });
});
