export class ProductInterface {
    title: string;
    companyId: number;
    productionُTime: Date;
    status: 'active' | 'inactive';
}
export class ProductDataBaseSimulationInterface extends ProductInterface {
    id: number;
}