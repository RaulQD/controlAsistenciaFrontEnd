import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { AppSettings } from 'src/app/app.setting';
import { Observable } from 'rxjs';
import { Empleado } from '../interface/empelado.interface';

const baseUrl = AppSettings.API_ENDPOINT + '/empleado';

@Injectable({
    providedIn:'root'
})
export class EmpleadoService{

    constructor(private http:HttpClient){}

    getEmpleado():Observable<Empleado[]>{
        return this.http.get<Empleado[]>(baseUrl + '/listar');
    }
    getEmpleadoById(id:string):Observable<Empleado>{
        return this.http.get<Empleado>(baseUrl + '/buscar/' + id)
    }
    getEmpleadoPage(page:number,size:number,order:string,asc:boolean):Observable<any>{
        return this.http.get<any>(baseUrl + `/empleado?page=${page}&size=${size}&order=${order}&asc=${asc}`)
    }
    postEmpleado(empleado:Empleado):Observable<any>{
        return this.http.post<any>(baseUrl + '/registrar', empleado);
    }
    putEmpleado(id:string,empleado: Empleado):Observable<any>{
        return this.http.put<any>(baseUrl + '/actualizar/' + id, empleado);
    }
    deleteEmpleado(id:string):Observable<any>{
        return this.http.delete<any>(baseUrl + '/eliminar/'+id);
    }
    downloadExcel(){
        return this.http.get(baseUrl + '/exportaExcel', {responseType:'blob'}, );
    }
}