import { routes } from "./app-routing.module";
import { CompanyProductsComponent } from './company-products/company-products.component';

describe('routes', () => {
    it('should contain a route for /company/:id', () => {
        expect(routes).toContain({ path: 'company/:id', component: CompanyProductsComponent });
    });
})