import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLandingPageComponent } from './upload-landing-page.component';

describe('UploadLandingPageComponent', () => {
  let component: UploadLandingPageComponent;
  let fixture: ComponentFixture<UploadLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
