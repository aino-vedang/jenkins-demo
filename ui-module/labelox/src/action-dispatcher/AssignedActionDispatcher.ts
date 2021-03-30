import { BaseActionDispatcher } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { ApprovedComponent } from 'src/app/review/approved/approved.component';
import { AssignedToComponent } from 'src/app/review/assigned-to/assigned-to.component';

export class AssignedActionDispatcher extends BaseActionDispatcher {

  assignedGrid: AssignedToComponent;

  constructor(assignedGrid: AssignedToComponent) {
    super();
    // this.userHomeComp = userHomeComp;
    this.assignedGrid = assignedGrid;
  }

  addInPipeLine() {
   
  }


  /**
* Open view history dialogue box
*/
  viewImage(data) { 
  }

}