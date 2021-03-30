import { Component, OnInit } from '@angular/core';
import { LabelingOperation } from '../image-label/LabelingOperation';

@Component({
  selector: 'app-property-box',
  templateUrl: './property-box.component.html',
  styleUrls: ['./property-box.component.css']
})
export class PropertyBoxComponent implements OnInit {

  selectedLabel;
  selectedElement: HTMLElement;
  constructor(private labelOp:LabelingOperation) { }

  ngOnInit() {
  }

  titles= [
    { name: "datatable" },
    { name: "advertisement" },
    { name: "image-caption" },
    { name: "highlight" },
    { name: "article" },
    { name: "snippet" }
  ];

  /**
   * Close the property Box 
   */
  closePropertyManager() {
    const propbox = document.getElementsByTagName("app-property-box")[0];
    propbox.remove();
  }

  onSelect(e, selectedValue: string) {
    e.stopPropagation();
    this.selectedLabel = selectedValue;
    this.sendOption()
  }

  /**
   * Send the selected Label and selected rectange through service (Labelname.service.ts)
   * to addLableToRectangle method.
   */
  sendOption() {
    this.labelOp.addLabelToRectangle(this.selectedLabel , this.selectedElement);
   // this.lnameservice.changeMessage(this.selectedLabel, this.selectedElement);
  }

  existingElement(selectedElement: HTMLElement) {
    this.selectedElement = selectedElement;
  }

  /**
   * Adjust the  display of the property box according to element
   */
  displayPropBox() {
    const propbox = document.getElementsByClassName("card")[0] as HTMLElement;
    propbox.style.right = 0+ "px";
    propbox.style.top = 10 + "vh";
  }


  /**
   * Add the new label to the list
   * @param value Label name to be added
   */
  addNewLabel(value){
   if(value != ""){
    this.titles.push({name:value})
   }
  }
}
