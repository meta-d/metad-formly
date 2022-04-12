import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'metad-formly-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  host: {
    'class': 'metad-formly-tab-group'
  }
})
export class MetadFormlyTabGroupComponent extends FieldType {

  isValid(field: FormlyFieldConfig): boolean | undefined {
    if (field.key) {
      return field.formControl?.valid
    }

    return field.fieldGroup?.every((f) => this.isValid(f))
  }
}
