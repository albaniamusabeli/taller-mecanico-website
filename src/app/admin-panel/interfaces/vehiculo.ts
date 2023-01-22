import { Cliente } from "./cliente";

export interface Marca {

    id: number;
    nombre: string;
    creado?: string;
    actualizado?: string;
}

export interface Modelo {

    id: number;
    nombre: string;
    creado?: string;
    actualizado?: string;
    marca: Marca

}

export interface Vehiculo {
    id: number;
    modelo: Modelo,
    cliente: Cliente,
    patente: string,
    annio: number,
    creado?: string;
    actualizado?: string;
}

export interface VehiculoPOST {
    patente: string,
    annio: number,
    modelo: number,
    cliente: string,
}





