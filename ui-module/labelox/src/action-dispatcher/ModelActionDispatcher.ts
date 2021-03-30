import { BaseActionDispatcher } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { ModelRepoComponent } from 'src/app/model-repo/model-repo.component';
import { ApprovedComponent } from 'src/app/review/approved/approved.component';

export class ModelActionDispatcher extends BaseActionDispatcher {

  modelGrid: ModelRepoComponent;

  constructor(modelGrid: ModelRepoComponent) {
    super();
    // this.userHomeComp = userHomeComp;
    this.modelGrid = modelGrid;
  }

  createNewRepo() {
    this.modelGrid.createNewRepo();
  }

  modelSetting() {
    this.modelGrid.modelSetting();
  }

  /**
 * Get selected Row.
 */
  onRowClick(modelInfo: {}) {
    this.modelGrid.openSelectedModel(modelInfo);
  }
}