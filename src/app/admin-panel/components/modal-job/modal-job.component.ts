import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Servicio } from 'src/app/website/models/taller';
import { Empleado } from '../../interfaces/empleado';
import { Vehiculo } from '../../interfaces/vehiculo';
import { EmployeeService } from '../../services/employee.service';
import { TallerService } from '../../services/taller.service';
import { VehicleService } from '../../services/vehicle.service';
import { JobService } from '../../services/job.service';
import { map, Observable, startWith } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-job',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.scss']
})
export class ModalJobComponent implements OnInit {

  // Título Modal
  tituloModal: string = 'Registrar un nuevo Trabajo'
  // Boton Agregar- Editar
  textoBoton: string = 'Agregar'

  // Inicializar listas de vehiculos, servicios y empleados
  listaVehiculos: Vehiculo[] = []
  listaServicios: Servicio[] = []
  listaEmpleados: Empleado[] = []

  listaPatentes: string[] = []

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private vehicleService: VehicleService,
    private tallerService: TallerService,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private dialogRef: MatDialogRef<ModalJobComponent>, // Referencia de este componente Modal
    @Inject(MAT_DIALOG_DATA) public datoTrabajo: any, // datoTrabajo --> objeto element de la tabla
  ) { }

  // FormControl para el autocomplete
  controlPatente = new FormControl();

  //opciones filtradas = observable
  patentesFiltradas!: Observable<string[]>;

  ngOnInit(): void {

    this.obtenerVehiculos()
    this.obtenerEmpleados()
    this.obtenerServicios()

    this.patentesFiltradas = this.controlPatente.valueChanges.pipe(
      startWith(''),
      map(valor => this._filterPatente(valor))
    );

    if (this.datoTrabajo) {
      this.tituloModal = 'Editar información del trabajo'
      this.textoBoton = 'Editar'

      this.controlPatente.setValue(this.datoTrabajo.vehiculo_patente) // enviar al input
      this.formularioTrabajo.controls['vehiculo'].setValue(this.datoTrabajo.vehiculo) // enviar al formualrio reactivo
      this.formularioTrabajo.controls['empleado'].setValue(this.datoTrabajo.empleado)
      this.formularioTrabajo.controls['servicio'].setValue(this.datoTrabajo.servicio)
      this.formularioTrabajo.controls['fecha'].setValue(this.datoTrabajo.fecha)
      this.formularioTrabajo.controls['valor'].setValue(this.datoTrabajo.valor)
      this.formularioTrabajo.controls['descripcion'].setValue(this.datoTrabajo.descripcion)

      console.log(this.formularioTrabajo.value);


    }

  }

  // Filtro de autocomplete
  private _filterPatente(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaPatentes.filter(option =>
      option.toLowerCase().includes(filterValue))
  }


  // Formalario Reactivo
  formularioTrabajo = this.fb.group({

    vehiculo: ['', [Validators.required]],
    servicio: ['', [Validators.required]],
    empleado: ['', [Validators.required]],
    descripcion: ['Sin observaciones',],
    valor: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  // Obtener todos los vehiculos
  obtenerVehiculos() {
    this.vehicleService.obtenerVehiculo().subscribe({
      next: (data: Vehiculo[]) => {
        this.listaVehiculos = data

        // Guardar todas las patentes en una lista para el filtrado del autocomplete
        this.listaVehiculos.forEach(data => {
          this.listaPatentes.push(data.patente)
        })

      },
      error: (error) => {
        console.log('Error obtenerVehiculo: ' + error);

      }
    })
  }

  // Obtener todos los servicios
  obtenerServicios() {
    this.tallerService.obtenerServicios().subscribe({
      next: (data: Servicio[]) => {
        this.listaServicios = data
      },
      error: (error) => {
        console.log('Error pbtenerServicio: ' + error);

      }
    })
  }

  obtenerEmpleados() {
    this.employeeService.obtenerEmpleados().subscribe({
      next: (data: Empleado[]) => {
        this.listaEmpleados = data
      },
      error: (error) => {
        console.log('Error obtenerEmpleado: ' + error);

      }
    })
  }

  agregarEditarTrabajo() {
    if (!this.datoTrabajo) {
      this.agregarTrabajo()
    }
    else {
      this.editarTrabajo()
    }
  }

  agregarTrabajo() {
    // Formatear fecha
    this.formularioTrabajo.controls['fecha'].
      setValue(this.datePipe.transform(this.formularioTrabajo.value.fecha, 'dd-MM-yyyy'));

    this.jobService.agregarTrabajo(this.formularioTrabajo.value)
      .subscribe({
        next: (data: any) => {
          //console.log(data);
          this.formularioTrabajo.reset()
          this.dialogRef.close('agregado')
        },
        // Error
        error: (error) => {
          console.log(error);

        }
      })

  }

  editarTrabajo() {
    // Formatear la fecha a dd=mm=yyyy
    this.formularioTrabajo.controls['fecha'].
      setValue(this.datePipe.transform(this.formularioTrabajo.value.fecha, 'dd-MM-yyyy'));

    this.jobService.editarTrabajo(this.formularioTrabajo.value, this.datoTrabajo.id)
      .subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'info',
            title: 'Datos del trabajo actualizados',
            showConfirmButton: false,
            timer: 1700
          })
          this.dialogRef.close('actualizado')
        }
      })
  }

  /*
    AUTOCOMPLETE
  */
  // Cuando slecciono la patente se ejecuta esta función
  onPatenteSelected(option: any) {
    // Mostrar patente en consola
    //console.log(option.value);
    // buscar objecto vehículo según su patente
    const vehiculo = this.listaVehiculos.find(vehiculo => vehiculo.patente === option.value)
    this.formularioTrabajo.controls['vehiculo'].setValue(vehiculo?.id)
    console.log(this.formularioTrabajo.value.vehiculo);
  }

  displayFnPatente(subject: any) {
    return subject ? subject : undefined
  }

  /* MODAL */
  cerrarModal() {
    this.dialogRef.close('cerrado'); // Valor "cerrado al cerrar el modal"
  }
}
