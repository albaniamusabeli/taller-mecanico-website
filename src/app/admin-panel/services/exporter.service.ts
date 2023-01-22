import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import * as moment from 'moment';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'

const EXCEL_EXT = '.xlsx'
@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor() { }

  exportarExcel(json: any[], excelFileName: string) {
    // JSON a EXCEL
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    // Llamar a metodo => requiere el buffer y FileName
    this.guardarExcel(excelBuffer, excelFileName)

  }

  private guardarExcel(buffer:any, fileName:string){
    const data: Blob = new Blob([buffer], {type:EXCEL_TYPE});
    // Guardar archivo
    FileSaver.saveAs(data, fileName +'_'+ moment().format('DD-MM-YYYY') + EXCEL_EXT);
  }
}
