/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SavedfilesComponent } from './savedfiles.component';

describe('SavedfilesComponent', () => {
  let component: SavedfilesComponent;
  let fixture: ComponentFixture<SavedfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
