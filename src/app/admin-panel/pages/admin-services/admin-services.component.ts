import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalServiceComponent } from '../../components/modal-service/modal-service.component';
import { ServicioBack } from '../../interfaces/Servicios';
import { TallerService } from '../../services/taller.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss']
})
export class AdminServicesComponent implements OnInit {

  // inicializar lista de servicios
  listaServicios: ServicioBack[] = []

  // Columnas de la tabla
  displayedColumns: string[] = ['servicio', 'categoria', 'fechaCreado', 'fechaActualizado', 'acciones'];
  dataSource = new MatTableDataSource(this.listaServicios)

  // Inicializar paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tallerService: TallerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Llamar a función obtenerServicios
    this.obtenerServicios();
  }

  obtenerServicios() {
    // Metodo GET servicio
    this.tallerService.obtenerServicios().subscribe({
      next: (data: ServicioBack[]) => {
        //console.log(data);
        // Agregar la data de sde el backend a listaServicios
        this.listaServicios = data
        //Argegar a dataSource el arrray listaServicios
        this.dataSource = new MatTableDataSource(this.listaServicios)
        // Agregar paginador a dataSource
        this.dataSource.paginator = this.paginator

      }
    })
  }

  // Filtrar po Servicios
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // MODAL SERVICIO
  abrirModal() {

    console.log('Abrir modal');

    this.dialog.open(ModalServiceComponent, {
      width: '50%'
    })
      // Afterclosed => Accion que se ejecuta cuando se cierra el modal
      .afterClosed().subscribe(valor => {
        if (valor === 'agregado') {
          this.obtenerServicios(); // Obtener datos => Actualiza la tabla
          // Mensaje confirmando la adición de un nuevo servicio
          Swal.fire({
            icon: 'success',
            title: 'Servicio agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            Swal.fire({
              title: 'Deseas agregar un nuevo servicio',
              text: "Si deseas puedes continuar agregando servicios",
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

  // MODAL editar servicio
  /* Al abrir el modal para editar,tendrá como parametro los datos => element */
  editarModal(element: any) {
    // Abrir modal
    this.dialog.open(ModalServiceComponent, {
      width: '50%',
      data: element // El modal va con datos del objecto servicio
    })
      // Afterclosed => Accion que se ejecuta cuando se cierra el modal
      .afterClosed().subscribe(valor => {
        if (valor === 'actualizado') {
          this.obtenerServicios() // Obtener datos => Actuliza la tabla
        }
      })
  }

  // Eliminar servicio
  eliminarServicio(id: number) {

    // SweetAlert - confimación para borrar servicio
    Swal.fire({
      title: '¿Está seguro de borrar el servicio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar servicio'
    }).then((result) => {
      // si el usuario confirma eliminación
      if (result.isConfirmed) {

        this.tallerService.eliminarServicio(id).subscribe({
          next: (data: any) => {
            console.log(data);

            Swal.fire({
              title: 'Borrado',
              text: data.message,
              icon: 'success',
              customClass: 'Custom_Button'
            }).then(() => {
              this.obtenerServicios();
            })
          },
          error: (error) => {
            console.log(error);
            Swal.fire(
              'Lo sentimos',
              'No se pudo deshabilitar el servicio',
              'info'
            )

          }
        })

      }
    })


  }

}
