/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageControlService } from './message-control.service';

describe('MessageControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageControlService]
    });
  });

  it('should ...', inject([MessageControlService], (service: MessageControlService) => {
    expect(service).toBeTruthy();
  }));
});
