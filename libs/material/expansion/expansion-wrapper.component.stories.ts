import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyPanelModule } from '../panel';
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
        MetadFormlyPanelModule
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
      className: 'metad-formly__col col-6',
      key: 'show',
      type: 'checkbox',
      templateOptions: {
        label: 'Is Show',
      },
    },
    {
      className: 'metad-formly__col col-6',
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

export const ToggleableAndNull = Template.bind({});
ToggleableAndNull.args = {
  form: new FormGroup({}),
  model: {
    value: null
  },
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

export const SubExpansionAndNull = Template.bind({});
SubExpansionAndNull.args = {
  form: new FormGroup({}),
  model: {
    value: {

    }
  },
  schema: [
    {
      key: 'value',
      wrappers: ['expansion'],
      // defaultValue: C_FORMLY_INITIAL_VALUE,
      templateOptions: {
        label: 'Expansion Type',
        toggleable: true,
        // expanded: true
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
        }
      ]
    },
  ],
};

export const EnableSelectFields = Template.bind({});
EnableSelectFields.args = {
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
        enableSelectFields: true
      },
      fieldGroup: [
        {
          key: 'dataSettings',
          defaultValue: C_FORMLY_INITIAL_VALUE,
          templateOptions: {
            label: 'Data Settings'
          },
          fieldGroupClassName: 'metad-formly__row',
          fieldGroup: fieldGroup(),
        }
      ]
    },
  ],
};