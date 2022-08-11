import { Component } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'metad-formly-accordion',
  templateUrl: './accordion-wrapper.component.html',
  styleUrls: ['./accordion-wrapper.component.scss'],
  host: {
    class: 'metad-formly-accordion',
  },
})
export class MetadFormlyAccordionComponent<
  F extends FormlyFieldConfig = FormlyFieldConfig
> extends FieldWrapper<F> {
  onToggle(
    event: MatSlideToggleChange,
    field: FormlyFieldConfig,
    expansionPanel: MatExpansionPanel
  ) {
    this.formControl.patchValue({
      [field.templateOptions.keyShow]: event.checked,
    });

    if (this.formControl.value[field.templateOptions.keyShow]) {
      expansionPanel?.open();
    } else {
      expansionPanel?.close();
    }
  }
}
