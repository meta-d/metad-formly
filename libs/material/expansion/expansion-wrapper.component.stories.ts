import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyExpansionComponent } from './expansion-wrapper.component';
import { MetadFormlyExpansionModule } from './expansion-wrapper.module';
import { C_FORMLY_INITIAL_VALUE } from './types';

export default {
  title: 'Material/Expansion',
  component: MetadFormlyExpansionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule,
        MetadFormlyExpansionModule,
      ],
    }),
  ],
} as Meta<MetadFormlyExpansionComponent>;

const Template: Story<any> = (args: MetadFormlyExpansionComponent) => ({
  props: args,
  template: `<formly-form [form]="form" [fields]="schema" [model]="model"></formly-form>
<button mat-button [disabled]="form.invalid">Submit</button>
<div>Result:</div>
<pre>{{form.value | json}}</pre>`,
});

function fieldGroup() {
  return [
    {
      key: 'show',
      type: 'checkbox',
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
  ]
}

export const Primary = Template.bind({});
Primary.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      wrappers: ['expansion'],
      templateOptions: {
        label: 'Expansion Type',
      },
      fieldGroup: fieldGroup(),
    },
  ],
};

export const Toggleable = Template.bind({});
Toggleable.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      wrappers: ['expansion'],
      templateOptions: {
        label: 'Expansion Type',
        toggleable: true,
      },
      fieldGroup: fieldGroup(),
    },
  ],
};

export const DefaultNull = Template.bind({});
DefaultNull.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      wrappers: ['expansion'],
      defaultValue: C_FORMLY_INITIAL_VALUE,
      templateOptions: {
        label: 'Expansion Type',
        toggleable: true,
      },
      fieldGroup: fieldGroup(),
    },
  ],
};

export const SubExpansion = Template.bind({});
SubExpansion.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      wrappers: ['expansion'],
      defaultValue: C_FORMLY_INITIAL_VALUE,
      templateOptions: {
        label: 'Expansion Type',
        toggleable: true,
      },
      fieldGroup: [
        ...fieldGroup(),
        {
          key: 'value',
          wrappers: ['expansion'],
          defaultValue: C_FORMLY_INITIAL_VALUE,
          templateOptions: {
            label: 'Expansion Type',
            toggleable: true,
          },
          fieldGroup: fieldGroup(),
        }
      ]
    },
  ],
};
