import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { OptionComponent } from './option.component';

export default {
  title: 'Components/Option',
  component: OptionComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<OptionComponent>;

const Template: Story<OptionComponent> = (args: OptionComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
