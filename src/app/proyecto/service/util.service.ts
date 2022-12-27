import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.setting';
import { Observable } from 'rxjs';
import { Area } from '../interface/area.interface';
import { Cargo } from '../interface/cargo.interface';


const baseUrlUtil = AppSettings.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor(private http:HttpClient) { }

  getArea():Observable<Area[]>{
    return this.http.get<Area[]>(baseUrlUtil + "/areas");
  }
  getCargo():Observable<Cargo[]>{ 
    return this.http.get<Cargo[]>(baseUrlUtil + "/cargos");
  }

}
