import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverPicturesComponent } from './discover-pictures.component';

describe('DiscoverPicturesComponent', () => {
  let component: DiscoverPicturesComponent;
  let fixture: ComponentFixture<DiscoverPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
