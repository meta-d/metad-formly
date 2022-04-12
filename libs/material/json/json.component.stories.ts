import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyJsonComponent } from './json.component';
import { MetadFormlyMatJsonModule } from './json.module';

export default {
  title: 'Material/JSON',
  component: MetadFormlyJsonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyMatJsonModule,
      ],
    }),
  ],
} as Meta<MetadFormlyJsonComponent>;

const Template: Story<any> = (args: MetadFormlyJsonComponent) => ({
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
      type: 'json',
      templateOptions: {
        label: 'JSON',
      },
    },
  ],
};

export const Appearance = Template.bind({});
Appearance.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON Outline',
        attributes: {
          appearance: 'outline',
        },
      },
    },
    {
      key: 'value2',
      type: 'json',
      templateOptions: {
        label: 'JSON Fill',
        attributes: {
          appearance: 'fill',
        },
      },
    },
  ],
};
