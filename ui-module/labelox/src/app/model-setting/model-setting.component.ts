import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-setting',
  templateUrl: './model-setting.component.html',
  styleUrls: ['./model-setting.component.css']
})
export class ModelSettingComponent implements OnInit {

  labelList = [
    { name: "Article" },
    { name: "Snippet" },
  ];

  userList = [
    { name: "Shubham Manchalakr" },
    { name: "Shubham Manchalkar" },
  ];

  label: string;
  constructor() { }

  ngOnInit() {
  }


  /**
   * Add the label.
   */
  add() {
    this.labelList.push({ name: this.label });
    this.label = "";
  }

  removeLabel(index) {
    console.log(this.labelList);
    this.labelList.splice(index, 1);
  }

}
