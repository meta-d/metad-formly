import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetadFormlyMatJsonModule } from '@metad/formly-mat/json';
import { MetadFormlyAntdModule } from '@metad/formly-antd';
import { FormlyModule } from '@ngx-formly/core';
import { MetaFormlyComponent } from './formly.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    MetadFormlyMatJsonModule,
    MetadFormlyAntdModule,
    MatButtonModule,
  ],
  exports: [MetaFormlyComponent],
  declarations: [MetaFormlyComponent],
  providers: [],
})
export class MetadFormlyModule {}
