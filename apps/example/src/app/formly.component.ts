import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'metad-formly',
  templateUrl: 'formly.component.html',
  styles: [`form {display: flex; flex-direction: column; align-items: flex-start; }`]
})
export class MetaFormlyComponent implements OnInit {
  @Input() schema: any;
  @Input() model

  form = new FormGroup({});
  
  constructor() {}

  ngOnInit(): void {
    //
  }

  onSubmit(model: unknown) {
    console.log(model);
  }
}
