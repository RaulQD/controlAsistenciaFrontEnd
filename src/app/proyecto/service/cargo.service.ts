import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.setting';
import { Cargo } from '../interface/cargo.interface';
import { Observable } from 'rxjs';


const baseUrl = AppSettings.API_ENDPOINT + '/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http:HttpClient) { }

    getCargo():Observable<Cargo[]>{
        return this.http.get<Cargo[]>(baseUrl + '/listar');
    }

}
