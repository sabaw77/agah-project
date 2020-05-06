import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CompanyProductsComponent } from './company-products.component';
import { BehaviorSubject, of } from 'rxjs';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';
import { CommunicationService } from '../services/communication.service';

class communicationServiceStub {
  company: BehaviorSubject<CompanyDataBaseSimulationInterface> = new BehaviorSubject({
    name: null,
    id: null,
    phone: null,
    type: null,
    products: null

  });
}
describe('CompanyProductsComponent', () => {
  let component: CompanyProductsComponent;
  let fixture: ComponentFixture<CompanyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyProductsComponent],
      providers: [
        { provide: CommunicationService, useClass: communicationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
