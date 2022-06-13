import { Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatExpansionPanel } from '@angular/material/expansion'
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
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
  private stagingControl = null
  fieldGroup: Array<{key?: string | number | string[]}>

  
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
    field.formControl.enable();
    (this.formControl as unknown as FormGroup).addControl(field.key as string, field.formControl)
    if (this.field.parent.model?.[this.key as string]) {
      this.field.parent.model[this.key as string][field.key as string] = field.model
    }
    
    const fields = this.fields$.value
    fields.push(field)

    this.fields$.next(fields)

    this.formControl.setValue(this.formControl.value)
  }

  onAddField(field) {
    this.addField(field)
  }

  remove(index: number) {
    const fields = this.fields$.value;

    fields.splice(index, 1)
    this.fields$.next(fields)
    // 这句会触发最终的 formly-form modelChange 事件
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

    this.stagingControl = this.field.form.get(this.field.key as string)
    this.field.form.setControl(this.field.key as string, new FormControl(null))

    this.form.setValue({...this.form.value})
  }

  open() {
    if (this.stagingControl) {
      this.field.form.setControl(this.field.key as string, this.stagingControl)
    }
    this.to.disabled = false
    this.expansionPanel?.open()
    this.form.setValue({...this.form.value})
  }
}
