import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MtxColorpickerModule } from '@ng-matero/extensions/colorpicker'
import { FormlyModule } from '@ngx-formly/core'
import { MetadFormlyColorPickerComponent } from './color-picker.type'

@NgModule({
  declarations: [MetadFormlyColorPickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MtxColorpickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'color',
          component: MetadFormlyColorPickerComponent,
          defaultOptions: {
            defaultValue: ''
          }
        }
      ]
    })
  ]
})
export class MetadFormlyColorPickerModule {}
