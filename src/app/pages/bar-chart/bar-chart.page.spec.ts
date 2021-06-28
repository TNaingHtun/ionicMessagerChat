import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarChartPage } from './bar-chart.page';

describe('BarChartPage', () => {
  let component: BarChartPage;
  let fixture: ComponentFixture<BarChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
