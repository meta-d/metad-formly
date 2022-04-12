import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'metad-formly-mat-toggle',
  template: `
    <mat-slide-toggle
      [id]="id"
      [formControl]="$any(formControl)"
      [formlyAttributes]="field"
      [color]="to.color"
      [tabIndex]="to.tabindex"
      [required]="to.required"
      labelPosition="before"
    >
      {{ to.label }}
    </mat-slide-toggle>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'metad-formly-mat-toggle'
  }
})
export class MetadFormlyToggleComponent extends FieldType {
  @ViewChild(MatSlideToggle, { static: true }) slideToggle!: MatSlideToggle;

  override defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always' as const,
      hideLabel: true,
    },
  };

  override onContainerClick(event: MouseEvent): void {
    this.slideToggle.focus();
    super.onContainerClick(event);
  }
}
