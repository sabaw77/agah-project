import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';
import { ProductDataBaseSimulationInterface } from '../interfaces/products/product.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-company-products',
  templateUrl: './company-products.component.html',
  styleUrls: ['./company-products.component.scss']
})
export class CompanyProductsComponent implements OnInit, OnDestroy {
  products: ProductDataBaseSimulationInterface[] = []
  $unsubscribe;
  constructor(private communicationS: CommunicationService) { }

  ngOnDestroy(): void {
    this.$unsubscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    this.$unsubscribe = this.communicationS.company.subscribe((response: CompanyDataBaseSimulationInterface) => {
      this.products = response.products as ProductDataBaseSimulationInterface[];
    })
  }
}
