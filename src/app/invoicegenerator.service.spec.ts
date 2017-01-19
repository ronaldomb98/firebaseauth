/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvoicegeneratorService } from './invoicegenerator.service';

describe('InvoicegeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicegeneratorService]
    });
  });

  it('should ...', inject([InvoicegeneratorService], (service: InvoicegeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
