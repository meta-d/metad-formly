import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { FormlyModule } from '@ngx-formly/core'
import { MonacoEditorModule } from 'ngx-monaco-editor'
import { MetadFormlyCodeEditorComponent } from './code-editor.component'

@NgModule({
  declarations: [MetadFormlyCodeEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MonacoEditorModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'code-editor',
          component: MetadFormlyCodeEditorComponent
        },
      ],
    }),
    
  ],
  exports: [MetadFormlyCodeEditorComponent],
})
export class MetadFormlyCodeEditorModule {}
