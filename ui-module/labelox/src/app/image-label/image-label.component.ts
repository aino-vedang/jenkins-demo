import { Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayService } from '../overlay/overlay.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PropertyBoxComponent } from '../property-box/property-box.component';

@Component({
  selector: 'app-image-label',
  templateUrl: './image-label.component.html',
  styleUrls: ['./image-label.component.css']
})
export class ImageLabelComponent implements OnInit {

  //Count use for naming element
  count: number = 0;

  //Drawing flag to check draw is on or off
  drawingMode: Boolean = false;

  //resizing and reposition event flag
  resizingMode: Boolean = false;
  repositionMode: Boolean = false;

  //SelectedElement
  selectedElement: HTMLElement;

  //Resizing 
  startX: number; startY: number; startWidth: number; startHeight: number;

  //Reposition
  pos1: number; pos2: number; pos3: number; pos4: number;

  @ViewChild('reference', { static: true, read: ViewContainerRef }) referencename: ViewContainerRef;
  @ViewChild("referencename", { static: true, read: ViewContainerRef }) reference: ViewContainerRef;


  constructor(private previewProgressSpinner: OverlayService, private resolver: ComponentFactoryResolver, private router: Router) { }

  ngOnInit(): void {

    this.loadImage();
    this.displayContentInHeader();

    // On click on Draw Rectangle button this function goes into drawable mode
    const markerbutton = document.getElementsByClassName("drawLabel")[0];
    markerbutton.addEventListener('click', () => {
      this.toggleToDrawMode();
    });
  }

  /**
  * Hide and show the element depending on the route.
  */
  displayContentInHeader(): void {
    console.log(this.router.url.includes('labelit'));
    let drawLabel = document.querySelector(".drawLabel") as HTMLButtonElement;
    let selectLabel = document.querySelector(".selectLabel") as HTMLButtonElement;
    if (this.router.url === "/") {
      drawLabel.style.display = "none";
      selectLabel.style.display = "none"
    }
    if (this.router.url.includes('labelit')) {
      drawLabel.style.display = "block";
      selectLabel.style.display = "block"
    }

  }


  /**
   * turn drawing mode on and off
   */
  toggleToDrawMode(): void {
    this.destroyPropertyManager();
    // this.deSelectElement(this.selectedElement);
    const imagediv = document.getElementsByClassName("image-above-div")[0];
    if (this.drawingMode === false) {
      this.drawingMode = true;
      const a = document.getElementsByClassName("drawlabel")[0] as HTMLElement;
      a.style.color = "red";
      this.initDraw(imagediv);
    } else {
      this.drawingMode = false;
      const a = document.getElementsByClassName("drawlabel")[0] as HTMLElement;
      a.style.color = "black";
    }
  }


  /**
  * Set the image to editor when image load
  */
  loadImage(): void {
    const img = document.getElementsByClassName("img")[0] as HTMLImageElement;
    // this.initializeImageDiv();
    img.onload = () => {
      this.initializeImageDiv();
    }
  }



  /**
  * Set the size of the div according to image
  */
  initializeImageDiv(): void {
    const imgheight = document.querySelector('img').offsetHeight;
    const imgabelowdiv = document.getElementsByClassName("image-below-div")[0] as HTMLElement;
    imgabelowdiv.style.height = imgheight + "px";
    const imgabovediv = document.getElementsByClassName("image-above-div")[0] as HTMLElement;
    imgabovediv.style.height = imgheight + "px";
    console.log(imgheight);
  }



  /**
  * Can Drag and draw the element
  * @param imagediv 
  */
  initDraw(imagediv): void {
    let currentRectangle = null;
    let startposX;
    let startposY;
    function setMousePosition(e) {
      const clientRectangle = imagediv.getBoundingClientRect();
      const xcor = e.clientX - clientRectangle.left;
      const ycor = e.clientY - clientRectangle.top;
      mouse.x = xcor;
      mouse.y = ycor;
    };

    const mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
    };
    imagediv.onmousemove = (e) => {
      setMousePosition(e);
      if (this.resizingMode === false && this.drawingMode === true && e.buttons === 1 && ((mouse.x > startposX + 3) || (mouse.y > startposY + 3))) {
        if (currentRectangle === null && this.repositionMode === false) {
          imagediv.style.cursor = "crosshair";
          this.deSelectElement(this.selectedElement);
          this.destroyPropertyManager();
          currentRectangle = document.createElement('div');
          currentRectangle.className = 'ao-marker'
          currentRectangle.style.left = startposX + 'px';
          currentRectangle.style.top = startposY + 'px';
          imagediv.appendChild(currentRectangle);
          this.elementNewName(currentRectangle);
        }
        currentRectangle.style.width = mouse.x - startposX + 'px';
        currentRectangle.style.height = mouse.y - startposY + 'px';
        currentRectangle.onmouseup = (e) => {
          if (currentRectangle !== null) {
            this.renderPropertyManager(currentRectangle);

            if (currentRectangle.classList.value.includes("aoc")) {
              //For Magazine 




              //this.select(currentRectangle);


            }
          }
        }
        document.documentElement.addEventListener('mouseup', stopDrag);
      }

    }

    function stopDrag(e) {
      currentRectangle = null;
      document.documentElement.removeEventListener('mouseup', this);
      document.documentElement.removeEventListener('mousedown', this);
      document.documentElement.removeEventListener("mousemove", this)
      imagediv.style.cursor = "";
    }

    imagediv.onmousedown = (e) => {
      startposX = mouse.x;
      startposY = mouse.y;

      this.destroyPropertyManager();

    }
  }

  /**
   * Deselect the rectangle
   * @param target 
   */
  deSelectElement(element: HTMLElement): void {
    if (this.selectedElement !== undefined) {
      element.classList.remove("ao-select");
      element.classList.add("ao-deselect")
      element.classList.remove("ao-resize");
      element.classList.remove("ao-reposition");
      element.getElementsByClassName("ao-rightBottomBox")[0].remove();
      this.selectedElement = undefined;
    }
  }


  /**
 * Give the customized name to the element
 * @param element 
 */
  elementNewName(element): void {
    let toolClass;
    const temp = 65;
    const arr = document.getElementsByClassName("ao-marker");
    const eleName = "ao-marker"
    const name = eleName.slice(2);
    const len = arr.length;
    if (this.count === 0 && len !== 0) {
      this.count = len - 1;
      toolClass = "aoc" + name + "-" + String.fromCharCode(temp + (this.count));
    }
    else {
      toolClass = "aoc" + name + "-" + String.fromCharCode(temp + (this.count))
    }
    element.classList.add(toolClass);
    this.count++;
  }



  /**
   * OnClick element hostlistner on image loader component to know where the mouse have been clicked 
   * @param event 
   */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    let existingElementSelected = false;


    //Get the target element
    const elExisting = event.target as HTMLElement;

    //If click contains class ao-marker select the element and deselcted element should not be equal to Existing element.
    if (elExisting.classList.contains("ao-marker") && !(elExisting.classList.contains("ao-select"))) {
      this.deSelectElement(this.selectedElement);
      this.select(elExisting);
      this.drawingMode = false;
      const drawSymbol = document.getElementsByClassName("drawlabel")[0] as HTMLElement;
      drawSymbol.style.color = "black";
      existingElementSelected = true
    }

    //Deselect the element if again clicked on same selected element. 
    if (this.selectedElement === elExisting && existingElementSelected === false) {
      this.deSelectElement(elExisting)
    }


    //If close button is pressesd than close the element and also delete the rectangle from image
    if (elExisting.classList.contains("close")) {
      this.destroyPropertyManager();
      this.removeElement(elExisting);
    }

    //When click on the list select the particular list  
    if (elExisting.classList.contains("list")) {
      this.destroyPropertyManager();
      // this.deSelectElement(this.selectedElement);
      // this.articleListSelect(elExisting);
    }

  }

  /**
 * Right Click host event listner select the element and render property box.
 * @param event 
 */
  @HostListener('contextmenu', ['$event'])
  contextmenu(event: MouseEvent) {
    event.preventDefault();
    let existingElementSelected = false;

    //Get the target element
    const elExisting = event.target as HTMLElement;

    //If click contains class ao-marker select the element and deselcted element should not be equal to Existing element.
    if (elExisting.classList.contains("ao-marker") && !(elExisting.classList.contains("ao-select"))) {
      this.deSelectElement(this.selectedElement);
      this.select(elExisting);
      this.renderPropertyManager(elExisting);
      this.drawingMode = false;
      const drawSymbol = document.getElementsByClassName("drawlabel")[0] as HTMLElement;
      drawSymbol.style.color = "white";
      existingElementSelected = true
    }

    //Deselect the element if again clicked on same selected element. 
    if (this.selectedElement === elExisting && existingElementSelected === false) {
      this.deSelectElement(elExisting)
    }


  }



  /**
 * Select the rectangle and add boottom box to resize and reposition
 * @param elExisting 
 */
  select(elExisting: HTMLElement) {
    this.selectedElement = elExisting;
    const strClasses: string = (elExisting).getAttributeNode('class').textContent;
    if (!(strClasses.includes('ao-select'))) {
      const rightBottomBox = document.createElement("div");
      rightBottomBox.classList.add("ao-rightBottomBox"); //selecting the element
      elExisting.appendChild(rightBottomBox);
      //   if (this.imageStore.getMagazineMode() === true) {

      //   } else {
      //     this.renderPropertyManager(elExisting)
      //   }
      // }
      elExisting.classList.add("ao-select");
      elExisting.classList.remove("ao-deselect");
    }

  }



  /**
  * HostListner for mousedown to perform reposition and resizing.
  * @param event 
  */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const element = event.target as HTMLElement;
    //Check if element is selected and has class bottom box than trigger resize function
    if (this.selectedElement !== undefined && this.selectedElement.classList.contains("ao-select")) {
      if (element.classList.contains("ao-rightBottomBox")) {
        event.stopPropagation();
        this.resizingMode = true;
        this.selectedElement.classList.add("ao-resize");
        this.beginResize(this.selectedElement, event);

      }
    }

    if (this.selectedElement !== undefined && this.selectedElement.classList.contains("ao-select")) {
      if (element.classList.contains("ao-marker") && element.classList.contains("ao-select")) {
        this.repositionMode = true;
        this.selectedElement.classList.add("ao-reposition");
        this.beginReposition(event);
      }
    }
  }

  /**
   * HostListner For mouse move
   * @param event 
   */
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.resizingMode === true && event.buttons === 1) {
      this.doResize(this.selectedElement, event);
    }

    if (this.repositionMode === true && event.buttons === 1) {
      this.doReposition(this.selectedElement, event);
    }
  }

  /**
   * HostListner For mouse up
   * @param event 
   */
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.selectedElement !== undefined && this.selectedElement.classList.contains("ao-resize")) {
      this.selectedElement.classList.remove("ao-resize");
      this.resizingMode = false;

    }
    if (this.selectedElement !== undefined && this.selectedElement.classList.contains("ao-reposition")) {
      this.selectedElement.classList.remove("ao-reposition");
      this.repositionMode = false;
    }
  }

  /**
   * Get the starting coordinates height and width.
   * @param element 
   * @param event 
   */
  beginResize(element: HTMLElement, event): void {
    if (element.classList.contains("ao-select") && element.classList.contains("ao-resize")) {
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = element.clientWidth;
      this.startHeight = element.clientHeight;
    }
  }



  /**
   * Drag the element
   * @param element 
   * @param event 
   */
  doResize(element: HTMLElement, event): void {
    event = event || window.event;
    event.preventDefault();
    element.style.width = (this.startWidth + event.clientX - this.startX) + "px";
    element.style.height = (this.startHeight + event.clientY - this.startY) + "px";
  }


  /**
   * Begin the reposition 
   * @param e is the event.
   */
  beginReposition(e): void {
    e = e || window.event;
    e.preventDefault();
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
  }

  /**
   * Start the reposition
   */
  doReposition(element: HTMLElement, e): void {
    e = e || window.event;
    e.preventDefault();
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    element.style.top = (element.offsetTop - this.pos2) + "px";
    element.style.left = (element.offsetLeft - this.pos1) + "px";
  }

  /**
   * To check if article is present if not shows the message.
   * called from if statement.
   */
  checkArticle(): boolean {
    const ul = document.getElementsByClassName("ul")[0];
    if (ul.children.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Open the property box for curent selected element.
   * @param elExisting selected element
   */
  renderPropertyManager(elExisting) {
    const propbox = document.getElementsByClassName("card")[0] as HTMLElement;
    if (propbox === undefined) {
      const dynamicCompFactory = this.resolver.resolveComponentFactory(PropertyBoxComponent);
      const editorInstance = this.referencename.createComponent(dynamicCompFactory, 0).instance;
      editorInstance.existingElement(elExisting)
      editorInstance.displayPropBox()
    }
  }

  /**
  * Remove the property box component when element deselected
  */
  destroyPropertyManager() {
    const propbox = document.getElementsByTagName("app-property-box")[0];
    if (propbox !== undefined) {
      propbox.remove();
    }

  }

  /** 
 * Delete the element when clicked on close
 * @param element  
 */
  removeElement(element: HTMLElement): void {
    const classname = element.parentElement.classList;
    let classnamevalue;
    for (let i = 0; i < classname.length; i++) {
      if (classname[i].includes("aoc")) {
        classnamevalue = classname[i]
      }
    }
    this.deleteElement(classnamevalue, element);
  }

  /**
  * Delete the label from tool pallet and image
  */
  deleteElement(classname, element) {
    const imgabovediv = document.getElementsByClassName("image-above-div")[0];
    const elementdiv = imgabovediv.getElementsByClassName(classname)[0];
    elementdiv.remove();
    element.parentElement.remove();
  }


}
