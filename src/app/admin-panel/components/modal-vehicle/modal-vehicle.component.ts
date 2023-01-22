import { Component, Inject, OnInit } from '@angular/core';
import { Marca, Modelo } from '../../interfaces/vehiculo';
import { Cliente } from '../../interfaces/cliente'
import { VehicleService } from '../../services/vehicle.service';
import { ClientService } from '../../services/client.service'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-vehicle',
  templateUrl: './modal-vehicle.component.html',
  styleUrls: ['./modal-vehicle.component.scss']
})
export class ModalVehicleComponent implements OnInit {

  listaMarcas: Marca[] = [];
  listaModelos: Modelo[] = [];
  listaClientes: Cliente[] = []

  listaNombresMarcas: string[] = []


  // Título Modal
  tituloModal: string = 'Registrar un nuevo vehículo'
  // Boton Agregar- Editar
  boton: string = 'Agregar'



  constructor(
    private vehicleService: VehicleService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalVehicleComponent>, // Referencia de este componente Modal
    @Inject(MAT_DIALOG_DATA) public datoVehiculo: any, // datoServicio --> objeto element de la tabla
  ) { }

  // FormControl para el autocomplete
  control = new FormControl();

  //opciones filtradas = observable
  opcionesFiltradas!: Observable<string[]>;

  ngOnInit(): void {
    this.obtenerMarcas()
    this.obtenerModelos()
    this.obtenerClientes()

    this.opcionesFiltradas = this.control.valueChanges.pipe(
      startWith(''),
      map(valor => this._filter(valor))
    );

    if (this.datoVehiculo) {

      this.tituloModal = 'Editar información del vehículo'
      this.boton = "Editar"

      this.formularioVehiculo.controls['patente'].setValue(this.datoVehiculo.patente)
      this.formularioVehiculo.controls['annio'].setValue(this.datoVehiculo.annio)
      this.formularioVehiculo.controls['modelo'].setValue(this.datoVehiculo.modelo.id)
      this.formularioVehiculo.controls['cliente'].setValue(this.datoVehiculo.cliente.id)


    }
  }

  // Filtro de autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listaNombresMarcas.filter(option =>
      option.toLowerCase().includes(filterValue))
  }

  // Formualrio reactivo - Vehiculo
  formularioVehiculo = this.fb.group({

    patente: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    annio: ['', [Validators.required, Validators.min(1111), Validators.max(3000)]],
    modelo: ['', [Validators.required, Validators.max(999)]],
    cliente: ['', [Validators.required, Validators.minLength(3)]],

  })

  obtenerMarcas() {
    this.vehicleService.obtenerMarcas().subscribe({
      next: (data: Marca[]) => {
        this.listaMarcas = data

        this.listaMarcas.forEach(data => {
          this.listaNombresMarcas.push(data.nombre)
        })




      }
    })
  }

  obtenerModelos() {
    this.vehicleService.obtenerModelos().subscribe({
      next: (data: Modelo[]) => {
        this.listaModelos = data
        console.log(this.listaModelos);



      }
    })
  }

  obtenerClientes() {
    this.clientService.obtenerClientes().subscribe({
      next: (data: Cliente[]) => {
        this.listaClientes = data;
        console.log(this.listaClientes);

      }
    })
  }


  agregarEditarVehiculo() {
    if (!this.datoVehiculo) {
      this.agregarvehiculo()
    }
    else {
      this.editarVehiculo()
    }
  }

  agregarvehiculo() {
    console.log("FORMULARIO REACTIVO VEHICULO");
    console.log(this.formularioVehiculo.value);

    this.vehicleService.agregarVehiculo(this.formularioVehiculo.value).subscribe({
      next: (data: any) => {
        //console.log(data);
        this.formularioVehiculo.reset()
        this.dialogRef.close('agregado')
      }
    })

  }

  editarVehiculo() {
    this.vehicleService.editarVehiculo(this.formularioVehiculo.value, this.datoVehiculo.id)
      .subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'info',
            title: 'Datos del vehículo actualizados',
            showConfirmButton: false,
            timer: 1660
          })
          this.dialogRef.close('actualizado')

        }
      })
  }


  /* AUTOCOMPLETE MARCAS */
  displayFn(subject: any) {
    return subject ? subject : undefined
  }

  displayFnModelo(subject: any) {
    return subject ? subject.nombre : undefined

  }

  displayFnCliente(subject: any) {
    return subject ? subject.p_nombre : undefined

  }

  onMarcaSelected(option: any) {
    console.log(option.value.id);
    this.listaModelos = this.listaModelos.filter(modelo => modelo.marca.nombre === option.value)
  }

  onModeloSelected(option: any) {
    console.log(option.value);
    this.formularioVehiculo.controls['modelo'].setValue(option.value.id)
    this.obtenerModelos()
  }

  onClienteSelected(option: any) {
    this.formularioVehiculo.controls['cliente'].setValue(option.value.id)

    console.log(option.value.id);
  }


  /* MODAL */
  cerrarModal() {
    this.dialogRef.close('cerrado'); // Valor "cerrado al cerrar el modal"
  }
}
