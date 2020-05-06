import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CompaniesComponent } from './companies.component';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, empty, BehaviorSubject, of } from 'rxjs';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';

class communicationServiceStub {
  company: BehaviorSubject<CompanyDataBaseSimulationInterface> = new BehaviorSubject({
    name: null,
    id: null,
    phone: null,
    type: null,
    products: null

  });

  get(url): Observable<any> {
    return empty();
  }
};
class RouterStub {
  navigate(params) { }
}

describe('CompaniesComponent', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CompaniesComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: CommunicationService, useClass: communicationServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be showCompanyForm is true when runs showModal', () => {
    expect(component.showCompanyForm).toBeFalsy();
    component.showModal()
    expect(component.showCompanyForm).toBeTruthy();
  });
  it('should be showCompanyForm is false when runs closeModal', () => {
    component.showCompanyForm = true;
    expect(component.showCompanyForm).toBeTruthy();
    component.closeModal()
    expect(component.showCompanyForm).toBeFalsy();
  });
  it('should redirect the user to company page when called goToProductPage', () => {
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');
    let companyId = 2;
    component.goToProductPage({ id: 2 });
    expect(spy).toHaveBeenCalledWith([`/company/${companyId}`])
  });
  it('should load company list form the server', fakeAsync(() => {
    let service = TestBed.inject(CommunicationService);
    let spy = spyOn(service, 'get').and.returnValue(
      of([1, 2])
    );
    component.ngOnInit();
    expect(component.companyList.length).toBe(2);
    expect(spy.calls.any()).toEqual(true);
  }))
  it('should generate id for company and push company to companyList when called addCompany', () => {
    let company = {};
    let companyList = component.companyList = [{
      "name": "Company",
      "id": 3,
      "phone": 54469747946,
      "type": "food products"

    },
    {
      "name": "Company",
      "id": 4,
      "phone": 54469747946,
      "type": "food products"

    }]
    component.addCompany(company);

    expect(company['id']).toBe(3);
    expect(companyList.length).toEqual(3);
  })
})
