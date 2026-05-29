import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ventilators } from './ventilators';

describe('Ventilators', () => {
  let component: Ventilators;
  let fixture: ComponentFixture<Ventilators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ventilators],
    }).compileComponents();

    fixture = TestBed.createComponent(Ventilators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
