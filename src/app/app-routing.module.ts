import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyProductsComponent } from './company-products/company-products.component';


export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'company/:id', component: CompanyProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
