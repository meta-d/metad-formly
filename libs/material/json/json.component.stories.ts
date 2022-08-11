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
        placeholder: `'pixal' | '%'`
      },
    },
  ],
};

export const Appearance = Template.bind({});
Appearance.args = {
  form: new FormGroup({}),
  model: {
    value: {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON Outline',
        attributes: {
          appearance: 'outline',
        },
      },
    }
  },
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON Outline',
        placeholder: `'pixal' | '%'`,
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
        placeholder: `'pixal' | '%'`,
        attributes: {
          appearance: 'fill',
        },
      },
    },
  ],
};

export const Autosize = Template.bind({});
Autosize.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        placeholder: `'pixal' | '%'`,
        autosize: true
      },
    },
  ],
};

export const AutosizeMinRows = Template.bind({});
AutosizeMinRows.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        autosize: true,
        autosizeMinRows: 2
      },
    },
  ],
};

export const AutosizeMaxRows = Template.bind({});
AutosizeMaxRows.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        autosize: true,
        autosizeMaxRows: 3
      },
    },
  ],
};

export const Cols = Template.bind({});
Cols.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        cols: 3,
      },
    },
  ],
};

export const Readonly = Template.bind({});
Readonly.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        readonly: true,
      },
    },
  ],
};

export const Required = Template.bind({});
Required.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        required: true,
      },
    },
  ],
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'json',
      templateOptions: {
        label: 'JSON',
        placeholder: `Insert json value`,
      },
    },
  ],
};
