import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyArrayModule } from './array.module';
import { MetadFormlyArrayComponent } from './array.type';

export default {
  title: 'Material/Array',
  component: MetadFormlyArrayComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyArrayModule,
        FormlyMaterialModule
      ],
    }),
  ],
} as Meta<MetadFormlyArrayComponent>;

const Template: Story<any> = (args: MetadFormlyArrayComponent) => ({
  props: args,
  template: `<formly-form [form]="form" [fields]="schema" [model]="model"></formly-form>
<div>Result:</div>
<pre>{{form.value | json}}</pre>`,
});

const SCHEMA_FIELDGROUP = [
  {
    key: 'key',
    type: 'input',
    templateOptions: {
      label: 'Key',
    },
  },
  {
    key: 'value',
    type: 'input',
    templateOptions: {
      label: 'Value',
    },
  },
]

export const Primary = Template.bind({});
Primary.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'array',
      fieldArray: {
        fieldGroup: SCHEMA_FIELDGROUP,
      },
      templateOptions: {
        label: 'Array',
      },
    },
  ]
};

export const HideDelete = Template.bind({});
HideDelete.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'array',
      fieldArray: {
        fieldGroup: SCHEMA_FIELDGROUP,
      },
      templateOptions: {
        label: 'Array',
        hideDelete: true
      },
    },
  ]
};