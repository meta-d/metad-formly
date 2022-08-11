import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'metad-formly-array-tabs',
  template: `
    <button
      mat-button
      color="primary"
      type="button"
      ngmAppearance="dashed"
      (click)="add()"
    >
      <mat-icon>add</mat-icon>{{ to.label }}
    </button>

    <mat-tab-group #tabGroup [formlyAttributes]="field">
      <mat-tab #matTab *ngFor="let tab of field.fieldGroup; let i = index">
        <ng-template mat-tab-label>
          {{tab.model?.[labelField] || 'XXX'}}
          <button
            mat-icon-button
            class="metad-formly-array-tabs__remove"
            (click)="matTab.isActive && remove(i)"
          >
            <mat-icon>close</mat-icon>
          </button>
        </ng-template>
        <formly-field [field]="tab"></formly-field>
      </mat-tab>
    </mat-tab-group>
  `,
  host: {
    class: 'metad-formly-array-tabs',
  },
  styleUrls: ['array.type.scss'],
})
export class MetadFormlyArrayTabsComponent extends FieldArrayType {
  get labelField() {
    return this.to?.['labelField'] as string;
  }
  get removeLabel() {
    return this.to?.['removeLabel'] as string;
  }

  override remove(i: number | null): void {
    super.remove(i as number, { markAsDirty: true });
  }
}
