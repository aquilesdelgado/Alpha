import { TestBed } from '@angular/core/testing';

import { PelisDatosService } from './pelis-datos.service';

describe('PelisDatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PelisDatosService = TestBed.get(PelisDatosService);
    expect(service).toBeTruthy();
  });
});
