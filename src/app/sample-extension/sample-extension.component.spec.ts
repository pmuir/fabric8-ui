import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { SampleExtensionComponent } from './sample-extension.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      SampleExtensionComponent
    ]
  }));

  it('should log ngOnInit', inject([SampleExtensionComponent], (extension: SampleExtensionComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    extension.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
