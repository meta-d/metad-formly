import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyToggleModule } from './toggle.module';
import { MetadFormlyToggleComponent } from './toggle.type';



export default {
  title: 'Material/Slide Toggle',
  component: MetadFormlyToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyToggleModule
      ],
    }),
  ],
} as Meta<MetadFormlyToggleComponent>;

const Template: Story<any> = (args: MetadFormlyToggleComponent) => ({
  props: args,
  template: `<formly-form [form]="form" [fields]="schema" [model]="model"></formly-form>
<button mat-button [disabled]="form.invalid">Submit</button>
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
      type: 'toggle',
      templateOptions: {
        label: 'Slide Toggle'
      },
    },
    {
      key: 'value2',
      type: 'toggle',
      templateOptions: {
        label: 'Slide Toggle 2',
        labelPosition: 'before'
      },
    },
    {
      key: 'value3',
      type: 'toggle',
      templateOptions: {
        label: 'Slide Toggle 3',
        labelPosition: 'before',
        color: 'primary'
      },
    },
    {
      key: 'value4',
      type: 'toggle',
      templateOptions: {
        label: 'Required true',
        labelPosition: 'before',
        color: 'primary',
        required: true
      },
    },
  ],
};
