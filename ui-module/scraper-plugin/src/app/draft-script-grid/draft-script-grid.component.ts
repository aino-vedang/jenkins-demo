import { Component, Inject, OnInit } from '@angular/core';
import { ActionTypes, GridConfig, GridData } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { ScriptActionDispatcher } from 'src/action-dispatcher/ScriptActionDispatcher';
import { ScraperService } from 'src/server-integration/Impl/ScraperService.js';
import { Router } from '@angular/router';

/**
 * @author : nandita@ainosoft.com
 */
@Component({
  selector: 'app-draft-script-grid',
  templateUrl: './draft-script-grid.component.html',
  styleUrls: ['./draft-script-grid.component.css']
})
export class DraftScriptGridComponent implements OnInit, GridData {

  gridData: GridData;
  scriptActionDispatcher = new ScriptActionDispatcher(this);
  gridConfig = new GridConfig();

  // Transformer scraper service
  scraperService = new ScraperService();

  previousId = 0;

  constructor(@Inject(Router) private router: Router) {
    this.gridData = this;
    this.scriptActionDispatcher = new ScriptActionDispatcher(this);
  }

  ngOnInit() {
    this.setGridConfigurations();
  }

  public setGridConfigurations(): void {

    //Set the grid Header
    this.gridConfig.setGridHeader = "Script";

    //Set page size
    this.gridConfig.setPageSize = 10;

    //Set the column configuration
    this.gridConfig.addActionsAndToolConfig("selectRow", true, '');
    this.gridConfig.addColumnConfig("scriptName", "Script Name", 1);
    this.gridConfig.addColumnConfig("areaName", "Area Name", 2);
    this.gridConfig.addColumnConfig("inUse", "In Use", 3);

    //Set the action token and tool configuration
    this.gridConfig.addActionsAndToolConfig("enableSearchPlaceholder", true, "toggle-to-searchbar");
    this.gridConfig.addActionsAndToolConfig("enableActionToolbar", true, "enable-action-toolbar");
    this.gridConfig.addActionsAndToolConfig("enableSearchToolBar", true, "enable-search-tool-bar");
    this.gridConfig.addActionsAndToolConfig("onRowClick", true, "on-row-click");

    //TO enable Core Action.
    this.gridConfig.addActionsAndToolConfig("addNewScript", true, "add-new-script", ActionTypes.core, false, "Add New Script");
  }

  /**
   * Fetches first set of in-draft scripts by paging.
   * @param id script id
   * @param pageSize number of records
   */
   public getFirstPage(id: number, pageSize: number): Promise<any> {

    let promise = this.scraperService.getScriptInDraftByPage(0, pageSize).setServiceName('Scraper').post('/getScriptInDraftByPage');
    promise.then(
      result => {
        this.previousId = result[Object(result).length -1].id;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
    return promise;
  }

  /**
    * Fetches next set of in-draft scripts by paging.
    * @param id previous script record id
    * @param pageSize number of records
    */
   public getNextPage(id: number, pageSize: number): Promise<any> {
    let promise = this.scraperService.getInDraftScriptByPage(this.previousId, pageSize).setServiceName('Scraper').post('/getScriptInDraftByPage');
    promise.then(
      result => {
        this.previousId = result[Object(result).length - 1].id;
      },
      error => {
        console.log(error);
      }
    );
    return promise;
  }

  /**
   * Determines whether grid data load on.
   * @param data grid data
   * @returns grid data load or null
   */
   public onGridDataLoad(data: any): void {
    return null;
  }

  public addNewScript(): void {
    this.router.navigate(['/addEditScript']);
  }

  public onRowClick(value): void {
    this.router.navigate(['/addEditScript'], {state: {data: value}});
  }

}
