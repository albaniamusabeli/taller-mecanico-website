import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalVehicleComponent } from '../../components/modal-vehicle/modal-vehicle.component';
import { Vehiculo } from '../../interfaces/vehiculo';
import { VehicleService } from '../../services/vehicle.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-vehicles',
  templateUrl: './admin-vehicles.component.html',
  styleUrls: ['./admin-vehicles.component.scss']
})
export class AdminVehiclesComponent implements OnInit {

  listaVehiculos: Vehiculo[] = []

  displayedColumns: string[] = [
    'patente',
    'marca',
    'modelo',
    'annio',
    'rutCliente',
    'fechaCreado',
    'acciones',
  ];

  dataSource = new MatTableDataSource(this.listaVehiculos);

  // Inicializar paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog

    ) { }


  ngOnInit(): void {
    this.obtenerVehiculos()
  }

  // Obtener todos los objectos vehículos
  obtenerVehiculos() {
    this.vehicleService.obtenerVehiculo().subscribe({
      next: (data: Vehiculo[]) => {
        this.listaVehiculos = data
        this.dataSource = new MatTableDataSource(this.listaVehiculos);
        // Agregar paginador a dataSource
        this.dataSource.paginator = this.paginator

      }
    })
  }

  // Borrar un cliente de la tabla
  eliminarvehiculo(id:string){

    Swal.fire({
      title: '¿Está seguro de eliminar este vehículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar vehículo'
    }).then((result) => {
      // si el usuario confirma eliminación
      if (result.isConfirmed) {

        this.vehicleService.eliminarVehiculo(id).subscribe({
          next: (data: any) => {
            //console.log(data);

            Swal.fire(
              'Borrado',
              'Vehiculo eliminado',
              'success'
            )
            this.obtenerVehiculos();

          },
          error: (error) => {
            console.log(error);
            Swal.fire(
              'Lo sentimos',
              'No se pudo eliminar el vehículo',
              'info'
            )

          }
        })
      }
    })
  }


  // Filtrar
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* MODAL */

  //Abrir Modal - Agregar vehiculo
  abrirModalAgregar() {
    this.dialog.open(ModalVehicleComponent, {
      width: '60%',
      /* hasBackdrop: false // Evitar que se cierre el modal haciendo clic fuera de el */
    })
      .afterClosed().subscribe(valor => {
        if (valor == 'agregado') {
          this.obtenerVehiculos()
          // Mensaje confirmando la adición de un nuevo vehículo
          Swal.fire({
            icon: 'success',
            title: 'Vehículo agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            Swal.fire({
              title: 'Deseas agregar un nuevo vehículo',
              text: "Si deseas puedes continuar agregando vehículos",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Agregar y continuar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.abrirModalAgregar();
              }
            })
          })
        }
      })
  }

    // Abrir Modal - Editar Cliente
    editarModal(element:any){
      this.dialog.open(ModalVehicleComponent, {
        width: '60%',
        data: element // El modal va con datos del objeto servicio
      })
        .afterClosed().subscribe(valor => {
          if (valor == 'actualizado') {
            this.obtenerVehiculos()
          }
        })
    }

}
