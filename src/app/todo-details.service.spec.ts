import { TestBed, inject } from '@angular/core/testing';

import { TodoDetailsService } from './todo-details.service';

describe('TodoDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDetailsService]
    });
  });

  it('should be created', inject([TodoDetailsService], (service: TodoDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
