import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LabeloxService } from 'src/server-integration/impl/labelox.service.js';
@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {

  historyRecord = [];
  displayedColumns: string[] = ['Image Name', 'Date', 'Added By', 'Modified By', 'Status'];
  labeloxService = new LabeloxService();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log("In view component", this.data);
    console.log("In view component attr", this.data.message);
    const historyRecordPromise = this.labeloxService.viewImageDetails(this.data.message).setServiceName("Labelox").get("/viewImageDetails");
    historyRecordPromise.then(
      result => {
        console.log(result);
        this.historyRecord = result;
      }, error => {
        console.log(error);
      }
    )
  }
}
