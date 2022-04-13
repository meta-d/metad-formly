import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatExpansionPanel } from '@angular/material/expansion'
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core'
import { groupBy, isEmpty, isNil } from 'lodash'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { C_FORMLY_INITIAL_VALUE } from './types'


@Component({
  selector: 'metad-formly-expansion',
  templateUrl: './expansion-wrapper.component.html',
  styleUrls: ['./expansion-wrapper.component.scss'],
  host: {
    'class': 'metad-formly-expansion'
  }
})
export class MetadFormlyExpansionComponent<F extends FormlyFieldConfig = FormlyFieldConfig> extends FieldWrapper<F> implements OnInit {

  @ViewChild('expansionPanel') private expansionPanel: MatExpansionPanel

  fields$     = new BehaviorSubject<F[]>([])
  fieldGroup$: Observable<FormlyFieldConfig[]>
  private stagingModel = null
  // private stagingFieldGroup = null
  private stagingControl = null
  fieldGroup: Array<{key?: string | number | string[]}>

  constructor(private _cdr: ChangeDetectorRef ) {
    super()
  }
  
  ngOnInit(): void {
    this.fieldGroup = this.field.fieldGroup
    if (this.to.toggleable) {
      // 经过多番努力只能通过这种方式判断是否为初始值
      this.to.disabled = isNil(this.field.model) || this.field.model.__c_formly_initial_value__ === C_FORMLY_INITIAL_VALUE.__c_formly_initial_value__
    }
    
    const fields = []
    this.field.fieldGroup?.forEach(field => {
      if (this.to.enableSelectFields && field.key && !field.templateOptions?.required) {
        const model = this.field.model?.[field.key as string]
        if (!isNil(model) && model.__c_formly_initial_value__ !== C_FORMLY_INITIAL_VALUE.__c_formly_initial_value__) {
          fields.push(field)
        }
      } else {
        fields.push(field)
      }
    })

    // Object.keys(this.field.model)
    //   .filter((key) => !!this.field.model[key]) // negate(isNil)(this.field.model[key]) || 
    //   .forEach((a: any) => {
    //     if (this.field.fieldGroup.map((item) => item.key).includes(a)) {
    //       fields.push(find(this.field.fieldGroup, (b: any) => b.key === a))
    //     }
    //   })

    this.fields$.next(fields)

    this.fieldGroup$ = this.fields$.pipe(
      filter(() => this.to.enableSelectFields),
      map(fields => {
        const fieldGroup = groupBy(this.fieldGroup, (value) => value.key && !fields.find(item => item.key === value.key))
        const parent = this.field.parent.fieldGroup.find(item => item.key === this.field.key)
        parent.fieldGroup = fieldGroup.false
        return fieldGroup.true
      }),
      tap(fields => {
        fields?.forEach(field => {
          (this.formControl as unknown as FormGroup).removeControl(field.key as string)
          if (this.field.parent.model?.[this.key as string]) {
            delete this.field.parent.model[this.key as string][field.key as string]
          }
          // delete this.field.model[field.key as string]
        })
      }),
      map(fields => isEmpty(fields) ? null : fields))

    if (this.to.disabled) {
      this.close()
    }
  }

  addField(field) {
    if (field.model?.__c_formly_initial_value__) {
      delete field.model.__c_formly_initial_value__
    }
    const fields = this.fields$.value
    fields.push(field)
    // if (isNil(this.field.model[field.key as string])) {
    //   delete this.field.model[field.key as string]
    // }
    this.fields$.next(fields)
    this.formControl.setValue(this.formControl.value)
  }

  onAddField(field) {
    this.addField(field)
  }

  remove(index: number) {
    const fields = this.fields$.value;
    // (this.formControl as FormGroup).removeControl(fields[index].key as string)
    // this.form.setValue(this.form.value)
    // // console.warn(this.form.value)
    // this.options.updateInitialValue()
    // this.field.options.updateInitialValue()
    // this.formControl.updateValueAndValidity()
    // this._cdr.markForCheck()
    // this._cdr.detectChanges()
    // this.field.model[fields[index].key as string] = null

    fields.splice(index, 1)
    this.fields$.next(fields)
    // 这句会出发最终的 formly-form modelChange 事件
    this.formControl.setValue(this.formControl.value)
  }

  trackByKey(index, item) {
    return item.key
  }

  onToggle(event) {
    if (!event.checked) {
      this.close()
    } else {
      this.open()
    }
  }

  close() {
    this.to.disabled = true
    this.expansionPanel?.close()
    
    // this.stagingFieldGroup = this.field.fieldGroup
    // this.field.fieldGroup = []
    this.stagingModel = this.field.parent.model?.[this.field.key as string]
    if (this.field.parent.model) {
      this.field.parent.model[this.field.key as string] = null
    }

    this.stagingControl = this.field.form.get(this.field.key as string)
    this.field.form.removeControl(this.field.key as string)

    // this.field.formControl.disable()
    // this.field.formControl.setValue(null)
    // this.field.parent.formControl.patchValue({[this.field.key as string]: null}, {emitEvent: true})

    // console.warn(this.form.value, this.field.parent.formControl.value)

    // this.form.setValue(this.form.value)
  }

  open() {
    if (this.stagingModel) {
      if (Array.isArray(this.stagingModel)) {
        this.field.parent.model[this.field.key as string] = [...this.stagingModel]
      } else {
        this.field.parent.model[this.field.key as string] = {...this.stagingModel}
      }
      delete this.field.parent.model[this.field.key as string].__c_formly_initial_value__
    }

    if (this.stagingControl) {
      this.field.form.addControl(this.field.key as string, this.stagingControl)
    }

    // if (isEmpty(this.field.fieldGroup) && !isNil(this.stagingFieldGroup)) {
    //   this.field.fieldGroup = this.stagingFieldGroup
    // }
    this.to.disabled = false
    this.expansionPanel?.open()
  }
}
