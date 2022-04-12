import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyNzArrayTabsetModule } from './tabset.module';
import { MetadFormlyNzArrayTabsetComponent } from './tabset.type';

export default {
  title: 'Antd/Array Tabset',
  component: MetadFormlyNzArrayTabsetComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        MetadFormlyNzArrayTabsetModule,
        FormlyMaterialModule
      ],
    }),
  ],
} as Meta<MetadFormlyNzArrayTabsetComponent>;

const Template: Story<any> = (args: MetadFormlyNzArrayTabsetComponent) => ({
  props: args,
  template: `<formly-form [form]="form" [fields]="schema" [model]="model"></formly-form>
<div>Result:</div>
<pre>{{form.value | json}}</pre>`,
});

export const Primary = Template.bind({});
Primary.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'tabset',
      templateOptions: {
        label: 'Tabset',
        attributes: {
          labelField: 'key'
        }
      },
      fieldArray: {
        fieldGroup: [
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
        ],
      },
    },
  ],
};
