import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    FileUploadModule,
    TooltipModule,
    TabViewModule,
    InputTextareaModule
    
  ],
  exports:[
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    FileUploadModule,
    TooltipModule,
    TabViewModule,
    InputTextareaModule
    



  ]
})
export class PrimengModule { }
