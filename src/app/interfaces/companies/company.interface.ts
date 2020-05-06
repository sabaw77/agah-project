import { ProductInterface } from '../products/product.interface';

export class CompanyInterface {
    name: string;
    phone: number;
    type: 'food products' | 'home appliances' | 'electronics';
    products?: ProductInterface[];
}

export class CompanyDataBaseSimulationInterface extends CompanyInterface {
    id: number;
}