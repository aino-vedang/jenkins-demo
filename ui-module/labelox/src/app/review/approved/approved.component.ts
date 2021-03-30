import { ActionTypes, GridConfig, GridData } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { Component, OnInit } from '@angular/core';
import { ApprovedActionDispatcher } from 'src/action-dispatcher/ApprovedActionDispatcher';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit , GridData{


  gridData: GridData = this;
  approvedActionDispatcher = new ApprovedActionDispatcher(this);
  gridConfig = new GridConfig();

  constructor() { }

  ngOnInit(): void {
    this.setGridConfiguration();
  }

  setGridConfiguration() {

    //set the grid Header
    this.gridConfig.setGridHeader = "Approved";

    //set page size
    this.gridConfig.setPageSize = 12;

    //Set the column configuration
    this.gridConfig.addColumnConfig("imageId", "Image Name", 1);
    this.gridConfig.addColumnConfig("creationTime", "Date", 2);
    this.gridConfig.addColumnConfig("assignedTo", "Added By", 3);
    this.gridConfig.addColumnConfig("modifiedBy", "Modified By", 4);
    this.gridConfig.addColumnConfig("status", "Status", 5);

    //Set the action token and tool configuration
    this.gridConfig.addActionsAndToolConfig("enableSearchPlaceholder", false, "toggle-to-searchbar");
    this.gridConfig.addActionsAndToolConfig("enableActionToolbar", false, "enable-action-toolbar");
    this.gridConfig.addActionsAndToolConfig("enableSearchToolBar", false, "enable-search-tool-bar");
    this.gridConfig.addActionsAndToolConfig("onRowClick", true, "on-row-click");

    //To enable Hover Action.
    this.gridConfig.addActionsAndToolConfig("deleteValue", false, 'delete-entity', ActionTypes.hover, false, 'delete');
    //To enable Hover Action.
    this.gridConfig.addActionsAndToolConfig("viewImage", false, 'view-image', ActionTypes.hover, false, 'view');


    //TO enable Core Action.
    this.gridConfig.addActionsAndToolConfig("addInPipeLine", true, "add-in-pipe-line", ActionTypes.core, true, "Add In Approved");

    //To enable checkbox
    this.gridConfig.addActionsAndToolConfig("selectRow", false, '');

  }

  getFirstPage(id: number, pageSize: number): Promise<any> {
    return null;
  }
  getNextPage(id: number, pageSize: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  onGridDataLoad(data: any): void {
    throw new Error('Method not implemented.');
  }


}
