import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScriptSlim } from '../slim/ScriptSlim';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {

    const scripts = [
      new ScriptSlim(179828, '', 'http://edicoladigitale.editorialeoggi.info/editorialeoggi/books/latinaoggi/', true, '-', '-', 'Editoriale Oggi', 21),
      new ScriptSlim(179826, '', 'http://lavoce.ita.newsmemory.com/', true, '-', '-', 'La voce dell\'Umbria', 19),
    ];

    const publish = [
      new ScriptSlim(179826, '', 'http://edizionidigitali.netweek.it/dmedia/books/treviglio/', false, '-', '-', 'La voce dell\'Umbria', 19),
      new ScriptSlim(179828, '', 'https://quotidianodibari.it/profilo/', false, '-', '-', 'Editoriale Oggi', 21),
    ];

    const scriptTemplates = [
      'execution-element', 'locator', 'action-type', 'attribute-value', 'property', 'condition', 
      'then-execution', 'else-execution', 'parameter', 'repeat-execution'
    ]

    return { scripts, publish, scriptTemplates };
  }
}
