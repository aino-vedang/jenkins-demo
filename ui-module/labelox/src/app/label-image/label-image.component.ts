import { Component, OnInit } from '@angular/core';
import { LabeloxService } from 'src/server-integration/impl/labelox.service.js';
import { ImageQueueSlim } from '../slim/ImageQueueSlim';

@Component({
  selector: 'app-label-image',
  templateUrl: './label-image.component.html',
  styleUrls: ['./label-image.component.css']
})
export class LabelImageComponent implements OnInit {

  //Json use for recreating label
  obj = o;
  currentImage;
  imageList;
  selected;

  //Coordinates
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  labelname: string;
  heightActual: number;
  widthActual: number;
  count = 0;

  labeloxService = new LabeloxService();

  constructor(private labelSlim: ImageQueueSlim) { }

  ngOnInit() {
    this.getImageData();
  }


  /**
   * Get the base64 string.
   */
  getImageData() {
    console.log(this.labelSlim);
    let promise = this.labeloxService.displayImage(this.labelSlim.getImageId).setServiceName('Labelox').post('/displayImage');
    promise.then(
      result => {
        console.log(result);
        this.setImage(result['base64String']);
      },
      error => {
        console.log(error);
      }
    );
    return promise;

  }



  /**
 * function called from imager-loader.ts to get the image json to review
 */
  getJson() {

    this.count = 0;
    //this.obj = this.imageStore.getCoordinates;
    if (this.obj !== null) {

      this.createImageUrl();
    }
  }





  createImageUrl() {
    const imagecoor = this.obj
    const appName = window["appName"];
    const pageId = imagecoor["pageId"];
    const baseUrl: string = location.origin;
    //const baseUrl = "http://127.0.0.1:8888";
    const urlMiddle = "/ari/SourcesSpace/SourcesApp/Sources/convertAndSaveImage?ResponseType=TEXT_FILE&pageId="
    const imageUrl = baseUrl + appName + urlMiddle + pageId;
    this.setImage(imageUrl);
  }


  /**
  * Set the image to div for editing 
  * @param imageUrl 
  */
  setImage(imageUrl) {
    const img = document.querySelector("img");
    img.setAttribute("src", imageUrl);
    img.onload = () => {
      this.setSize();
    }

  }



  /**
  * It is use to set the editor div according to image size
  */
  setSize() {
    const imgheight = document.querySelector('img').offsetHeight;
    const imgabelowdiv = document.getElementsByClassName("image-below-div")[0] as HTMLElement;
    imgabelowdiv.style.height = imgheight + "px";
    const imgabovediv = document.getElementsByClassName("image-above-div")[0] as HTMLElement;
    imgabovediv.style.height = imgheight + "px";

    this.gettingValue();

  }


  /**
   *  It calculate the image according to dom size 
   */
  gettingValue() {
    const a = this.obj;
    this.heightActual = a["height"];
    this.widthActual = a["width"];
    const objects = a["labelInfo"];
    const img = document.querySelector("img");
    const height = img.offsetHeight;
    const width = img.offsetWidth;
    for (let i = 0; i < objects.length; i++) {

      this.labelname = objects[i]["labelName"];

      const xminbscaling = objects[i]["boundingBox"]["xmin"];
      const xmaxbscaling = objects[i]["boundingBox"]["xmax"];
      const yminbscaling = objects[i]["boundingBox"]["ymin"];
      const ymaxbscaling = objects[i]["boundingBox"]["ymax"];

      this.ymin = Math.round((yminbscaling / this.heightActual) * height);
      this.ymax = Math.round((ymaxbscaling / this.heightActual) * height);

      this.xmin = Math.round((xminbscaling / this.widthActual) * width);
      this.xmax = Math.round((xmaxbscaling / this.widthActual) * width);
      this.calculateLabel();
    }
  }

  /**
   * Calaculate the height and width of label
   */
  calculateLabel() {
    const labeltop = this.ymin;
    const labelleft = this.xmin;
    const labelheight = this.ymax - this.ymin;
    const labelwidth = this.xmax - this.xmin;
    this.createLabelOnImage(labeltop, labelleft, labelheight, labelwidth);
  }


  /**
   * Takes the height and width of the label and append it to image
   * @param labeltop 
   * @param labelleft 
   * @param labelheight 
   * @param labelwidth 
   */
  createLabelOnImage(labeltop, labelleft, labelheight, labelwidth) {
    const element = document.createElement("div");
    const labelelement = document.createElement("label");
    labelelement.classList.add("marker-name");
    const labname = document.createTextNode(this.labelname + "")
    labelelement.appendChild(labname);
    element.style.width = labelwidth - 4 + "px";
    element.style.height = labelheight - 4 + 'px';
    element.style.left = labelleft + 'px';
    element.style.top = labeltop + 'px';
    element.classList.add("ao-marker");
    const imageabovediv = document.getElementsByClassName("image-above-div")[0].appendChild(element);
    imageabovediv.appendChild(labelelement);

    this.namingElements(imageabovediv)
  }


  /**
   *  It set the name of the label 
   * @param element 
   */
  namingElements(element) {

    let toolClass;
    const temp = 65;
    const arr = document.getElementsByClassName("ao-marker");
    const eleName = "ao-marker"
    const name = eleName.slice(2);
    const len = arr.length;
    toolClass = "aoc" + name + "-" + String.fromCharCode(temp + (this.count));
    element.classList.add(toolClass);
    this.count++;

    this.createList(toolClass);

  }

  /**
  * It is use to add list of label to tool pallet
  * @param classname 
  */
  createList(classname) {
    const li = document.createElement("li");
    li.classList.add("list", classname)
    const val = document.createTextNode(this.labelname + "");
    const closebutton = document.createElement("span");
    const closetextnode = document.createTextNode("X");
    closebutton.classList.add("close")
    closebutton.appendChild(closetextnode);
    li.appendChild(closebutton);
    li.appendChild(val);
    const labelpallet = document.getElementsByClassName("label-info")[0];
    const ul = labelpallet.getElementsByClassName("ul")[0];
    ul.appendChild(li);
  }

}

const o = {
  "pageId": 4160311,
  "height": 3464,
  "width": 2275,
  "labelInfo": [{
    "labelName": "advertisement",
    "boundingBox": {
      "xmin": 131,
      "xmax": 471,
      "ymin": 193,
      "ymax": 436
    }
  }, {
    "labelName": "advertisement",
    "boundingBox": {
      "xmin": 1804,
      "xmax": 2165,
      "ymin": 189,
      "ymax": 449
    }
  }, {
    "labelName": "article",
    "boundingBox": {
      "xmin": 100,
      "xmax": 2155,
      "ymin": 465,
      "ymax": 2141
    }
  }, {
    "labelName": "image-caption",
    "boundingBox": {
      "xmin": 525,
      "xmax": 2150,
      "ymin": 1526,
      "ymax": 1566
    }
  }, {
    "labelName": "image-caption",
    "boundingBox": {
      "xmin": 1752,
      "xmax": 1989,
      "ymin": 2064,
      "ymax": 2110
    }
  }, {
    "labelName": "highlight",
    "boundingBox": {
      "xmin": 546,
      "xmax": 932,
      "ymin": 1765,
      "ymax": 2114
    }
  }, {
    "labelName": "article",
    "boundingBox": {
      "xmin": 120,
      "xmax": 1733,
      "ymin": 2174,
      "ymax": 3362
    }
  }]
}
