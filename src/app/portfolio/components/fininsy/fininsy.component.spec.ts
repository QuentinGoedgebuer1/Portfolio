import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FininsyComponent } from './fininsy.component';

describe('FininsyComponent', () => {
  let component: FininsyComponent;
  let fixture: ComponentFixture<FininsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FininsyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FininsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
