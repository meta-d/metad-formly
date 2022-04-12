import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { ColorFormat } from '@ng-matero/extensions/colorpicker'
import { FieldType } from '@ngx-formly/material/form-field'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'metad-formly-color-picker',
  template: `<mat-form-field fxFlex="100">
    <mat-label>{{to?.label ?? 'Color'}}</mat-label>
    <input matInput [formControl]="$any(formControl)" [mtxColorpicker]="picker" [format]="format" />
    <mtx-colorpicker-toggle matSuffix [for]="picker" [ngStyle]="{color: formControl.value}"></mtx-colorpicker-toggle>
    <mtx-colorpicker #picker></mtx-colorpicker>
    <mat-error>Please enter the color</mat-error>
  </mat-form-field>`,
  styles: [`:host {display: flex; flex: 1; max-width: 100%;} .mat-form-field {flex: 1; max-width: 100%;}`]
})
export class MetadFormlyColorPickerComponent extends FieldType {
  @HostBinding('class.pac-formly-color-picker') public _formlyColorPickerComponent = true

  format: ColorFormat = 'hex'
}
