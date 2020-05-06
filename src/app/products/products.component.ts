import { Component, OnInit } from '@angular/core';
import { FormBuilderInterface } from '../interfaces/general/formBuilder.interface';
import { CommunicationService } from '../services/communication.service';
import { ProductDataBaseSimulationInterface } from '../interfaces/products/product.interface';
import { CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  showProductForm: boolean = false;
  productForm: FormBuilderInterface[] = [
    {
      formControlName: 'title',
      label: 'Title',
      validation: 'required',
      type: 'textBox',
      placeHolder: 'Adam'
    },
    {
      formControlName: 'companyId',
      label: 'Company ID',
      validation: 'required',
      type: 'number',
      placeHolder: ' 22'
    },
    {
      formControlName: 'productionTime',
      label: 'Production Time',
      validation: 'required',
      type: 'date'
    },
    {
      formControlName: 'status',
      label: 'Status',
      validation: 'required',
      type: 'radio',
      radioButtons: ['active', 'inactive']
    }
  ]
  productList: ProductDataBaseSimulationInterface[] = [];
  companyList: CompanyDataBaseSimulationInterface[] = [];
  constructor(private communicationS: CommunicationService) { }

  ngOnInit(): void {
    this.getCompanyList();
    this.getProductList();

  }
  getCompanyList() {
    this.communicationS.url = 'assets/companyList.json';
    this.communicationS.get().subscribe((response: CompanyDataBaseSimulationInterface[]) => {
      this.companyList = response;
    });
  }
  getProductList() {
    this.communicationS.url = 'assets/productList.json';
    this.communicationS.get().subscribe((response: ProductDataBaseSimulationInterface[]) => {
      this.productList = response;
    })
  }

  showModal() {
    this.showProductForm = true;
  }
  closeModal() {
    this.showProductForm = false;
  }

  addProduct(values) {
    let productInfo = values.value;
    productInfo['id'] = this.productList.length + 1;
    this.productList.push(productInfo);
    this.addProductToCompany(productInfo, values.index);
  }

  addProductToCompany(productInfo, index) {
    if (this.companyList[index]['products']?.length > 0) {
      this.companyList[index]['products'].push(productInfo);
    }
    else {
      this.companyList[index]['products'] = this.productList;
    }
  }

}
