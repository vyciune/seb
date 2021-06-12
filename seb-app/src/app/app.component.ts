import { Component } from '@angular/core';
import {MockService} from './services/mock-service.service';
import {Filter} from './model/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ageValueList: string[] = [];
  incomeValueList: string[] = [];
  productList: string[] = [];
  filter: Filter = {
    age: '',
    income: '',
    student: false,
  }


  constructor(private mockService: MockService) {
  }

  ngOnInit(): void {
    const values = window.sessionStorage.getItem('filter');
    if(values) {
      const valuesObj : Filter = JSON.parse(values);
      this.filter.age = valuesObj.age;
      this.filter.income = valuesObj.income;
      this.filter.student = valuesObj.student;
      this.loadProductList();
    }

    Promise.all([this.mockService.getAgeValueList(), this.mockService.getIncomeValueList()]).then(data => {
      this.ageValueList = data[0];
      this.incomeValueList = data[1];
    });
  }

  changes(): void {
    window.sessionStorage.setItem('filter', JSON.stringify(this.filter));
    this.loadProductList();
  }

  loadProductList() {
    this.productList = this.mockService.listProducts(this.filter);
  }

}
