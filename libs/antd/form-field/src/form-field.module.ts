import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { MetadFormlyFormFieldComponent } from './form-field.wrapper';

@NgModule({
  declarations: [MetadFormlyFormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'nz-form-field',
          component: MetadFormlyFormFieldComponent,
        },
      ],
    }),
  ],
})
export class MetadFormlyNzFormFieldModule {}
