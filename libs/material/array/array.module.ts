import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { FormlyModule } from '@ngx-formly/core'
import { MetadFormlyArrayComponent } from './array.type'

@NgModule({
  declarations: [MetadFormlyArrayComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'array',
          component: MetadFormlyArrayComponent,
        },
      ],
    }),
  ],
  exports: [MetadFormlyArrayComponent],
})
export class MetadFormlyArrayModule {}
