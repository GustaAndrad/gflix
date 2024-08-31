/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TvShowsComponent } from './tvShows.component';

describe('TvShowsComponent', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
