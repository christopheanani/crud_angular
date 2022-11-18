import { Injectable, ɵɵngDeclareClassMetadata } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) {}

    // Connect frontend to backend

  apiUrl = 'http://localhost:3000/city';

  // Get all data

  getAllData():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }


  // Create data
  createData(data:any):Observable<any>
  {
    console.log(data,'createapi=>');
    return this._http.post(`${this.apiUrl}`,data); 
  }


  // Delete Data
deleteData(id:any):Observable<any>
{
  let ids = id;
  return this._http.delete(`${this.apiUrl}/${ids}`);
}


// Update Data
updateData(data:any, id:any):Observable<any>
{
  let ids = id;
  return this._http.put(`${this.apiUrl}/${ids}`,data);
}

// Get Single Data
getSingleData(id:any):Observable<any>
{
  let ids = id;
  return this._http.get(`${this.apiUrl}/${ids}`);
}







}


