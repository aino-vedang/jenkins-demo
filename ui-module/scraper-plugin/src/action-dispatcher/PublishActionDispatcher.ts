import { BaseActionDispatcher } from "@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid";
import { PublishScriptGridComponent } from "src/app/publish-script-grid/publish-script-grid.component";

/**
 * @author : nandita@ainosoft.com
 */
export class PublishActionDispatcher extends BaseActionDispatcher {

    publishGrid: PublishScriptGridComponent;

    constructor(publishGrid: PublishScriptGridComponent) {
        super();
        this.publishGrid = publishGrid;
    }

    onRowClick(value): void {
        this.publishGrid.onRowClick(value);
    }
}