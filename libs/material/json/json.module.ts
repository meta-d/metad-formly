import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormlyModule } from '@ngx-formly/core';
import { MetadFormlyJsonComponent } from './json.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormlyModule.forChild({
      types: [
        { name: 'mat-json', component: MetadFormlyJsonComponent },
        {
          name: 'json',
          extends: 'mat-json',
        },
      ],
    }),
  ],
  exports: [MetadFormlyJsonComponent],
  declarations: [MetadFormlyJsonComponent],
  providers: [],
})
export class MetadFormlyMatJsonModule {}
