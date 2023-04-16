import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablasComponent } from './pages/tablas/tablas.component';
import { CardsComponent } from './pages/cards/cards.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';
import { EstudianteDetalleComponent } from './pages/tablas/pages/estudiante-detalle/estudiante-detalle.component';

const routes: Routes = [
  {
    // dashboard
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        // dashboard/tablas
        path: 'tablas',
        children: [
          // dashboard/tablas
          {
            path: '',
            component: TablasComponent,
          },
          // dashboard/tablas/:id
          {
            path: ':id',
            component: EstudianteDetalleComponent,
          }
        ]
      },
      // {
      //   // dashboard/tablas
      //   path: 'tablas/:id',
      //   component: EstudianteDetalleComponent,
      // },
      {
        // dashboard/cards
        path: 'cards',
        component: CardsComponent,
      },
      {
        // dashboard/formularios
        path: 'formularios',
        component: FormulariosComponent,
      },
      // {
      //   // Cualquier ruta que no coincida con las anteriormente definidas
      //   path: '**',
      //   redirectTo: 'tablas'
      // }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard',
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
