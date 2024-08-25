import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors, HttpInterceptor } from '@angular/common/http';
import { jwtInterceptor } from './app/interceptors/jwt.interceptor';
import { app } from '../server';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthService } from './app/core/services/auth.service';
import { AuthGuard } from './app/guards/auth.guard';


//bootstrapApplication(AppComponent, appConfig)
//  .catch((err) => console.error(err));




// Define cualquier configuración adicional aquí
const appConfig = {
  // Configuración específica si la tienes
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    // Otros proveedores si es necesario
    provideRouter(routes),
    provideHttpClient(),
    AuthService,
    AuthGuard
  ],
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
