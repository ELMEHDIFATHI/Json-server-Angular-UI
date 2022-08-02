import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postProject(data :any){
    return this.http.post<any>("http://localhost:3000/productList/",data)
  }

  getProject(){
    return this.http.get<any>("http://localhost:3000/productList/")
  }

  putProject(data:any,id:number){
    return this.http.get<any>("http://localhost:3000/productList/"+id,data)
  }

  deleteProject(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id)
  }
}
