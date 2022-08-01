import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { globalApi } from './globalApi';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private baseUrl = environment?.baseUrl;

  constructor(private http: HttpClient) { }

  getUserList(){
   return this.http.get(this.baseUrl + globalApi?.GET_LIST_USERS);
  }
  deleteUserList(){
    return this.http.delete(this.baseUrl + globalApi?.DELETE_LIST_USERS);
  }
  updateList(name, job){
    return this.http.put(this.baseUrl + globalApi?.UPDATE_LIST_USERS, name, job);
  }
  addUserList(id){
    return this.http.post(this.baseUrl + globalApi?.UPDATE_LIST_USERS, id);
  }
}
