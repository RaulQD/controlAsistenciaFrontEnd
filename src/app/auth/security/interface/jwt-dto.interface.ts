
export interface JwtDto
{
    token: string;
    bearer: string;
    nombre: string;
    usuario: string;
    authorities: string[];
}