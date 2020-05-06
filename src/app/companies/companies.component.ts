import { Component, OnInit } from '@angular/core';
import { FormBuilderInterface } from '../interfaces/general/formBuilder.interface';
import { CompanyInterface, CompanyDataBaseSimulationInterface } from '../interfaces/companies/company.interface';
import { CommunicationService } from '../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  showCompanyForm: boolean = false;
  companyForm: FormBuilderInterface[] = [
    {
      formControlName: 'name',
      label: 'Name',
      validation: 'required',
      type: 'textBox',
      placeHolder: 'Adam'
    },
    {
      formControlName: 'phone',
      label: 'Phone',
      validation: 'required',
      type: 'number',
      placeHolder: ' +989999999999'
    },
    {
      formControlName: 'type',
      label: 'Type',
      validation: 'required',
      type: 'select',
      options: ['food products', 'home appliances', 'electronics'],
      placeHolder: 'select type of company'
    }
  ]
  companyList: CompanyDataBaseSimulationInterface[] = [];
  constructor(private communicationS: CommunicationService, private route: Router) { }

  ngOnInit(): void {
    this.getCompanyList();
  }
  getCompanyList() {
    this.communicationS.url = 'assets/companyList.json';
    this.communicationS.get().subscribe((response: CompanyDataBaseSimulationInterface[]) => {
      this.companyList = response;
    });
  }

  showModal() {
    this.showCompanyForm = true;
  }
  closeModal() {
    this.showCompanyForm = false;
  }

  addCompany(companyInfo) {
    companyInfo['id'] = this.companyList.length + 1;
    this.companyList.push(companyInfo);
  }

  goToProductPage(company) {
    this.communicationS.company.next(company);
    this.route.navigate([`/company/${company.id}`]);
  }

}
