import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { FormlyModule } from '@ngx-formly/core'
import { MetadFormlyTabGroupComponent } from './tab-group.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'tabs',
          component: MetadFormlyTabGroupComponent
        }
      ]
    })
  ],
  exports: [MetadFormlyTabGroupComponent],
  declarations: [MetadFormlyTabGroupComponent],
  providers: []
})
export class MetadFormlyMatTabGroupModule {}
