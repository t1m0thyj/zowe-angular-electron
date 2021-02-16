import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFileComponent } from './job-file.component';

describe('JobFileComponent', () => {
  let component: JobFileComponent;
  let fixture: ComponentFixture<JobFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
