import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthPreviewComponent } from './components/month-preview/month-preview.component';
import { MonthSelectionComponent } from './components/month-selection/month-selection.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { AddPopupComponent } from './components/add-popup/add-popup.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthPreviewComponent,
    MonthSelectionComponent,
    YearSelectorComponent,
    MonthViewComponent,
    DayViewComponent,
    AddPopupComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
