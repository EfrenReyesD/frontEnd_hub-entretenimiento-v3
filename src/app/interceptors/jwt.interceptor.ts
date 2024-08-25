import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Obtén el token del almacenamiento local
  const token = localStorage.getItem('jwt_token');

  // Clona la solicitud y agrega el encabezado Authorization si el token está presente
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // Pasa la solicitud al siguiente manejador
  return next(authReq);
};
