import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../../app.setting';
import { JwtDto } from '../interface/jwt-dto.interface';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

const baseUrl = AppSettings.API_ENDPOINT + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena: string): Observable<JwtDto>
  {
    const body = { usuario, contrasena }
    return this.http.post<JwtDto>(baseUrl + '/login', body).pipe(
      map((response: any) =>
      {
        return response;
      })
    );
  }
}
