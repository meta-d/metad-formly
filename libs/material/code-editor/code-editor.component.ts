import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FieldType } from '@ngx-formly/core'
import { BehaviorSubject, startWith } from 'rxjs'


@Component({
  selector: 'metad-formly-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class MetadFormlyCodeEditorComponent extends FieldType implements OnInit {
  show = false
  public editor$ = new BehaviorSubject(null)
  editorOptions = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true
  }

  statement = ''
  // constructor(public dialog: MatDialog) {
  //   super()
  // }

  ngOnInit() {
    this.editorOptions.language = this.to?.attributes?.['language'] as string ?? this.editorOptions.language
    this.formControl.valueChanges.pipe(startWith(this.formControl.value)).subscribe(value => {
      this.statement = value
    })
  }

  onChange(event: unknown) {
    this.formControl.setValue(this.statement, {emitEvent: false})
  }

  openCodeEditorDialog() {
    // this.dialog.open(ConfirmCodeEditorComponent, {
    //   panelClass: 'large',
    //   data: {
    //     model: this.field.formControl?.value,
    //     language: this.to?.language,
    //     onApply: (model) => {
    //       this.field.formControl.setValue(model)
    //     }
    //   }
    // }).afterClosed().subscribe((result) => {
    //   if (result !== undefined) {
    //     this.field.formControl?.setValue(result)
    //   }
    // })
  }

}
