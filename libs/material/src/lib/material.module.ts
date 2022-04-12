import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetadFormlyColorPickerModule } from '@metad/formly-mat/color-picker';
import { MetadFormlyArrayModule } from '@metad/formly-mat/array';
import { MetadFormlyMatJsonModule } from '@metad/formly-mat/json';
import { MetadFormlyMatTabGroupModule } from '@metad/formly-mat/tab-group';
import { MetadFormlyToggleModule } from '@metad/formly-mat/toggle';
import { MetadFormlyArrayTabsModule } from '@metad/formly-mat/array-tabs';

@NgModule({
  imports: [
    CommonModule,
    MetadFormlyMatJsonModule,
    MetadFormlyArrayModule,
    MetadFormlyMatTabGroupModule,
    MetadFormlyToggleModule,
    MetadFormlyColorPickerModule,
    MetadFormlyArrayTabsModule
  ],
})
export class MetadFormlyMatModule {}
