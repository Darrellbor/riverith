import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePromisesComponent } from './create-promises.component';

describe('CreatePromisesComponent', () => {
  let component: CreatePromisesComponent;
  let fixture: ComponentFixture<CreatePromisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePromisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
