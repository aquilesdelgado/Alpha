import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPelisComponent } from './preview-pelis.component';

describe('PreviewPelisComponent', () => {
  let component: PreviewPelisComponent;
  let fixture: ComponentFixture<PreviewPelisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPelisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
