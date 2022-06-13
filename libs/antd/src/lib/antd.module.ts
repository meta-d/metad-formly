import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadFormlyNzTextAreaModule } from '@metad/formly-antd/textarea';
import { MetadFormlyNzArrayTabsetModule } from '@metad/formly-antd/array-tabset';
import { MetadFormlyNzFormFieldModule } from '@metad/formly-antd/form-field';

@NgModule({
  imports: [
    CommonModule,
    MetadFormlyNzFormFieldModule,
    MetadFormlyNzTextAreaModule,
    MetadFormlyNzArrayTabsetModule,
  ],
})
export class MetadFormlyAntdModule {}
