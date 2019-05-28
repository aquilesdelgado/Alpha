import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinematecaComponent } from './cinemateca.component';

describe('CinematecaComponent', () => {
  let component: CinematecaComponent;
  let fixture: ComponentFixture<CinematecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinematecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinematecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
