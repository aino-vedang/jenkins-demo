import { BaseActionDispatcher } from "@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid";
import { DraftScriptGridComponent } from "src/app/draft-script-grid/draft-script-grid.component";

/**
 * @author : nandita@ainosoft.com
 */
export class ScriptActionDispatcher extends BaseActionDispatcher {

    draftScriptGrid: DraftScriptGridComponent;

    constructor(draftScriptGrid: DraftScriptGridComponent){
        super();
        this.draftScriptGrid = draftScriptGrid;
    }

    addNewScript(): void {
        this.draftScriptGrid.addNewScript();
    }

    onRowClick(value): void {
        this.draftScriptGrid.onRowClick(value);
    }
}