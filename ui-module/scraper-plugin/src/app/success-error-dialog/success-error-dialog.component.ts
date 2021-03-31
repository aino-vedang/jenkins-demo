import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SuccessErrorDialogData } from '../add-edit-script/add-edit-script.component';

/**
 * @author : nandita@ainosoft.com
 */
@Component({
  selector: 'app-success-error-dialog',
  templateUrl: './success-error-dialog.component.html',
  styleUrls: ['./success-error-dialog.component.css']
})
export class SuccessErrorDialogComponent implements OnInit {

  message: string;
  icon: string;
  iconColor: string;

  constructor(public successDialogRef: MatDialogRef<SuccessErrorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SuccessErrorDialogData) { }

  ngOnInit() {
    this.message = this.data.Msg;
    this.icon = this.data.icon;

    let successErrorIcon = document.getElementsByClassName('success-error-icon')[0] as HTMLElement;

    successErrorIcon.style.color = this.data.iconColor;
  }

}
