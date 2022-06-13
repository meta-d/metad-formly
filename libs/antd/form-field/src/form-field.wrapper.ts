import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'metad-formly-nz-form-field',
  template: `
    <nz-form-item>
      <ng-container *ngIf="to.label && to.hideLabel !== true">
        <nz-form-label [nzRequired]="to.required && to.hideRequiredMarker !== true" [nzFor]="id">
          {{ to.label }}
        </nz-form-label>
      </ng-container>
      <nz-form-control [nzValidateStatus]="errorState" [nzErrorTip]="errorTpl">
        <ng-container #fieldComponent></ng-container>
        <ng-template #errorTpl let-control>
          <formly-validation-message [field]="field"></formly-validation-message>
        </ng-template>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadFormlyFormFieldComponent extends FieldWrapper {
  @HostBinding('class.metad-formly-wrapper-nz-form-field')
  public isFormlyWrapperFormFieldComponent = true
  get errorState() {
    return this.showError ? 'error' : '';
  }
}
