import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Estudiante } from '../tablas.component';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private estudiantes$ = of([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Sosa',
      fecha_registro: new Date()
    },
    {
      id: 2,
      nombre: 'Miriam',
      apellido: 'Paez',
      fecha_registro: new Date()
    },
    {
      id: 3,
      nombre: 'Cynthia',
      apellido: 'Coronel',
      fecha_registro: new Date()
    },
  ])

  constructor() { }

  obtenerEstudiantes(): Observable<Estudiante[]> {
    return this.estudiantes$
  }

  obtenerEstudiantePorId(id: number): Observable<Estudiante | null> {
    return this.estudiantes$.pipe(
      map((estudiantes) => estudiantes.find((s) => s.id === id) || null),
    )
  }
}
