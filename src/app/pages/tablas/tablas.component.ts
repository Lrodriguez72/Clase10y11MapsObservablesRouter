import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from './services/estudiantes.service';

export interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  fecha_registro: Date;
}

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent implements OnInit {

  dataSource = new MatTableDataSource<Estudiante>();

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fecha_registro', 'eliminar', 'detalle'];


  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private estudiantesService: EstudiantesService,
  ) {}

  ngOnInit(): void {
    this.estudiantesService.obtenerEstudiantes()
      .subscribe((estudiantes) => {
        this.dataSource.data = estudiantes;
      })
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  crearEstudiante(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            ...valor,
            fecha_registro: new Date(),
            id: this.dataSource.data.length + 1,
          }
        ];
      }
    })
  }

  editarEstudiante(alumnoParaEditar: Estudiante): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar
      }
    })
    dialog.afterClosed().subscribe((dataDelAlumnoEditado) => {
      if (dataDelAlumnoEditado) {
        this.dataSource.data = this.dataSource.data.map(
          (alumnoActual) => alumnoActual.id === alumnoParaEditar.id
            ? ({ ...alumnoActual, ...dataDelAlumnoEditado})
            : alumnoActual,
        );
      }
    })
  }

  eliminarEstudiante(alumnoParaEliminar: Estudiante): void {
    this.dataSource.data = this.dataSource.data.filter(
      (alumnoActual) => alumnoActual.id !== alumnoParaEliminar.id,
    );
  }

  verDetalleDeAlumno(estudianteId: number): void {
    // this.router.navigate(['dashboard', 'tablas', estudianteId]);

    this.router.navigate([estudianteId], { relativeTo: this.activatedRoute });
  }
}
