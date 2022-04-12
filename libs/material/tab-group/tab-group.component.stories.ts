import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyToggleModule } from '../toggle/toggle.module';
import { MetadFormlyTabGroupComponent } from './tab-group.component';
import { MetadFormlyMatTabGroupModule } from './tab-group.module';

export default {
  title: 'Material/Tabs',
  component: MetadFormlyTabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyMatTabGroupModule,
        MetadFormlyToggleModule,
        FormlyMaterialModule
      ],
    }),
  ],
} as Meta<MetadFormlyTabGroupComponent>;

const Template: Story<any> = (args: MetadFormlyTabGroupComponent) => ({
  props: args,
  template: `<formly-form [form]="form" [fields]="schema" [model]="model"></formly-form>
<div>Result:</div>
<pre>{{form.value | json}}</pre>`,
});

const TAB_FIELDGROUP = [
  {
    key: 'xAxis',
    templateOptions: {
      label: 'X Axis',
    },
    fieldGroup: [
      {
        key: 'show',
        type: 'toggle',
        templateOptions: {
          label: 'Is Show',
        },
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type',
          options: [
            { value: 'value', label: 'Value' },
            { value: 'category', label: 'Category' },
          ],
        },
      },
    ],
  },
  {
    key: 'yAxis',
    templateOptions: {
      label: 'Y Axis',
    },
    fieldGroup: [
      {
        key: 'show',
        type: 'toggle',
        templateOptions: {
          label: 'Is Show',
        },
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type',
          options: [
            { value: 'value', label: 'Value' },
            { value: 'category', label: 'Category' },
          ],
        },
      },
    ],
  },
]

export const Primary = Template.bind({});
Primary.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'tabs',
      fieldGroup: TAB_FIELDGROUP,
      templateOptions: {
        label: 'Tabs Group',
      },
    },
  ],
};

export const DisableRipple = Template.bind({});
DisableRipple.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'tabs',
      fieldGroup: TAB_FIELDGROUP,
      templateOptions: {
        label: 'Tabs Group',
        disableRipple: true
      },
    },
  ],
};
