import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/app.setting';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Usuario } from '../interface/usuario.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const baseUrl = AppSettings.API_ENDPOINT + '/empleado';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService
{

    header = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient, private router: Router) { }

    // getEmpleado(): Observable<Usuario[]>
    // {
    //     return this.http.get<Usuario[]>(baseUrl + '/empleados');
    // }

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
    getEmpleadoPage(page: number): Observable<any>
    {
        return this.http.get<any>(baseUrl + '/empleados/page/' + page).pipe(
            map((response: any) =>
            {
                response.content.forEach((usuario: { nombre: string; }) =>
                {
                    console.log(usuario.nombre)
                });
                return response;
            })
        );
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
        return this.http.post<any>(baseUrl + '/registrar', usuario).pipe(
            catchError(err =>
            {
                Swal.fire('Error al registrar', err.error.mensaje, 'error');
                return throwError(err);
            })
        );
    }
    putEmpleado(id: number, usuario: Usuario): Observable<any>
    {
        return this.http.put<any>(baseUrl + '/actualizar/' + id, usuario).pipe(
            catchError(err =>
            {
                Swal.fire('Error al actualizar', err.error.mensaje, 'error');
                console.log(err.error.mensaje);
                return throwError(err);
            })
        );
    }
    deleteEmpleado(id: number): Observable<any>
    {
        return this.http.delete<any>(baseUrl + '/eliminar/' + id).pipe(
            catchError(err =>
            {
                Swal.fire('Error al eliminar', err.error.mensaje, 'error');
                console.log(err.error.mensaje);
                return throwError(err);
            })
        );
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
