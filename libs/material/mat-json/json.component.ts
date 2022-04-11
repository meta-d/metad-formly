import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FieldType } from '@ngx-formly/core';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'matad-formly-mat-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
})
export class MetadFormlyJsonComponent extends FieldType implements OnInit {
  @HostBinding('class.matad-formly-mat-json')
  appearance: MatFormFieldAppearance = 'standard';

  fControl = new FormControl();

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(startWith(this.formControl.value))
      .subscribe((value) => {
        this.fControl.setValue(JSON.stringify(value || undefined, null, 2));
      });

    this.fControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        try {
          const json = parse(value);
          this.formControl.setValue(json, {emitEvent: false});
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