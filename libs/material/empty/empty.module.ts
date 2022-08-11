import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { MetadFormlyEmptyComponent } from './empty.type'


@NgModule({
  declarations: [MetadFormlyEmptyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'empty',
          component: MetadFormlyEmptyComponent
        }
      ]
    })
  ]
})
export class MetadFormlyEmptyModule {}
