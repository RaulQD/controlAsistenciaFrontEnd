import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.setting';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { map, tap } from 'rxjs/operators';

const baseUrl = AppSettings.API_ENDPOINT + '/empleado';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService
{

    constructor(private http: HttpClient, private router: Router) { }

    getEmpleado(): Observable<Usuario[]>
    {
        return this.http.get<Usuario[]>(baseUrl + '/empleados');
    }

    getEmpleadoById(id: number): Observable<Usuario>
    {
        return this.http.get<Usuario>(baseUrl + '/buscar/' + id)
    }
    // getEmpledoByParams(nombre:string):Observable<any>{
    //     const params: HttpParams = new HttpParams().set('nombre',nombre);
    //     return this.http.get<any>(baseUrl+ '/buscarPorNombre',{params})
    //     .pipe(
    //        catchError(err =>{
    //         Swal.fire('Error al buscar', err.error.mensaje, 'error');
    //         console.log(err.error.mensaje);
    //         return throwError(err);
    //        })
    //     );
    // }   
    getEmpleadoPage(page: number, size: number, order: string): Observable<any>
    {
        return this.http.get<any>(baseUrl + `/empleados/page?page=${page}&size=${size}&order=${order}`)
    }
    // getEmpleadoPorNombre(filtro:string):Observable<Empleado[]>{
    //     return this.http.get<Empleado[]>(baseUrl + '/buscarNombre/' + filtro).pipe(
    //         map( res => res as Empleado[]),
    //         catchError(err =>{
    //             Swal.fire('Error al buscar', err.error.mensaje, 'error');
    //             console.log(err.error.mensaje);
    //             return throwError(err);
    //         })
    //     );
    // }
    postEmpleado(usuario: Usuario): Observable<any>
    {
        return this.http.post<any>(baseUrl + '/registrar', usuario);
    }
    putEmpleado(id: number, usuario: Usuario): Observable<any>
    {
        return this.http.put<any>(baseUrl + '/actualizar/' + id, usuario);
    }
    deleteEmpleado(id: string): Observable<any>
    {
        return this.http.delete<any>(baseUrl + '/eliminar/' + id);
    }
    downloadExcel()
    {
        return this.http.get(baseUrl + '/exportaExcel', { responseType: 'blob' },);
    }
    // updatePhoto(archivo: File, id:number):Observable<any>{
    //     let formData = new FormData();
    //     formData.append("archivo", archivo);
    //     formData.append("id", id.toString());
    //     return this.http.post<any>(baseUrl + '/upload', formData).pipe(
    //         map( (response:any) => response.empleado as Empleado),
    //         catchError(e =>{
    //             console.error(e.error.mensaje);
    //             Swal.fire('Error al subir la foto', e.error.mensaje, 'error');
    //             return throwError(e);
    //         })
    //     );
}
