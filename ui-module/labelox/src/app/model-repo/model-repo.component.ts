import { ActionTypes, GridConfig, GridData } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelActionDispatcher } from 'src/action-dispatcher/ModelActionDispatcher';
import { ModelRepoSlim } from '../slim/ModelRepoSlim';

@Component({
  selector: 'app-model-repo',
  templateUrl: './model-repo.component.html',
  styleUrls: ['./model-repo.component.css']
})
export class ModelRepoComponent implements OnInit, GridData {


  gridData: GridData = this;
  modelActionDispatcher = new ModelActionDispatcher(this);
  gridConfig = new GridConfig();

   data=[{
    id:"1"  , name:"Article"

  }];

  constructor(private router:Router , private modelSlim:ModelRepoSlim) { }

  ngOnInit(): void {
    this.setGridConfiguration();
  }

  setGridConfiguration() {

    //set the grid Header
    this.gridConfig.setGridHeader = "Model Repo";

    //set page size
    this.gridConfig.setPageSize = 12;

    //Set the column configuration
    this.gridConfig.addColumnConfig("id", "Id", 1);
   
    this.gridConfig.addColumnConfig("name", "Name", 2);


    //Set the action token and tool configuration
    this.gridConfig.addActionsAndToolConfig("enableSearchPlaceholder", false, "toggle-to-searchbar");
    this.gridConfig.addActionsAndToolConfig("enableActionToolbar", true, "enable-action-toolbar");
    this.gridConfig.addActionsAndToolConfig("enableSearchToolBar", false, "enable-search-tool-bar");
    this.gridConfig.addActionsAndToolConfig("onRowClick", true, "on-row-click");

    //To enable Hover Action.
    this.gridConfig.addActionsAndToolConfig("modelSetting", false, 'model-setting', ActionTypes.hover, false, 'setting');
    


    //TO enable Core Action.
    this.gridConfig.addActionsAndToolConfig("createNewRepo", true, "create-new-repo", ActionTypes.core, true, "Create New Model");

    //To enable checkbox
    this.gridConfig.addActionsAndToolConfig("selectRow", false, '');

  }

  getFirstPage(id: number, pageSize: number): Promise<any> {
    return new Promise((resolve, reject) => {
        resolve(this.data);
    });
  }
  getNextPage(id: number, pageSize: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  onGridDataLoad(data: any): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Navigate to create new Repo
   */
  createNewRepo(){
      this.router.navigate(["./create"]);
  }

  /**
   * Navigates to modelSetting
   */
  modelSetting(){
    this.router.navigate(['./model-setting']);
  }


  /**
   * Open the selected model review page.
   * @param modelInfo Selected model.
   */
  openSelectedModel(modelInfo){
    this.modelSlim.setId=modelInfo['id'];
    this.modelSlim.setModelName=modelInfo['name'];
    this.router.navigate(['./review']);
  }

  
}
