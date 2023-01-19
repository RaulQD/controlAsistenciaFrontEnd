import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
    providedIn: 'root'
})
export class TokenService
{
    roles: Array<string> = [];

    constructor() { }

    setToken(token: string): void
    {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    getToken(): any
    {
        return window.localStorage.getItem(TOKEN_KEY);
    }
    setUsername(username: string): void
    {
        window.localStorage.removeItem(USERNAME_KEY);
        window.localStorage.setItem(USERNAME_KEY, username);
    }
    getUsername(): any
    {
        return window.localStorage.getItem(USERNAME_KEY);
    }
    setAuthorities(authorities: string[]): void
    {
        window.localStorage.removeItem(AUTHORITIES_KEY);
        window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }
    getAuthorities(): string[]
    {
        this.roles = [];
        if (localStorage.getItem(AUTHORITIES_KEY)) {
            JSON.parse(localStorage.getItem(AUTHORITIES_KEY) || '{}').forEach((authority: any) =>
            {
                this.roles.push(authority.authority);
            });
        }
        return this.roles;
    }
    logOut()
    {
        window.localStorage.clear();
        window.location.reload();
    }
}