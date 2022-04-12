import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadFormlyToggleComponent } from './toggle.type';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';



@NgModule({
  declarations: [MetadFormlyToggleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormlyMatFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'toggle',
          component: MetadFormlyToggleComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  exports: [MetadFormlyToggleComponent]
})
export class MetadFormlyToggleModule { }
