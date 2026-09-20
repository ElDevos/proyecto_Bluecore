import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud';

describe('SolicitudService', () => {
  let service: SolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SolicitudService);
  });

  it('se crea correctamente', () => {
    expect(service).toBeTruthy();
  });
});
