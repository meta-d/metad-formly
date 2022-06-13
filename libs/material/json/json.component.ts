import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FieldType } from '@ngx-formly/core';
import isEqual from 'lodash/isEqual';
import {
  distinctUntilChanged,
  filter,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'metad-formly-mat-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
})
export class MetadFormlyJsonComponent extends FieldType implements OnInit {
  @HostBinding('class.metad-formly-mat-json')
  appearance: MatFormFieldAppearance = 'standard';

  fControl = new FormControl();

  ngOnInit() {
    this.appearance =
      (this.to?.attributes?.['appearance'] as MatFormFieldAppearance) ??
      this.appearance;
    this.formControl.valueChanges
      .pipe(
        startWith(this.formControl.value),
        withLatestFrom(this.fControl.valueChanges.pipe(startWith(null))),
        filter(([json, value]) => {
          try {
            return !isEqual(json, parse(value));
          } catch (err) {
            return true;
          }
        })
      )
      .subscribe((value) => {
        this.fControl.setValue(JSON.stringify(value || undefined, null, 2));
      });

    this.fControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        try {
          const json = parse(value);
          this.formControl.setValue(json);
        } catch (err) {
          this.fControl.setErrors({ err });
        }
      });
  }
}

/**
 * 转换 JSON 格式
 */
function parse(value: string) {
  return isBlank(value) ? null : JSON.parse(value);
}

export function isBlank(value: unknown) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && !value.trim())
  );
}
