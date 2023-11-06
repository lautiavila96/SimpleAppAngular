import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleObjectService {
  private baseUrl = 'http://localhost:8080/restful/services/simple.SimpleObjects/actions/listAll/invoke';

  private baseUrl_FIND = 'http://localhost:8080/restful/services/simple.SimpleObjects/actions/findByName/invoke';

  private baseUrl_POST = 'http://localhost:8080/restful/services/simple.SimpleObjects/actions/';

  private baseUrl_DELETE = 'http://localhost:8080/restful/objects/simple.SimpleObject';


  constructor(private http: HttpClient) {}
 
 
 
 
  createSimpleObject(name: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Content-Type': 'application/json',
    });
    const requestBody = {
      name: {
        value: name,
      },
    };
    return this.http.post(this.baseUrl_POST + 'create/invoke', requestBody, { headers });
  }

  findSimpleObjectsByName(name: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      'Authorization': 'Basic c3ZlbjpwYXNz',
      'Content-Type': 'application/json',
    });

    const requestBody = {
      name: {
        value: name,
      },
    };

    const options = {
      headers,
      params: new HttpParams().set('name', name),
      body: JSON.stringify(requestBody),
    };

    return this.http.request('GET', this.baseUrl_FIND, options);
  }


  deleteSimpleObject(id: number): Observable<any> {
    const deleteUrl = `${this.baseUrl_DELETE}/${id}/actions/delete/invoke`;

    const headers = new HttpHeaders({
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      'Authorization': 'Basic c3ZlbjpwYXNz',
    });

    // El cuerpo de la solicitud es vacío según la solicitud cURL que proporcionaste.
    const requestBody = {};

    return this.http.post(deleteUrl, requestBody, { headers });
  }


  listAllSimpleObjects(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json;profile=urn:org.apache.causeway/v2',
      'Authorization': 'Basic c3ZlbjpwYXNz',
    });

    return this.http.get(this.baseUrl, { headers });
  }
}
