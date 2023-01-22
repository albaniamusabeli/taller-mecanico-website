import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../interfaces/cliente';
import { ClientService } from '../../services/client.service';
import { ModalClientComponent } from '../../components/modal-client/modal-client.component';
import { ExporterService } from '../../services/exporter.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss']
})
export class AdminClientesComponent implements OnInit {

  // Columna de la tabla
  displayedColumns: string[] = [
    'nombreCompleto',
    'run',
    'telefono',
    'correo',
    'fechaDeRegistro',
    'acciones'
  ];

  // Inicializar lista de clientes
  listaClientes: Cliente[] = []

  // Inicializar dataSorce => datos de la tabla (array)
  dataSource = new MatTableDataSource(this.listaClientes);

  // Inicializar paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private exporterService : ExporterService

  ) { }

  ngOnInit(): void {
    this.obtenerClientes()
  }
  // Obtener array con todos los clientes
  obtenerClientes() {
    this.clientService.obtenerClientes().subscribe({
      next: (data: Cliente[]) => {
        this.listaClientes = data
        // asignar el array de clientes a dataSource
        this.dataSource = new MatTableDataSource(this.listaClientes);
        // Agregar paginador a dataSource
        this.dataSource.paginator = this.paginator


      }
    })
  }

  // Borrar un cliente de la tabla
  eliminarCliente(id:string){

    Swal.fire({
      title: '¿Está seguro de eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrar cliente'
    }).then((result) => {
      // si el usuario confirma eliminación
      if (result.isConfirmed) {

        this.clientService.eliminarCliente(id).subscribe({
          next: (data: any) => {
            //console.log(data);
            Swal.fire(
              'Borrado',
              data.message,
              'success'
            )
            this.obtenerClientes();
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

  // Filtrar
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* MODAL */

  //Abrir Modal - Agregar cliente
  abrirModalAgregar() {
    this.dialog.open(ModalClientComponent, {
      width: '60%',
    })
    .afterClosed().subscribe(valor => {
      if (valor == 'agregado') {
        this.obtenerClientes();
        // Mensaje: empleado agregado
        Swal.fire({
          icon: 'success',
          title: 'Cliente agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          Swal.fire({
            title: 'Deseas agregar un nuevo cliente',
            text: "Si deseas puedes continuar agregando clientes",
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
    this.dialog.open(ModalClientComponent, {
      width: '60%',
      data: element // El modal va con datos del objeto servicio
    })
      .afterClosed().subscribe(valor => {
        if (valor == 'actualizado') {
          this.obtenerClientes()
        }
      })
  }

  /*
  EXportar tabla a formato Microsoft EXCEL
  */
  exportarExcel(){
    this.exporterService.exportarExcel(this.dataSource.data, 'clientes');
  }

}
