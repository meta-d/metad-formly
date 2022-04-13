import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetadFormlyArrayModule } from '@metad/formly-mat/array';
import { MetadFormlyArrayTabsModule } from '@metad/formly-mat/array-tabs';
import { MetadFormlyColorPickerModule } from '@metad/formly-mat/color-picker';
import { MetadFormlyExpansionModule } from '@metad/formly-mat/expansion';
import { MetadFormlyMatJsonModule } from '@metad/formly-mat/json';
import { MetadFormlyPanelModule } from '@metad/formly-mat/panel';
import { MetadFormlyMatTabGroupModule } from '@metad/formly-mat/tab-group';

@NgModule({
  imports: [
    CommonModule,
    MetadFormlyMatJsonModule,
    MetadFormlyArrayModule,
    MetadFormlyMatTabGroupModule,
    // MetadFormlyToggleModule,
    MetadFormlyColorPickerModule,
    MetadFormlyArrayTabsModule,
    MetadFormlyExpansionModule,
    MetadFormlyPanelModule,
  ],
})
export class MetadFormlyMatModule {}
