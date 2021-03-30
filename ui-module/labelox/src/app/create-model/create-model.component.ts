import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelRepoService } from 'src/server-integration/impl/modelrepo.service.js';

@Component({
  selector: 'app-create-model',
  templateUrl: './create-model.component.html',
  styleUrls: ['./create-model.component.css']
})
export class CreateModelComponent implements OnInit {

  modelRepoService = new ModelRepoService();
  createApp: FormGroup;

  //Multiple Email List
  selectedLabel: Array<String> = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    //Create App form group
    this.createApp = this.formBuilder.group({
      appName: ['', Validators.required],
      label: ['', Validators.required],
    });
  }


  /**
   * If coma is pressed and email is vaild it add to the list.
   * @param value Get value in input box.
   */
  getEmailValue(value) {

    let previousValue: String
    if (value !== null) {
      previousValue = value.substring(0, value.length - 1);
    }
    if ((previousValue != undefined) && value.endsWith(",")) {

      if (this.selectedLabel.indexOf(previousValue) === -1) {
        this.selectedLabel.push(previousValue);
        this.createApp.controls['label'].setValue('');
      }
    }
  }

  /**
   * If Enter key is press it add to the selected email list.
   * @param event Which key is pressed
   */
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    
    if (event.keyCode === 32 && this.createApp.value.label != " ") {
      const label = this.createApp.value.label;
      if (this.selectedLabel.indexOf(label) === -1) {
        this.selectedLabel.push(label);
        
      }
    }
  }

  /**
   * If the click element if not email input and input contains text
   * it validates the email and add it to selected email list. 
   * 
   */
  focusOutEmail() {
  
    const label = this.createApp.value.label;
    if (this.createApp.value.label !== "") {

      if (this.selectedLabel.indexOf(label) === -1) {
        this.selectedLabel.push(label);
        this.createApp.controls['label'].setValue('');
      }


    }
  }

  /**
   *Remove email from selected list. 
   *@param value index to remove
   */
  removeEmailFromList(value) {
    this.selectedLabel.splice(value, 1);
    //this.emailService.sendMessage(this.selectedLabel);
  }

  onSubmit(){
    let labelList=this.selectedLabel;
    let modelName=this.createApp.value.appName;
    this.modelRepoService.saveModelDetails(modelName,labelList).setServiceName("ModelTrainer").post("/saveModelDetails");
  }


}
