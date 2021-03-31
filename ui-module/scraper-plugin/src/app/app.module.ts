import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleSet } from 'src/common/material-module';
import { DraftScriptGridComponent } from './draft-script-grid/draft-script-grid.component';
import { EnterpriseGridModule } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/mock-data/in-memory-data.service';
import { AddEditScriptComponent } from './add-edit-script/add-edit-script.component';
import { SourceUrlDialogComponent } from './source-url-dialog/source-url-dialog.component';
import { DraftPublishContainerComponent } from './draft-publish-container/draft-publish-container.component';
import { PublishScriptGridComponent } from './publish-script-grid/publish-script-grid.component';
import { SuccessErrorDialogComponent } from './success-error-dialog/success-error-dialog.component';

const routes: Routes = [
  { path: '', redirectTo: '/draftPublish/draft', pathMatch: 'full' },

  {
    path: 'draftPublish', component: DraftPublishContainerComponent,
    children: [
      { path: 'draft', component: DraftScriptGridComponent },
      { path: 'publish', component: PublishScriptGridComponent },
    ],
  },
  { path: 'addEditScript', component: AddEditScriptComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DraftScriptGridComponent,
    AddEditScriptComponent,
    SourceUrlDialogComponent,
    DraftPublishContainerComponent,
    PublishScriptGridComponent,
    SuccessErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MaterialModuleSet,
    EnterpriseGridModule,
    //RouterModule.forChild(routes)  
    RouterModule.forRoot(routes),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  entryComponents: [AppComponent, PublishScriptGridComponent, DraftScriptGridComponent, SourceUrlDialogComponent, SuccessErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  static entry = AppComponent;
}
