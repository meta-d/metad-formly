import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'metad-formly-field-nz-textarea',
  template: ` <textarea nz-input [formControl]="$any(formControl)" [formlyAttributes]="field"></textarea>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`textarea {flex: 1;}`]
})
export class MetadFormlyFieldTextAreaComponent extends FieldType {}
