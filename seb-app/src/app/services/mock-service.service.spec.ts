import { TestBed } from '@angular/core/testing';
import ageJson from '../data/age.json';
import incomeJson from '../data/income.json';

import { MockService } from './mock-service.service';
import {Filter} from "../model/filter";

describe('MockServiceService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getListFromJson', () => {
    const json =  {a: '1', b: '2'};
    expect(service.getListFromJson(json)).toEqual(['1','2']);
  })

  it('getValuesFromJsonArray', () => {
    const jsonArr = [{name: '1'}, {name: '2'}];
    expect(service.getValuesFromJsonArray(jsonArr)).toEqual(['1','2']);
  })

  it('listProducts', () => {
    const filter: Filter = {};
    expect(service.listProducts(filter)).toEqual([]);

    filter.age = ageJson.minor;
    expect(service.listProducts(filter)).toEqual(['Junior Saver Account']);

    filter.age = ageJson["middle-aged"];
    expect(service.listProducts(filter)).toEqual([]);

    filter.student = true;
    expect(service.listProducts(filter)).toEqual(['Student Account']);

    filter.income = incomeJson.zero;
    expect(service.listProducts(filter)).toEqual(['Student Account', 'Debit Card']);

    filter.income = incomeJson.lower;
    expect(service.listProducts(filter)).toEqual(['Student Account', 'Current Account', 'Debit Card']);

    filter.income = incomeJson.middle;
    expect(service.listProducts(filter)).toEqual(['Student Account', 'Current Account', 'Credit Card']);

    filter.income = incomeJson.upper;
    expect(service.listProducts(filter)).toEqual(['Student Account', 'Current Account', 'Current Account Plus', 'Credit Card', 'Gold Credit Card']);

    filter.age = ageJson.retirement;
    expect(service.listProducts(filter)).toEqual(['Student Account', 'Senior Account', 'Current Account', 'Current Account Plus', 'Credit Card', 'Gold Credit Card']);
  })
});
