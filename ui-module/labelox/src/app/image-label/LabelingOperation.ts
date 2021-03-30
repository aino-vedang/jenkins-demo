import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LabelingOperation {

    private labelinginfo = {};
    private objectArr = [];


    //Coordinates
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
    widthActual: number;
    heightActual: number;
    labelname: string;
    coordinates: string;

    //Url Parameters
    pageId;
    editionName;
    pId: number;
    userName: string;
    data: number;

    //Json
    currentJson;
    previousJson;

    //Magazie Mode
    closeMarking:boolean=false;



     /**
     * Add label to Rectangle
     * @param labelname 
     * @param selectedElement 
     */
    addLabelToRectangle(labelname, selectedElement: HTMLElement) {
        console.log(labelname,selectedElement)
        const prevele = selectedElement.getElementsByClassName("marker-name");
        let ele;
        for (let i = 0; i < prevele.length; i++) {
            ele = prevele[i] as HTMLElement;
            ele.remove();
        }
        const label = document.createElement("label");
        label.setAttribute("class", "marker-name");

        const name = document.createTextNode(labelname.name);
        label.append(name);
        selectedElement.appendChild(label);
       // this.createPageList(selectedElement, labelname.name)
        this.createMap(selectedElement, labelname.name);

    }

     /**
     * Creates a Json of rectangle and label-name
     * @param selectedElement 
     * @param labelname 
     */
    createMap(selectedElement: HTMLElement, labelname) {
        console.log(selectedElement)
        let classname;
        let value;
        const ele = selectedElement.classList;
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].includes("aoc")) {
                classname = ele[i];

            }
        }
        const obj = this.labelinginfo;
        this.labelinginfo[classname] = labelname;
        for (const key in obj) {
            if (classname === key) {
                value = obj[key];

            }
        }

        this.addNameToPallet(value, classname)
    }

     /**
     * Add the label to tool Box
     */
    addNameToPallet(value, classname) {
        console.log(value , classname);
        const ulList = document.getElementsByClassName("ul")[0];
        const liElement = ulList.getElementsByClassName(classname);
        if (liElement.length === 0) {
            const li = document.createElement("li");
            li.classList.add("list", classname)
            const val = document.createTextNode(value);
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

        else {
            const textnode = document.createTextNode(value);
            const a = liElement[0].childNodes[1];
            liElement[0].appendChild(textnode);
            a.remove();
        }

    }


        /**
     * Calculate The co-ordinates of all the rectangle
     */
    calculateCoordinate() {

        this.objectArr = [];

        this.labelinginfo = {};

        const image = document.getElementsByClassName("img")[0] as HTMLElement;
        //Orginal Image Height and Width 
        this.heightActual = document.querySelector('img').naturalHeight;
        this.widthActual = document.querySelector('img').naturalWidth;


        /*Image height and width use for editor*/
        const height = image.offsetHeight;
        const width = image.offsetWidth;

        const ele = document.getElementsByClassName("ao-marker");
        for (let i = 0; i < ele.length; i++) {
            const element = ele[i] as HTMLElement;
            console.log(element)
            this.labelname = element.getElementsByClassName("marker-name")[0].textContent;
            const xminbscaling = element.offsetLeft;
            const yminbscaling = element.offsetTop;
            const xmaxbscaling = element.offsetLeft + element.offsetWidth;
            const ymaxbscaling = element.offsetHeight + element.offsetTop;


            this.ymin = Math.round((yminbscaling / height) * this.heightActual);
            this.ymax = Math.round((ymaxbscaling / height) * this.heightActual);
            this.xmin = Math.round((xminbscaling / width) * this.widthActual);
            this.xmax = Math.round((xmaxbscaling / width) * this.widthActual);

            this.formJson();
        }

    }



    /**
     * Form the json
     */
    formJson() {
        console.log(this.labelname)
        const json = {
            "labelInfo": {

                "labelName": this.labelname,

                "boundingBox": {
                    "xmin": this.xmin,
                    "xmax": this.xmax,
                    "ymin": this.ymin,
                    "ymax": this.ymax
                }
            }
        }
        this.objectArr.push(json);

        this.createJson();
    }


    /**
     * Create The Json
     */
    private createJson() {
        const temp = [];
        const final = {
            "pageId": "1234",
            "height": this.heightActual,
            "width": this.widthActual
        };
        for (let i = 0; i < this.objectArr.length; i++) {
            for (let j = i; j >= 0; j--) {

                temp[j] = this.objectArr[j]["labelInfo"]
            }
        }

        final["labelInfo"] = temp;
        this.coordinates = JSON.stringify(final);


    }





   
}