import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyNzTextAreaModule } from './textarea.module';
import { MetadFormlyFieldTextAreaComponent } from './textarea.type';

export default {
  title: 'Antd/Textarea',
  component: MetadFormlyFieldTextAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyNzTextAreaModule,
      ],
    }),
  ],
} as Meta<MetadFormlyFieldTextAreaComponent>;

const Template: Story<any> = (args: MetadFormlyFieldTextAreaComponent) => ({
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
      type: 'textarea',
      templateOptions: {
        label: 'Textarea',
      },
    },
  ],
};
