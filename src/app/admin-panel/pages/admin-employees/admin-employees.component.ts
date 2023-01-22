import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalEmployeeComponent } from '../../components/modal-employee/modal-employee.component';
import { Empleado } from '../../interfaces/empleado';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss']
})
export class AdminEmployeesComponent implements OnInit {

  // Lista de empledados
  listaEmpleados: Empleado[] = []

  // Columnas de la tabla empleados
  displayedColumns: string[] = [
    'nombreCompleto', 'run',
    'telefono', 'correo', 'cargo',
    'fechaRegistro', 'acciones'
  ];

  // Inicializar paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // dataSorce tabla
  dataSource = new MatTableDataSource(this.listaEmpleados)

  constructor(
    private empleadoService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Llamar a método obtenerEmpleados -> listar datos
    this.obtenerEmpleados()
  }

  // Obetener todos los empleados y agregarlos a la tabla
  obtenerEmpleados() {
    // Llamar metodo desde el servicio
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data: Empleado[]) => {
        console.log(data);

        this.listaEmpleados = data
        //Agregar a dataSource el arrray listaEmpleados
        this.dataSource = new MatTableDataSource(this.listaEmpleados)
        // Agregar paginador a dataSource
        this.dataSource.paginator = this.paginator


      }
    })
  }


  /* Eliminar empleado */
  eliminarEmpleado(id: number) {

    Swal.fire({
      title: '¿Está seguro de eliminar este empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar empleado'
    }).then((result) => {
      // si el usuario confirma eliminación
      if (result.isConfirmed) {

        this.empleadoService.eliminarEmpleado(id).subscribe({
          next: (data: any) => {
            //console.log(data);

            Swal.fire(
              'Borrado',
              data.message,
              'success'
            )
            this.obtenerEmpleados();

          },
          error: (error) => {
            console.log(error);
            Swal.fire(
              'Lo sentimos',
              'No se pudo eliminar al empleado',
              'info'
            )

          }
        })

      }
    })

  }

  /* FILTRO */
  // Filtrar po Servicios
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /* MODAL */

  //Abrir modal Empleados
  abrirModal() {
    this.dialog.open(ModalEmployeeComponent, {
      width: '60%'
    })
      .afterClosed().subscribe(valor => {
        if (valor == 'agregado') {
          this.obtenerEmpleados();
          // Mensaje: empleado agregado
          Swal.fire({
            icon: 'success',
            title: 'Empleado agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            Swal.fire({
              title: 'Deseas agregar un nuevo empleado',
              text: "Si deseas puedes continuar agregando empleados",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Agregar y continuar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.abrirModal();
              }
            })
          })
        }
      })
  }

  // Abrir modal para actualizaciones
  editarModal(element: any) {

    this.dialog.open(ModalEmployeeComponent, {
      width: '60%',
      data: element // El modal va con datos del objeto servicio
    })
      .afterClosed().subscribe(valor => {
        if (valor == 'actualizado') {
          this.obtenerEmpleados()
        }
      })
  }


}
