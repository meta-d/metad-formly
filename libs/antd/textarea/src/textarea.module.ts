import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';

import { MetadFormlyFieldTextAreaComponent } from './textarea.type';

@NgModule({
  declarations: [MetadFormlyFieldTextAreaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,

    FormlyModule.forChild({
      types: [
        {
          name: 'nz-textarea',
          component: MetadFormlyFieldTextAreaComponent,
          wrappers: ['nz-form-field'],
        },
        {
          name: 'textarea',
          extends: 'nz-textarea'
        }
      ],
    }),
  ],
})
export class MetadFormlyNzTextAreaModule {}
