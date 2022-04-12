import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormlyModule } from '@ngx-formly/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { MetadFormlyNzArrayTabsetComponent } from './tabset.type';

@NgModule({
  declarations: [MetadFormlyNzArrayTabsetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    NzTabsModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'nz-tabset',
          component: MetadFormlyNzArrayTabsetComponent,
        },
        {
          name: 'tabset',
          extends: 'nz-tabset',
        },
        {
          name: 'inline-tabset',
          extends: 'tabset',
          defaultOptions: {
            templateOptions: {
              type: 'inline',
            },
          },
        },
        {
          name: 'nz-inline-tabset',
          extends: 'nz-tabset',
          defaultOptions: {
            templateOptions: {
              type: 'inline',
            },
          },
        },
      ],
    }),
  ],
})
export class MetadFormlyNzArrayTabsetModule {}
