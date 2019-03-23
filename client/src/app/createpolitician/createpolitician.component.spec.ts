import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepoliticianComponent } from './createpolitician.component';

describe('CreatepoliticianComponent', () => {
  let component: CreatepoliticianComponent;
  let fixture: ComponentFixture<CreatepoliticianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepoliticianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepoliticianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
