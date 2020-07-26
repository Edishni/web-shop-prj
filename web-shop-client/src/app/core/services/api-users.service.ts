import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {
selectedUser:User;   /* for public usage */

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    console.log('get all products try');
    return this.http.get<User[]>(environment.apiUsers);
  }

  getById(id) : Observable<User>
  {
    return this.http.get<User>(`${environment.apiUsers}/${id}`)
  }

  addUser(post:User): Observable<User>{
      return this.http.post<User>(environment.apiUsers, post)
  }
  
  editUser(newuser:User): Observable<User>{
    return this.http.put<User>(`${environment.apiUsers}/${newuser.id}`,newuser)  
  }
  
  deleteUser(id:number): Observable<User>{
    return this.http.delete<User>(`${environment.apiUsers}/${id}`)
  }

 /*  findByName(name:string): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUsers}?name=${name}`);
  }
 */

}
