import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MetadFormlyMatJsonModule } from '@metad/formly/mat-json';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NxWelcomeComponent } from './nx-welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

export default {
  title: 'NxWelcomeComponent',
  component: NxWelcomeComponent,
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
} as Meta<NxWelcomeComponent>;

const Template: Story<NxWelcomeComponent> = (args: NxWelcomeComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
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
