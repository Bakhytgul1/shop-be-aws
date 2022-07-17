import Product from "./models/product";
import * as products from './mocks/products.json';

export default class ProductServerice {
    constructor() { }

    async getProductsList(): Promise<Product[]> {
        return Promise.resolve(JSON.parse(JSON.stringify(products)).default);
    }

    async getProductsById(id: string): Promise<Product> {
        const product = JSON.parse(JSON.stringify(products)).default.find(item => item.id === id);
        return Promise.resolve(product);
    }
}