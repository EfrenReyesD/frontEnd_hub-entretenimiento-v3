import { Routes } from "@angular/router"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { HomeComponent } from "./home/home.component"
import { PeliculaDetailComponent } from "../peliculas/pelicula-detail/pelicula-detail.component"
import { PeliculaListComponent } from "../peliculas/pelicula-list/pelicula-list.component"
import { SeriesListComponent } from "../series/series-list/series-list.component"
import { FavoritosComponent } from "../favoritos/favoritos.component"
import { ViewMediaComponent } from '../view-media/view-media.component';
import { AuthGuard } from "../guards/auth.guard"

export const ADMIN_ROUTES: Routes = [
  {
    //Estas protegidas las rutas
    path:'', component:DashboardComponent, canActivate: [AuthGuard], canActivateChild:[AuthGuard], children:[
      {
        path:'',
        component: HomeComponent,
      },
      {
        path:'Peliculas',
        component: PeliculaListComponent
      },
      {
        path:'Series',
        component: SeriesListComponent
      },
      {
        path:'Favoritos',
        component: FavoritosComponent
      },
      {
        path: 'Play',
        component: ViewMediaComponent
      }

    ]
  }

]
