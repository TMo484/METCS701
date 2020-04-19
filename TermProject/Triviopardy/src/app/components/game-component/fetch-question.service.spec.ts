import { TestBed } from '@angular/core/testing';

import { FetchQuestionService } from './fetch-question.service';

describe('FetchQuestionService', () => {
  let service: FetchQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
