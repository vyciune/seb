import { TestBed } from '@angular/core/testing';

import { DaoService } from './dao.service';

describe('DaoService', () => {
  let service: DaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProductByName error', () => {
    expect(() => service.getProductByName('invalidName')).toThrow(new Error("product with invalidName not found"));
  })

  it('getProductByName error', () => {
    expect(service.getProductByName('Current Account')).toEqual({name: 'Current Account'})
  })
});
