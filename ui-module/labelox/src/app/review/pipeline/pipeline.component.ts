import { ActionTypes, GridConfig, GridData } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeLineActionDispatcher } from 'src/action-dispatcher/PipeLineActionDispatcher';
import { LabeloxService } from 'src/server-integration/impl/labelox.service.js';
import { MatDialog } from '@angular/material';
import { AddInPipelineComponent } from './add-in-pipeline/add-in-pipeline.component';
import { ViewHistoryComponent } from 'src/app/view-history/view-history.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { SetSlimService } from 'src/service/set-slim.service';
import { ImageQueueSlim } from 'src/app/slim/ImageQueueSlim';

export interface Hero {
  imageName;
  date;
  assignTo;
  status;
}

@Component({
  selector: 'pipeline-review',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipeLineComponent implements OnInit, GridData {



  previousId;
  gridData: GridData = this;
  labeloxService = new LabeloxService();
  pipeLineActionDispatcher = new PipeLineActionDispatcher(this);
  gridConfig = new GridConfig();


  constructor(private route: Router, public dialog: MatDialog, private setSlim: SetSlimService, private labelSlim: ImageQueueSlim) { }


  ngOnInit(): void {
    this.setGridConfiguration();
  }

  setGridConfiguration() {

    //set the grid Header
    this.gridConfig.setGridHeader = "Pipeline";

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
    this.gridConfig.addActionsAndToolConfig("enableActionToolbar", true, "enable-action-toolbar");
    this.gridConfig.addActionsAndToolConfig("enableSearchToolBar", false, "enable-search-tool-bar");
    this.gridConfig.addActionsAndToolConfig("onRowClick", true, "on-row-click");

    //To enable Hover Action.
    this.gridConfig.addActionsAndToolConfig("deleteValue", false, 'delete-entity', ActionTypes.hover, false, 'delete');
    //To enable Hover Action.
    this.gridConfig.addActionsAndToolConfig("viewImage", false, 'view-image', ActionTypes.hover, false, 'view');


    //TO enable Core Action.
    this.gridConfig.addActionsAndToolConfig("addInPipeLine", true, "add-in-pipe-line", ActionTypes.core, true, "Add In PipeLine");

    //To enable checkbox
    this.gridConfig.addActionsAndToolConfig("selectRow", true, '');

  }




  getNextPage(id: number, pageSize: number): Promise<any> {
    let promise = this.labeloxService.getImagesByPaging(this.previousId, pageSize).setServiceName('Labelox').post('/viewImagesByPaging');
    promise.then(
      result => {
        console.log(result);
        if (result != null) {
          this.previousId = result[Object(result).length - 1].id;
        }
      },
      error => {
        console.log(error);
      }
    );
    return promise;
  }

  onGridDataLoad(data: any): void {
    // throw new Error('Method not implemented.');
    return null;
  }

  /**
   * This will navigate 
   */
  navigateToAddImage() {
    this.dialog.open(AddInPipelineComponent);
  }

  getFirstPage(id: number, pageSize: number): Promise<any> {
    let promise = this.labeloxService.getImagesByPaging(0, pageSize).setServiceName('Labelox').post('/viewImagesByPaging');
    promise.then(
      result => {
        console.log(result);
        this.previousId = result[Object(result).length - 1].imageQueueId;
        console.log(this.previousId);
      },
      error => {
        console.log(error);
      }
    );
    return promise;
  }

  viewImage(data: any) {
    this.dialog.open(ViewHistoryComponent, { data: { width: '250px', message: data.imageId } });
  }


  labelImage(appInfo: {}) {
    this.setSlim.setToSlim(appInfo);
    console.log(this.labelSlim);
    this.route.navigate(['./labelit']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message: "Hey this is popup" }
    });
  }
}