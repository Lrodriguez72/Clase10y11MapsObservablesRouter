import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Observable } from 'rxjs';
import { Estudiante } from '../../tablas.component';

@Component({
  selector: 'app-estudiante-detalle',
  templateUrl: './estudiante-detalle.component.html',
  styleUrls: ['./estudiante-detalle.component.scss']
})
export class EstudianteDetalleComponent {
  estudiante$: Observable<Estudiante | null>;

  constructor(private activatedRoute: ActivatedRoute, private estudiantesService: EstudiantesService) {

    const estudianteId = Number(this.activatedRoute.snapshot.params['id']);

    this.estudiante$ = this.estudiantesService.obtenerEstudiantePorId(estudianteId)
  }
}
