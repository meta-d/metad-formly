import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MetadFormlyCodeEditorComponent } from './code-editor.component';
import { MetadFormlyCodeEditorModule } from './code-editor.module';

export default {
  title: 'Material/Code Editor',
  component: MetadFormlyCodeEditorComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyCodeEditorModule,
        MonacoEditorModule.forRoot(),
      ],
    }),
  ],
} as Meta<MetadFormlyCodeEditorComponent>;

const Template: Story<any> = (args: MetadFormlyCodeEditorComponent) => ({
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
      type: 'code-editor',
      templateOptions: {
        label: 'Code'
      },
    },
  ],
};

export const JavaScript = Template.bind({});
JavaScript.args = {
  form: new FormGroup({}),
  model: {},
  schema: [
    {
      key: 'value',
      type: 'code-editor',
      templateOptions: {
        label: 'Code',
        attributes: {
          language: 'javascript'
        }
      },
    },
  ],
};

export const CSS = Template.bind({});
CSS.args = {
  form: new FormGroup({}),
  model: {
    value: 'body {background-color: "red"}'
  },
  schema: [
    {
      key: 'value',
      type: 'code-editor',
      templateOptions: {
        label: 'Code',
        attributes: {
          language: 'css'
        }
      },
    },
  ],
};