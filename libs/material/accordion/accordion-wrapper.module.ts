import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormlyModule } from '@ngx-formly/core';
import { MetadFormlyAccordionComponent } from './accordion-wrapper.component';

@NgModule({
  declarations: [MetadFormlyAccordionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'accordion',
          component: MetadFormlyAccordionComponent,
        },
      ],
      wrappers: [
        {
          name: 'accordion',
          component: MetadFormlyAccordionComponent,
        },
      ],
    }),
  ],
  exports: [MetadFormlyAccordionComponent],
})
export class MetadFormlyAccordionModule {}
