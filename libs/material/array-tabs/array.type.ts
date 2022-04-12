import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core'
import { FormArray } from '@angular/forms';
import { FieldArrayType } from '@ngx-formly/core'

@Component({
  selector: 'metad-formly-array-tabs',
  template: `
<button mat-button color="primary" type="button" nxAppearance="dashed" (click)="add()">
  <mat-icon>add</mat-icon>{{to.label}}
</button>

<button *ngIf="field.fieldGroup?.length" mat-button color="warn" type="button" nxAppearance="dashed" (click)="remove(tabGroup.selectedIndex)">
  <mat-icon>remove</mat-icon>{{removeLabel ?? 'Remove'}}
</button>

<mat-tab-group #tabGroup [formlyAttributes]="field">
  <mat-tab *ngFor="let tab of field.fieldGroup; let i = index;" [label]="tab.model?.[labelField] || 'XXX'">
    <formly-field [field]="tab"></formly-field>
  </mat-tab>
</mat-tab-group>
`,
  host: {
    class: 'metad-formly-array-tabs'
  },
  styles: [
`
:host {
  flex: 1;
}
`,
  ]
})
export class MetadFormlyArrayTabsComponent extends FieldArrayType {

  get labelField() {
    return this.to?.attributes?.['labelField'] as string
  }
  get removeLabel() {
    return this.to?.attributes?.['removeLabel'] as string
  }
  drop(event: CdkDragDrop<string[]>) {
    if (!Array.isArray(this.field.fieldGroup) || !Array.isArray(this.field.model)) {
      throw new Error(`fieldGroup or model is not an array`)
    }
    moveItemInArray(this.field.fieldGroup, event.previousIndex, event.currentIndex)
    this.field.fieldGroup.forEach((fieldGroup, i) => fieldGroup.key = `${i}`)
    // done: 在某些情况下下面两行会造成重复操作的问题 ??
    moveItemInArray(this.field.model, event.previousIndex, event.currentIndex)
    moveItemInArray((this.field.formControl as FormArray).controls, event.previousIndex, event.currentIndex)
    moveItemInArray(this.field.formControl?.value, event.previousIndex, event.currentIndex)
    console.log(this.field.model, this.field.formControl?.value)
    this.field.formControl?.setValue(this.field.formControl?.value.map((value: unknown) => value ?? {}))
  }

  override remove(i: number | null): void {
    super.remove(i as number, {markAsDirty: true})
  }
}
