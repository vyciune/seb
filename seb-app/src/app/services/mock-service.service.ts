import { Injectable } from '@angular/core';

import {Filter} from "../model/filter";
import {DaoService} from "./dao.service";
import {Age} from "../model/age";
import {Income} from "../model/income";
import {Product} from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor(
    private dao: DaoService,
  ) {}

  listProducts(filter: Filter): string[] {
    let list: Product[] = [];

    const ageJson: Age = this.dao.getAgeJson();
    const incomeJson: Income = this.dao.getIncomeJson();

    const age = filter.age;
    const income = filter.income;

    if(age) {
      if (age === ageJson.minor) { // < 17
        list.push(this.getProductByName('Junior Saver Account'));
      } else { //age > 17
        if (filter.student) {
          list.push(this.getProductByName('Student Account'));
        }
        if (age === ageJson.retirement) {
          list.push(this.getProductByName('Senior Account'));
        }
        if(income) {
          if ([incomeJson.middle, incomeJson.lower, incomeJson.upper].includes(income)) { // income > 0
            list.push(this.getProductByName('Current Account'));
          }
          if (incomeJson.upper === income) {
            list.push(this.getProductByName('Current Account Plus'));
          }
          if ([incomeJson.zero, incomeJson.lower].includes(income)) {
            list.push(this.getProductByName('Debit Card'));
          }
          if ([incomeJson.upper, incomeJson.middle].includes(income)) {
            list.push(this.getProductByName('Credit Card'));
          }
          if (incomeJson.upper === income) {
            list.push(this.getProductByName('Gold Credit Card'));
          }
        }
      }
    }

    return this.getValuesFromJsonArray(list);
  }

  getProductByName(name: string): Product {
    return this.dao.getProductByName(name);
  }

  getAgeValueList(): string[] {
    return this.getListFromJson(this.dao.getAgeJson());
  }

  getIncomeValueList(): string[] {
    return this.getListFromJson(this.dao.getIncomeJson());
  }

  getValuesFromJsonArray(list: Product[]): string[] {
    return list.map(x => Object.values(x)[0]);
  }

  getListFromJson(json: {}): string[] {
    return Object.values(json);
  }
}
