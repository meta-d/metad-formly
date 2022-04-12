import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FieldArrayType } from '@ngx-formly/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'metad-formly-nz-array-tabset',
  template: `
<div class="nx-formly__title" *ngIf="to?.['title']">{{ to?.['title'] }}</div>
<button nz-button nzType="dashed" (click)="addRow()">Add</button>
<ng-container *ngTemplateOutlet="inlineTable"></ng-container>

<ng-template #inlineTable>
  <nz-tabset nzCentered>
    <nz-tab *ngFor="let item of data; index as i" [nzTitle]="field.fieldGroup?.[i]?.model?.[labelField] || 'XXX'">
      <formly-field [field]="$any(field.fieldGroup?.[i])"></formly-field>
    </nz-tab>
  </nz-tabset>
</ng-template>`,
  styles: [
    `
:host {
  flex: 1;
  max-width: 100%;
}
:host::ng-deep {
  .ant-table-thead > tr > th {
    white-space: nowrap;
  }
  .ant-table-tbody > tr > td {
    white-space: nowrap;
  }
  .ant-table-content {
    overflow-x: auto;
  }
}
    `
  ]
})
export class MetadFormlyNzArrayTabsetComponent extends FieldArrayType implements OnInit {

  data: any[] = []
  // columns
  override defaultOptions = {
    templateOptions: { options: [] }
  }

  get labelField() {
    return this.to?.attributes?.['labelField'] as string
  }
  constructor(
    private _dialog: MatDialog,
    private readonly _viewContainerRef: ViewContainerRef
  ) {
    super()
  }

  ngOnInit() {
    // this.columns = this.field.fieldArray.fieldGroup.map((field) => ({
    //   key: field.key,
    //   label: field.templateOptions?.title || field.templateOptions?.label,
    // }))

    for(let i = 0; i < this.field.model?.length || 0; i++) {
      this.data.push({})
    }
  }

  open(): void {
    // this._dialog
    //   .open(this.dialogRef, {
    //     panelClass: ['nx-dialog-container', 'pac-formly__table'],
    //     viewContainerRef: this._viewContainerRef
    //   })
    //   .afterClosed()
    //   .subscribe((value) => {
    //     console.warn(value)
    //   })
  }

  addRow(): void {
    this.add()
    this.data = [...this.data, {}]
  }

  deleteRow(id: number): void {
    this.remove(id)
    this.data.splice(id, 1)
    this.data = [...this.data]
  }

  drop(event: CdkDragDrop<string[]>): void {
    // 由于 formly fieldGroup 有与 key path 绑定的属性, 所以 moveItemInArray 应该实现不了交换
    // 只能通过克隆 model 值交换后再付给 formControl
    // const model = cloneDeep(this.field.model)
    const model = this.field.model
    moveItemInArray(model, event.previousIndex, event.currentIndex)
    this.field.formControl.reset()
    this.field.formControl.patchValue(model)
  }
}
