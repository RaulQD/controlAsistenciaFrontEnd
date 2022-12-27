import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.setting';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../interface/area.interface';



const baseUrl = AppSettings.API_ENDPOINT + '/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }


  getArea():Observable<Area[]>{
    return this.http.get<Area[]>(baseUrl + '/listar');
  }
  getAreaPage(page:number,size:number,order:string,asc:boolean):Observable<any>{
    return this.http.get<any>(baseUrl + `/area?page=${page}&size=${size}&order=${order}&asc=${asc}` );
  }
  getAreaById(id:string):Observable<Area>{
    return this.http.get<Area>(baseUrl + '/buscar/' + id);
  }
  postArea(area:Area):Observable<any>{
  return this.http.post<any>(baseUrl + '/registrar',area);
  }
  putArea(id:string,area:Area):Observable<any>{
    return this.http.put<any>(baseUrl +'/actualizar/'+id,area);
  }
  deleteArea(id:any):Observable<any>{
    return this.http.delete<any>(baseUrl + '/eliminar/'+ id);
  }
}
