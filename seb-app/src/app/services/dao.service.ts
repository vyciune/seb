import { Injectable } from '@angular/core';
import productList from '../data/productList.json';
import ageJson from '../data/age.json';
import incomeJson from '../data/income.json';
import {Product} from "../model/product";
import {Age} from "../model/age";

@Injectable({
  providedIn: 'root'
})
export class DaoService {
  constructor() {}

  getAgeJson(): Age {
    return ageJson;
  }

  getIncomeJson(): {} {
    return incomeJson;
  }

  getProductByName(name: string): Product {
    const products: Product[] = productList;
    const product = products.find(x => x.name === name);
    if(product) {
      return product;
    }
    throw new Error(`product with ${name} not found`);
  }
}
