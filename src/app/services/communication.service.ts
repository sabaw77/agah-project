import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  company: BehaviorSubject<CompanyDataBaseSimulationInterface> = new BehaviorSubject({
    name: null,
    id: null,
    phone: null,
    type: null,
    products: null

  });
  url: string;
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url);
  }

}
