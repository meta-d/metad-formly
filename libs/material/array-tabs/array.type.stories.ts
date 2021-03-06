import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyArrayTabsModule } from './array.module';
import { MetadFormlyArrayTabsComponent } from './array.type';

export default {
  title: 'Material/Array Tabs',
  component: MetadFormlyArrayTabsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyArrayTabsModule,
        FormlyMaterialModule
      ],
    }),
  ],
} as Meta<MetadFormlyArrayTabsComponent>;

const Template: Story<any> = (args: MetadFormlyArrayTabsComponent) => ({
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
      type: 'array-tabs',
      templateOptions: {
        label: 'Array Tabs',
        labelField: 'key',
        removeLabel: 'Remove Current Tab'
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
