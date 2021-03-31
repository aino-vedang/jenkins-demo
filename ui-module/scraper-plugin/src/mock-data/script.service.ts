import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScriptSlim } from 'src/slim/ScriptSlim';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private scriptsUrl = 'api/scripts';
  private inUseScriptsUrl = 'api/publish';
  private scriptTemplates = 'api/scriptTemplates';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  constructor(@Inject(HttpClient) private httpClient: HttpClient) { }

  /**
   * fetches in-draft scripts: Observable call.
   */
  getAllInDraftScripts(): Observable<ScriptSlim[]> {
    return this.httpClient.get<ScriptSlim[]>(this.scriptsUrl);
  }

  /**
   * fetches in-use scriots: Observable call.
   */
  getAllPublishScripts(): Observable<ScriptSlim[]> {
    return this.httpClient.get<ScriptSlim[]>(this.inUseScriptsUrl);
  }

  /**
   * fetches script templates list: Observable call.
   */
  getScriptTemplatesList(): Observable<ScriptSlim[]> {
    return this.httpClient.get<ScriptSlim[]>(this.scriptTemplates);
  }
}
