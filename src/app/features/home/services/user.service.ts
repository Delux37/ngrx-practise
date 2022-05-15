import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { NewUser } from "../../user-setting/model/add-user.state";
import { User } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    private url = environment.api.users;

    constructor(
        private http: HttpClient
    ) {};

    public fetchUsers(): Observable<User[]> {
        return this.http
            .get<{ [key: string]: User }>(this.url + '.json')
            .pipe(
                map(data => {
                    const keys = data ? Object.keys(data) : [];
                    const users: User[] = [];

                    keys.forEach(key => {
                        users.push({
                            ...data[key],
                            id: key
                        })
                    })
                    return users;
                })
            )
    }

    public deleteUser(id: string): Observable<any> {
        return this.http.delete(
            this.url + `/${id}.json`
        )
    }

    public addUser(user: NewUser): Observable<any> {
        return this.http.post(
            this.url + '.json',
            {
                ...user
            }
        )
    }

    public editUser(user: User): Observable<any> {
        return this.http.patch(
            this.url + `/${user.id}.json`,
            {
                ...user
            }
        )
    }
}