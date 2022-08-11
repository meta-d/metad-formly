import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'metad-formly-empty',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadFormlyEmptyComponent extends FieldType {
  @HostBinding('class.metad-formly-empty') public _formlyEmptyComponent = true;
}
