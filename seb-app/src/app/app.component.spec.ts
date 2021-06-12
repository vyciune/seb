import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('loadProductsList', () => {
    component.filter = {age: '0-17', student: true}
    component.loadProductList();
    expect(component.productList).toEqual(['Junior Saver Account']);
  })

  it('sessionStorage init', () => {
    expect(component.filter).toEqual({age: '', student: false, income: ''});
    window.sessionStorage.setItem('filter', JSON.stringify({age: '23', student: true, income: '12'}));
    component.ngOnInit();
    expect(component.filter).toEqual({age: '23', student: true, income: '12'});
  })
});
