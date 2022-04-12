import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyColorPickerModule } from './color-picker.module';
import { MetadFormlyColorPickerComponent } from './color-picker.type';


export default {
  title: 'Material/Color Picker',
  component: MetadFormlyColorPickerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyColorPickerModule
      ],
    }),
  ],
} as Meta<MetadFormlyColorPickerComponent>;

const Template: Story<any> = (args: MetadFormlyColorPickerComponent) => ({
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
      type: 'color',
      templateOptions: {
        label: 'Color'
      },
    },
  ],
};
