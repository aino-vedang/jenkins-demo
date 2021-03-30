import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LabeloxService } from 'src/server-integration/impl/labelox.service.js';
import { ImageQueueSlim } from 'src/app/slim/ImageQueueSlim';
import { EnterpriseGridService } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { resolve } from 'url';
@Component({
  selector: 'app-add-in-pipeline',
  templateUrl: './add-in-pipeline.component.html',
  styleUrls: ['./add-in-pipeline.component.css']
})
export class AddInPipelineComponent implements OnInit {

  labeloxService = new LabeloxService();
  constructor(public dialogRef: MatDialogRef<AddInPipelineComponent>, private gridService: EnterpriseGridService) { }
  uploadImages;


  ngOnInit() {
    // this.slimTest();
  }


  /**
   * Upload the selected image
   * @param event event                           
   */
  async uploadFile(event) {
    let imageQueueSlimList: Array<any> = [];

    for (let i = 0; i < event.target.files.length; i++) {
      await this.handleFileReader(event, i).then(result => {
        imageQueueSlimList.push(result);
      });
    }
    console.log(imageQueueSlimList);
    this.labeloxService.saveImage(JSON.stringify(imageQueueSlimList)).setServiceName("Labelox").post("/saveImageQueueList").then(
      result => {
        if (result != false) {
          this.gridService.refresh.emit();
        }
      },
      error => {

      }
    )
    this.dialogRef.close();
  }


  /**
   * 
   * @param event File event.
   * @param i 
   */
  handleFileReader(event, i) {
    return new Promise((resolve, reject) => {
      let imageQueueSlim;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = () => {
        imageQueueSlim = new ImageQueueSlim();
        imageQueueSlim.setImageName = event.target.files[i].name;
        imageQueueSlim.setBase64String = reader.result;
        resolve(imageQueueSlim);
      }
    });
  }

}
