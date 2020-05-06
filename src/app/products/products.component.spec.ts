import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { Observable, BehaviorSubject, empty, of } from 'rxjs';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';
import { CommunicationService } from '../services/communication.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: CommunicationService, useClass: communicationServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be showProductForm is true when runs showModal', () => {
    expect(component.showProductForm).toBeFalsy();
    component.showModal()
    expect(component.showProductForm).toBeTruthy();
  });
  it('should be showProductForm is false when runs closeModal', () => {
    component.showProductForm = true;
    expect(component.showProductForm).toBeTruthy();
    component.closeModal()
    expect(component.showProductForm).toBeFalsy();
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
  it('should load product list form the server', fakeAsync(() => {
    let service = TestBed.inject(CommunicationService);
    let spy = spyOn(service, 'get').and.returnValue(
      of([1, 2])
    );
    component.ngOnInit();
    expect(component.productList.length).toBe(2);
    expect(spy.calls.any()).toEqual(true);
  }))

  it('should generate id for product and push product to productList when called addProduct', () => {
    let product = {};
    let values = {
      index: 0,
      value: product
    }
    let companyList = component.companyList = [{
      "name": "Company",
      "id": 3,
      "phone": 54469747946,
      "type": "food products"

    }]
    let productList = component.productList = [{
      "title": "product",
      "id": 3,
      "companyId": 10,
      "productionُTime": new Date(),
      "status": "active"

    },
    {
      "title": "product",
      "id": 4,
      "companyId": 41,
      "productionُTime": new Date(),
      "status": "active"

    }]
    component.addProduct(values);

    expect(product['id']).toBe(3);
    expect(productList.length).toEqual(3);
    expect(companyList[0]['products']).toBe(productList);


  })

});
