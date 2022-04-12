import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { FormlyModule } from '@ngx-formly/core'
import { MetadFormlyArrayTabsComponent } from './array.type'

@NgModule({
  declarations: [MetadFormlyArrayTabsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'array-tabs',
          component: MetadFormlyArrayTabsComponent,
        },
      ],
    }),
  ],
  exports: [MetadFormlyArrayTabsComponent],
})
export class MetadFormlyArrayTabsModule {}
