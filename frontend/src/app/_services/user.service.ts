import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { environment } from '@environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  urlAPI = 'http://localhost:4000';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.urlAPI}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.urlAPI}/users/${id}`);
    }

    register(user: User) {
        return this.http.post( `${this.urlAPI}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.urlAPI}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.urlAPI}/users/${id}`);
    }
}
