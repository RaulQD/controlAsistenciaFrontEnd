
export interface JwtDto
{
    token: string;
    bearer: string;
    nombreCompleto: string;
    usuario: string;
    authorities: string[];
}