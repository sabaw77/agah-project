import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommunicationService } from './services/communication.service';
import { CompanyProductsComponent } from './company-products/company-products.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    ProductsComponent,
    HeaderComponent,
    ModalComponent,
    CompanyProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
