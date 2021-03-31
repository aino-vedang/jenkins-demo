import { TestBed } from '@angular/core/testing';

import { ScriptService } from './script.service';
import { HttpClientModule } from '@angular/common/http';
import { ScriptSlim } from '../slim/ScriptSlim';

describe('ScriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [ScriptService]
  }));

  it('should be created', () => {
    const service: ScriptService = TestBed.get(ScriptService);
    expect(service).toBeTruthy();
  });

  it('should get the script data', () => {
    const service: ScriptService = TestBed.get(ScriptService);
    expect(service).toBeTruthy();

    const mockScripts: ScriptSlim[] = [
      new ScriptSlim(179826, 'http://lavoce.ita.newsmemory.com/', 'Navigation', '' ,'', 'La voce dell\'Umbria', '19', null,0 , false, '2020-04-15 14:13:48', null, 1)
    ]

    service.getAllInDraftScripts().subscribe(scripts => {
      expect(scripts.length).toBe(1);
      expect(scripts).toEqual(mockScripts);
    })
    
  });
});
