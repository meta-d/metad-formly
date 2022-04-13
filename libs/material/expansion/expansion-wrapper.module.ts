import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormlyModule } from '@ngx-formly/core'
import { MetadFormlyExpansionComponent } from './expansion-wrapper.component'

@NgModule({
  declarations: [MetadFormlyExpansionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'expansion',
          component: MetadFormlyExpansionComponent,
        }
      ],
      wrappers: [
        {
          name: 'expansion',
          component: MetadFormlyExpansionComponent,
        },
      ],
    }),
  ],
  exports: [MetadFormlyExpansionComponent],
})
export class MetadFormlyExpansionModule {}
