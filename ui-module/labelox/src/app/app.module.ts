import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/common/material-module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ImageLabelComponent } from './image-label/image-label.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayService } from './overlay/overlay.service';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseGridModule } from '@ainosoft/appops-core-components/components/enterprise-grid/dist/enterprise-grid';
import { CommonModule } from '@angular/common';
import { PropertyBoxComponent } from './property-box/property-box.component';
import { ReviewComponent } from './review/review.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { PipeLineComponent } from './review/pipeline/pipeline.component';
import { AddInPipelineComponent } from './review/pipeline/add-in-pipeline/add-in-pipeline.component';
import { ReviewImageComponent } from './review/review-image/review-image.component';
import { ApprovedComponent } from './review/approved/approved.component';
import { RejectedComponent } from './review/rejected/rejected.component';
import { AssignedToComponent } from './review/assigned-to/assigned-to.component';
import { DialogComponent } from './dialog/dialog.component';
import { LabelImageComponent } from './label-image/label-image.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { ModelRepoComponent } from './model-repo/model-repo.component';
import { CreateModelComponent } from './create-model/create-model.component';
import { HttpClientModule } from '@angular/common/http';
import { ModelSettingComponent } from './model-setting/model-setting.component';




const routes: Routes = [

  { path: 'review', component: ReviewComponent },
  { path: 'labelit', component: LabelImageComponent },
  { path: 'mylabelox', component: MyReviewComponent },
  { path: 'create', component: CreateModelComponent },
  { path: 'model-setting', component: ModelSettingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ImageLabelComponent,
    ProgressBarComponent,
    PipeLineComponent,
    PropertyBoxComponent,
    AddInPipelineComponent,
    ReviewComponent,
    ViewHistoryComponent,
    ReviewImageComponent,
    ApprovedComponent,
    RejectedComponent,
    AssignedToComponent,
    DialogComponent,
    LabelImageComponent,
    MyReviewComponent,
    ModelRepoComponent,
    CreateModelComponent,
    ModelSettingComponent,


  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    OverlayModule,
    EnterpriseGridModule,
    RouterModule.forRoot(routes, { useHash: true }),

  ],
  providers: [OverlayService],
  bootstrap: [AppComponent],
  entryComponents: [
    ProgressBarComponent,
    PropertyBoxComponent,
    ViewHistoryComponent,
    AddInPipelineComponent,
    DialogComponent
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
