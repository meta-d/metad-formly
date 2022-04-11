import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MetadFormlyJsonComponent } from './json.component';
import { MetadFormlyMatJsonModule } from './json.module';

export default {
  title: 'MetadFormlyJsonComponent',
  component: MetadFormlyJsonComponent,
  decorators: [
    moduleMetadata({
      imports: [MetadFormlyMatJsonModule],
    }),
  ],
} as Meta<MetadFormlyJsonComponent>;

const Template: Story<MetadFormlyJsonComponent> = (
  args: MetadFormlyJsonComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
