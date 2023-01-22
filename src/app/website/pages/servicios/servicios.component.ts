import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../models/taller';
import { BackTallerService } from '../../services/back-taller.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})


export class ServiciosComponent implements OnInit {

  // Array de servicios
  servicios: Servicio[] = [];
  loader = true;
  motores = [
    'Reemplazo del filtro de aire',
    'Revisar pérdidas de aceite',
    'Reemplazo de bujías'
  ];

  electricos = [
    'Chequeo sistema de carga',
    'Revisar y reparar bocina',
    'Reemplazo de batería'
  ];
  
  frenos = [
    'Reemplazo de líquido de freno',
    'Reemplazo de pastilla de freno',
    'Aseo y mantención de frenos'
  ];

  constructor(private servicioTaller: BackTallerService) { }

  ngOnInit(): void {

 /*    // LLamar al metodo para obeter todos los servicios y guardarlos en el array
    this.servicioTaller.obtenerServicios().subscribe({
      // Guardar el array que viene desde la API a variable data
      next: (data: Servicio[]) => {
        //console.log(data);
        this.loader = false;
        // Los datos son asignados al array vacío
        this.servicios = data;
        this.listarServicios();
      },
      error: (error) => {
        //console.log(error)
        this.servicios = [];
      }
    }) */

    //console.log(JSON.stringify(this.servicios));
  }
 /*  listarServicios(): void {
    this.frenos = this.servicios.filter(e => e.categoria.id == 1);
    this.electricos = this.servicios.filter(e => e.categoria.id == 2);
    this.motores = this.servicios.filter(e => e.categoria.id == 3);
  } */
}
