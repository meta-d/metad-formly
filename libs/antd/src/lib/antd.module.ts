import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadFormlyNzTextAreaModule } from '@metad/formly-antd/textarea';
import { MetadFormlyNzArrayTabsetModule } from '@metad/formly-antd/array-tabset';

@NgModule({
  imports: [
    CommonModule,
    MetadFormlyNzTextAreaModule,
    MetadFormlyNzArrayTabsetModule
  ],
})
export class MetadFormlyAntdModule {}
