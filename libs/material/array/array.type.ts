import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core'
import { FormArray } from '@angular/forms';
import { FieldArrayType } from '@ngx-formly/core'

@Component({
  selector: 'metad-formly-array',
  template: `
<div class="metad-formly__title">{{ to.label }}</div>
<div class="metad-formly-cdk__drag-list" [class.empty]="!field.fieldGroup?.length"
  cdkDropList
  (cdkDropListDropped)="drop($event)">

  <button *ngIf="!field.fieldGroup?.length" mat-button color="primary" type="button" (click)="add()">
    <mat-icon>add</mat-icon>{{to.label}}
  </button>

  <div *ngFor="let field of field.fieldGroup; let i = index;" class="metad-formly__array-row"
    cdkDragBoundary=".metad-formly-cdk__drag-list" cdkDrag>

    <formly-field fxFlex="100" [field]="field"></formly-field>

    <button *ngIf="!to?.hideDelete" class="metad-formly__remove" mat-icon-button color="warn" (click)="remove(i)">
      <mat-icon>clear</mat-icon>
    </button>

    <div class="metad-formly-cdk__drag-placeholder" *cdkDragPlaceholder></div>
  </div>
</div>

<button *ngIf="field.fieldGroup?.length" mat-button color="primary" type="button" nxAppearance="dashed" (click)="add()">
  <mat-icon>add</mat-icon>{{to.label}}
</button>
`,
  host: {
    class: 'metad-formly-array'
  },
  styles: [
`
:host {
  flex: 1;
}
.metad-formly-cdk__drag-placeholder {
  min-height: 60px;
}
`,
  ]
})
export class MetadFormlyArrayComponent extends FieldArrayType {

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
    // console.log(this.field.model, this.field.formControl?.value)
    this.field.formControl?.setValue(this.field.formControl?.value.map((value: unknown) => value ?? {}))
  }
}
