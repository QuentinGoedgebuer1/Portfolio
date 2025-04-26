import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActifComponent } from './create-actif.component';

describe('CreateActifComponent', () => {
  let component: CreateActifComponent;
  let fixture: ComponentFixture<CreateActifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateActifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
