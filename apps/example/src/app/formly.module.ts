import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetadFormlyAntdModule } from '@metad/formly-antd';
import { MetadFormlyMatModule } from '@metad/formly-mat';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MetaFormlyComponent } from './formly.component';
import { MetadFormlyCodeEditorModule } from '@metad/formly-mat/code-editor'


@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    MetadFormlyMatModule,
    MetadFormlyAntdModule,
    MatButtonModule,
    FormlyMaterialModule,
    MetadFormlyCodeEditorModule
  ],
  exports: [MetaFormlyComponent],
  declarations: [MetaFormlyComponent],
  providers: [],
})
export class MetadFormlyModule {}
